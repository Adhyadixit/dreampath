import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase, testConnection } from "@/utils/supabaseConnection";
import Chatbot from './Chatbot';

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
  const [showForm, setShowForm] = useState(true);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorId, setVisitorId] = useState<string>('');
  const [isOffline, setIsOffline] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);
  const [useChatbot, setUseChatbot] = useState(true); // Start with chatbot by default
  const [waitingForAgent, setWaitingForAgent] = useState(false);
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
    
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      // This is the first visit, automatically open the chat widget after a short delay
      setTimeout(() => {
        setIsOpen(true);
      }, 3000); // 3 second delay
      
      // Set the flag to indicate the user has visited before
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    // Check if user has an existing chat session
    const checkExistingSession = async () => {
      try {
        console.log('Checking for existing chat sessions...');
        setIsLoading(true);
        
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
          setIsLoading(false);
          return;
        }
        
        console.log('Existing session check result:', data);
        
        if (data && data.length > 0) {
          console.log('Found existing session:', data[0]);
          setSessionId(data[0].id);
          setShowForm(false);
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
        setIsLoading(false);
      }
    };
    
    checkExistingSession();
  }, []);

  useEffect(() => {
    // Set up real-time subscription for new messages
    if (sessionId) {
      const subscription = supabase
        .channel(`chat:${sessionId}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`
        }, (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Mark admin messages as read when received by visitor
          if (newMessage.sender_type === 'admin') {
            markMessageAsRead(newMessage.id);
          }
          
          // If tab is not active, increment unread count
          if (!tabActive) {
            setUnreadCount(prev => prev + 1);
            // Update document title to show unread count
            document.title = `(${unreadCount + 1}) DreamPath Solutions - Custom Software Development`;
            // Send notification if permission is granted
            sendNotification('New message', 'You have a new message from our team.');
          }
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [sessionId, tabActive]);

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
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
      setSessionId(sessionData[0].id);
      
      // Now send the first message
      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionData[0].id,
          sender_type: 'visitor',
          message: message.trim(),
          is_read: false,
          created_at: timestamp
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
      setShowForm(false);
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
    
    if (!message.trim() || !sessionId) return;
    
    try {
      // Store the message content before clearing the input
      const messageContent = message.trim();
      
      // Clear the input field immediately for better UX
      setMessage('');
      
      console.log('Sending message to Supabase for session:', sessionId);
      
      // Send to Supabase. The real-time subscription will handle updating the UI.
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          sender_type: 'visitor',
          message: messageContent,
          is_read: false,
          created_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error sending message:', error);
        // If there's an error, add the message back to the input so the user doesn't lose it
        setMessage(messageContent);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Message sent successfully to Supabase');
        // The real-time subscription will update the UI
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

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      setTabActive(isVisible);
      
      // If tab becomes visible again and there are unread messages, reset the count
      if (isVisible && unreadCount > 0) {
        setUnreadCount(0);
        // Update document title back to normal
        document.title = 'DreamPath Solutions - Custom Software Development';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [unreadCount]);

  // Request notification permission
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return;
      }
      
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        console.log("Notification permission:", permission);
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };
    
    requestNotificationPermission();
  }, []);

  // Function to send notification
  const sendNotification = (title: string, body: string) => {
    if (notificationPermission !== 'granted') return;
    
    try {
      const notification = new Notification(title, {
        body: body,
        icon: '/dexter-favicon.svg'
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
        setIsOpen(true);
      };
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Handle connecting to a real agent from the chatbot
  const handleConnectToAgent = () => {
    setWaitingForAgent(true);
    setUseChatbot(false);
    
    // Start a new chat session after a short delay
    setTimeout(() => {
      setShowForm(true);
      setWaitingForAgent(false);
    }, 1000);
  };

  if (isLoading) {
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
    <div className="fixed bottom-20 right-4 z-50">
      {/* Chat button */}
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="h-12 w-12 rounded-full shadow-lg bg-dreampath-accent hover:bg-dreampath-accent/90"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 md:w-96 bg-gray-900 rounded-lg shadow-xl flex flex-col overflow-hidden h-[550px] border border-gray-700 transition-all duration-300 ease-in-out transform scale-100 opacity-100">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-bold text-lg">Chat with DreamPath</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Chat content */}
          <div className="flex-1 overflow-hidden bg-gray-900 text-white">
            {waitingForAgent ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-400" />
                  <p className="text-gray-300">Connecting you to an agent...</p>
                  <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
                </div>
              </div>
            ) : showForm ? (
              <div className="p-6 h-full overflow-y-auto bg-gray-800">
                <div className="mb-6 text-center">
                  <p className="text-gray-300">Please fill in the form below to start chatting with our team.</p>
                </div>
                <form onSubmit={handleStartChat} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <Input
                      id="name"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <Input
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      required
                      className="bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : 'Start Chat'}
                  </Button>
                </form>
              </div>
            ) : useChatbot ? (
              <Chatbot onConnectToAgent={handleConnectToAgent} />
            ) : (
              <>
                {/* Chat messages */}
                <div className="flex-1 px-4 pt-8 pb-6 overflow-y-auto space-y-4 bg-gray-800" style={{ scrollBehavior: 'smooth' }}>
                  <div className="h-2"></div> {/* Additional spacing before first message */}
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender_type === 'visitor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-xl p-3 shadow-md ${
                          message.sender_type === 'visitor' 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-gray-700 text-gray-200'
                        }`}
                      >
                        <div className="text-sm break-words">{message.message}</div>
                        <div className="text-xs mt-1 opacity-70 text-right">
                          {formatTime(new Date(message.created_at))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Chat input */}
                <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4 bg-gray-900">
                  <div className="flex space-x-3 items-center">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 force-text-black border-gray-300 placeholder:!text-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-full px-4 py-2"
                      style={{ backgroundColor: '#e5e7eb' }}
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      className="bg-indigo-600 hover:bg-indigo-700 rounded-full w-10 h-10 flex-shrink-0"
                      disabled={!message.trim() || isOffline}
                    >
                      <Send className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                  {isOffline && (
                    <p className="text-xs text-red-400 mt-2 text-center">
                      You appear to be offline. Messages will be sent when you're back online.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
