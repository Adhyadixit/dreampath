import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase, testConnection } from "@/utils/supabaseConnection";

// Generate a random ID instead of using uuid
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

interface Message {
  id: string;
  sender_type: 'visitor' | 'admin';
  message: string;
  created_at: string;
  is_read: boolean;
  session_id?: string;
}

interface ChatSession {
  id: string;
  visitor_id: string;
  visitor_name: string;
  visitor_email: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showInitialForm, setShowInitialForm] = useState(true);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [visitorId, setVisitorId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Generate or retrieve visitor ID from localStorage
    const storedVisitorId = localStorage.getItem('chatVisitorId');
    const newVisitorId = storedVisitorId || generateId();
    
    if (!storedVisitorId) {
      localStorage.setItem('chatVisitorId', newVisitorId);
    }
    
    setVisitorId(newVisitorId);
    
    // Check if user has an existing chat session
    const checkExistingSession = async () => {
      try {
        console.log('Checking for existing chat sessions...');
        setIsInitializing(true);
        
        const { data, error } = await supabase
          .from('chat_sessions')
          .select('*')
          .eq('visitor_id', newVisitorId)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (error) {
          console.error('Error checking existing session:', error);
          // Continue with new session form even if there's an error
          setIsInitializing(false);
          return;
        }
        
        console.log('Existing session check result:', data);
        
        if (data && data.length > 0) {
          console.log('Found existing session:', data[0]);
          setChatSession(data[0]);
          setShowInitialForm(false);
          loadMessages(data[0].id);
        } else {
          console.log('No existing session found, showing initial form');
          // Pre-fill name and email if available in localStorage
          const storedName = localStorage.getItem('chatVisitorName');
          const storedEmail = localStorage.getItem('chatVisitorEmail');
          
          if (storedName) setVisitorName(storedName);
          if (storedEmail) setVisitorEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
      } finally {
        setIsInitializing(false);
      }
    };
    
    checkExistingSession();
  }, []);

  useEffect(() => {
    // Set up real-time subscription for new messages
    if (chatSession?.id) {
      const subscription = supabase
        .channel(`chat:${chatSession.id}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `session_id=eq.${chatSession.id}`
        }, (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Mark admin messages as read when received by visitor
          if (newMessage.sender_type === 'admin') {
            markMessageAsRead(newMessage.id);
          }
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [chatSession]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const loadMessages = async (sessionId: string) => {
    try {
      console.log('Loading messages for session:', sessionId);
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error('Error loading messages:', error);
        return; // Continue with any existing messages in state
      }
      
      console.log('Fetched messages:', data);
      
      if (data && data.length > 0) {
        setMessages(data);
        
        // Mark admin messages as read
        const unreadAdminMessages = data.filter(msg => 
          msg.sender_type === 'admin' && !msg.is_read
        );
        
        console.log('Unread admin messages:', unreadAdminMessages.length);
        
        for (const msg of unreadAdminMessages) {
          markMessageAsRead(msg.id);
        }
      } else {
        console.log('No messages found for session:', sessionId);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('id', messageId);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!visitorName.trim() || !visitorEmail.trim() || !message.trim()) {
      toast({
        title: "All fields are required",
        description: "Please fill in all fields to start the chat.",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(visitorEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Save visitor info to localStorage for future chats
      localStorage.setItem('chatVisitorName', visitorName);
      localStorage.setItem('chatVisitorEmail', visitorEmail);
      
      // Create a simplified chat session directly - don't generate UUID client-side
      // Let Supabase handle the UUID generation
      const timestamp = new Date().toISOString();
      
      console.log('Creating new chat session...');
      
      // First, create the session in Supabase
      const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          visitor_id: visitorId,
          visitor_name: visitorName,
          visitor_email: visitorEmail,
          status: 'active',
          created_at: timestamp,
          updated_at: timestamp
        })
        .select();
      
      if (sessionError) {
        console.error('Failed to save chat session to database:', sessionError);
        toast({
          title: "Error",
          description: "Could not start chat. Please try again later.",
          variant: "destructive",
        });
        return;
      }
      
      if (!sessionData || sessionData.length === 0) {
        console.error('No session data returned after insert');
        toast({
          title: "Error",
          description: "Could not start chat. Please try again later.",
          variant: "destructive",
        });
        return;
      }
      
      console.log('Session created successfully:', sessionData[0]);
      
      // Set the session in state
      setChatSession(sessionData[0]);
      
      // Now send the first message
      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionData[0].id,
          sender_type: 'visitor',
          message: message.trim(),
          is_read: false
        });
      
      if (messageError) {
        console.error('Failed to save message to database:', messageError);
        toast({
          title: "Warning",
          description: "Your message was not saved. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      console.log('First message sent successfully');
      
      // Show the chat interface
      setShowInitialForm(false);
      setMessage('');
      
      // Load messages to display the first message
      loadMessages(sessionData[0].id);
      
    } catch (error) {
      console.error('Error starting chat:', error);
      
      toast({
        title: "Error",
        description: "Could not start chat. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !chatSession) return;
    
    try {
      // Store the message content before clearing the input
      const messageContent = message.trim();
      
      // Clear the input field immediately for better UX
      setMessage('');
      
      // Create a temporary message to show immediately
      const tempMessage = {
        id: `temp-${Date.now()}`,
        sender_type: 'visitor' as 'visitor',
        message: messageContent,
        is_read: false,
        created_at: new Date().toISOString()
      };
      
      // Add the temporary message to the local state
      setMessages(prev => [...prev, tempMessage]);
      
      // Scroll to the bottom
      scrollToBottom();
      
      console.log('Sending message to Supabase for session:', chatSession.id);
      
      // Send to Supabase - let Supabase handle UUID generation
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: chatSession.id,
          sender_type: 'visitor',
          message: messageContent,
          is_read: false
        })
        .select();
      
      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Message sent successfully to Supabase:', data);
        
        // Replace the temporary message with the real one from the database
        if (data && data.length > 0) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === tempMessage.id ? data[0] : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isInitializing) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="w-14 h-14 rounded-full bg-dreampath-primary hover:bg-dreampath-dark shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button 
          className="w-14 h-14 rounded-full bg-dreampath-primary hover:bg-dreampath-dark shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      ) : (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border animate-scaleIn">
          <div className="bg-dreampath-primary text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">DreamPath Chat</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-dreampath-dark rounded-full h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {showInitialForm ? (
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="mb-4">
                <p className="text-gray-700">Please fill in the form below to start chatting with our team.</p>
              </div>
              <form onSubmit={handleStartChat} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input 
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input 
                    type="email"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <Input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-dreampath-primary hover:bg-dreampath-dark"
                >
                  Start Chat
                </Button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender_type === 'visitor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender_type === 'visitor' 
                            ? 'bg-dreampath-primary text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.sender_type === 'visitor' ? 'text-white/70' : 'text-gray-500'}`}>
                          {formatTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-dreampath-primary hover:bg-dreampath-dark"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
