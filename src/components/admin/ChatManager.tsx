import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RefreshCw, CheckCircle2, Clock, Search, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase, testConnection } from "@/utils/supabaseConnection";

interface Message {
  id: string;
  sender_type: 'visitor' | 'admin';
  message: string;
  created_at: string;
  is_read: boolean;
}

interface ChatSession {
  id: string;
  visitor_id: string;
  visitor_name: string;
  visitor_email: string;
  status: 'active' | 'closed';
  unread_admin: number;
  unread_visitor: number;
  last_message: string;
  last_message_time: string;
  created_at: string;
}

const ChatManager = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessions, setActiveSessions] = useState<ChatSession[]>([]);
  const [closedSessions, setClosedSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await testConnection();
      } catch (err) {
        console.error('Unexpected error during connection test:', err);
      }
    };
    
    checkConnection();
  }, []);

  useEffect(() => {
    loadSessions();
    
    // Set up real-time subscription for new chat sessions
    const subscription = supabase
      .channel('public:chat_sessions')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'chat_sessions'
      }, (payload) => {
        console.log('Chat session change detected:', payload);
        loadSessions();
      })
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to chat_sessions table');
        } else {
          console.log('Failed to subscribe to chat_sessions table');
        }
      });
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    // Set up real-time subscription for new messages in the selected session
    if (selectedSession?.id) {
      console.log('Setting up subscription for session:', selectedSession.id);
      
      const subscription = supabase
        .channel(`chat:${selectedSession.id}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `session_id=eq.${selectedSession.id}`
        }, (payload) => {
          console.log('New message detected:', payload);
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Mark visitor messages as read when received by admin
          if (newMessage.sender_type === 'visitor') {
            markMessageAsRead(newMessage.id);
          }
        })
        .subscribe((status) => {
          console.log(`Message subscription status for session ${selectedSession.id}:`, status);
        });
        
      return () => {
        console.log('Removing message subscription for session:', selectedSession.id);
        supabase.removeChannel(subscription);
      };
    }
  }, [selectedSession]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Filter sessions based on search term
    if (sessions.length > 0) {
      const filtered = sessions.filter(session => 
        session.visitor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.visitor_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setActiveSessions(filtered.filter(session => session.status === 'active'));
      setClosedSessions(filtered.filter(session => session.status === 'closed'));
    }
  }, [sessions, searchTerm]);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      
      console.log('Loading chat sessions...');
      
      // Try a simpler query first to check if the table exists and has data
      const { data: simpleData, error: simpleError } = await supabase
        .from('chat_sessions')
        .select('*')
        .limit(10);
        
      if (simpleError) {
        console.error('Error fetching sessions with simple query:', simpleError);
        toast({
          title: "Error",
          description: "There was a problem loading chat sessions. The table might not exist.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      console.log('Simple query result:', simpleData);
      
      if (simpleData && simpleData.length > 0) {
        setSessions(simpleData);
        setActiveSessions(simpleData.filter(session => session.status === 'active'));
        setClosedSessions(simpleData.filter(session => session.status === 'closed'));
        console.log('Sessions loaded successfully:', simpleData.length);
      } else {
        console.log('No chat sessions found in the database');
        setSessions([]);
        setActiveSessions([]);
        setClosedSessions([]);
        
        toast({
          title: "No Chat Sessions",
          description: "No chat sessions found in the database.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast({
        title: "Error",
        description: "There was a problem loading chat sessions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      console.log('Loading messages for session:', sessionId);
      
      // First check if the session ID is valid
      if (!sessionId) {
        console.error('Invalid session ID:', sessionId);
        return;
      }
      
      // Try a simple query first to check if the table exists and has data
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error('Error loading messages:', error);
        toast({
          title: "Error",
          description: "There was a problem loading chat messages. The table might not exist.",
          variant: "destructive",
        });
        return;
      }
      
      console.log('Fetched messages:', data);
      
      if (data && data.length > 0) {
        setMessages(data);
        
        // Mark visitor messages as read
        const unreadVisitorMessages = data.filter(msg => 
          msg.sender_type === 'visitor' && !msg.is_read
        );
        
        console.log('Unread visitor messages:', unreadVisitorMessages.length);
        
        for (const msg of unreadVisitorMessages) {
          markMessageAsRead(msg.id);
        }
        
        // Update unread count in session
        if (unreadVisitorMessages.length > 0) {
          console.log('Updating unread count for session:', sessionId);
          
          try {
            await supabase
              .from('chat_sessions')
              .update({ unread_admin: 0 })
              .eq('id', sessionId);
              
            // Update local state
            setSessions(prev => 
              prev.map(session => 
                session.id === sessionId 
                  ? { ...session, unread_admin: 0 } 
                  : session
              )
            );
          } catch (updateError) {
            console.error('Error updating unread count:', updateError);
            // Continue anyway, this is not critical
          }
        }
      } else {
        console.log('No messages found for session:', sessionId);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "There was a problem loading chat messages.",
        variant: "destructive",
      });
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

  const handleSelectSession = (session: ChatSession) => {
    console.log('Selecting session:', session);
    setSelectedSession(session);
    loadMessages(session.id);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedSession) return;
    
    try {
      console.log('Sending message to session:', selectedSession.id);
      
      // Store the message content before clearing the input
      const messageContent = message.trim();
      
      // Clear the input field immediately for better UX
      setMessage('');
      
      // Create a temporary message to show immediately
      const tempMessage = {
        id: `temp-${Date.now()}`,
        sender_type: 'admin' as 'admin',
        message: messageContent,
        is_read: false,
        created_at: new Date().toISOString()
      };
      
      // Add the temporary message to the local state
      setMessages(prev => [...prev, tempMessage]);
      
      // Scroll to the bottom
      scrollToBottom();
      
      // Send to Supabase - let Supabase handle UUID generation
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: selectedSession.id,
          sender_type: 'admin',
          message: messageContent,
          is_read: false,
          // Add a flag to indicate this message should trigger a notification
          should_notify: true
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
          
          // Update the session's last_message_time
          updateSessionLastMessageTime(selectedSession.id);
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
  
  // Function to update the session's last_message_time
  const updateSessionLastMessageTime = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ 
          last_message_time: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);
        
      if (error) {
        console.error('Error updating session last_message_time:', error);
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleCloseSession = async () => {
    if (!selectedSession) return;
    
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ status: 'closed' })
        .eq('id', selectedSession.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Chat session closed successfully.",
      });
      
      // Update local state
      setSessions(prev => 
        prev.map(session => 
          session.id === selectedSession.id 
            ? { ...session, status: 'closed' } 
            : session
        )
      );
      
      // Reset selected session
      setSelectedSession(null);
    } catch (error) {
      console.error('Error closing session:', error);
      toast({
        title: "Error",
        description: "There was a problem closing the chat session.",
        variant: "destructive",
      });
    }
  };

  const handleReopenSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ status: 'active' })
        .eq('id', sessionId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Chat session reopened successfully.",
      });
      
      // Update local state
      setSessions(prev => 
        prev.map(session => 
          session.id === sessionId 
            ? { ...session, status: 'active' } 
            : session
        )
      );
    } catch (error) {
      console.error('Error reopening session:', error);
      toast({
        title: "Error",
        description: "There was a problem reopening the chat session.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dreampath-primary mb-2">Chat Management</h2>
        <p className="text-gray-600">Manage and respond to customer chat sessions</p>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)]">
        <div className="w-full md:w-1/3 flex flex-col">
          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          </div>
          
          <Tabs defaultValue="active" className="flex-1 flex flex-col">
            <TabsList className="mb-4">
              <TabsTrigger value="active" className="flex-1">
                Active 
                {activeSessions.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{activeSessions.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex-1">
                Closed
                {closedSessions.length > 0 && (
                  <Badge variant="outline" className="ml-2">{closedSessions.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="flex-1 overflow-y-auto space-y-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <RefreshCw className="h-6 w-6 animate-spin text-dreampath-primary" />
                </div>
              ) : activeSessions.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>No active chat sessions</p>
                </div>
              ) : (
                activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedSession?.id === session.id ? 'bg-dreampath-primary/10 border-dreampath-primary' : ''
                    }`}
                    onClick={() => handleSelectSession(session)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{session.visitor_name}</h4>
                        <p className="text-sm text-gray-600">{session.visitor_email}</p>
                      </div>
                      {session.unread_admin > 0 && (
                        <Badge variant="destructive">{session.unread_admin}</Badge>
                      )}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {session.last_message || 'No messages yet'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.last_message_time ? formatTime(session.last_message_time) : formatDate(session.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="closed" className="flex-1 overflow-y-auto space-y-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <RefreshCw className="h-6 w-6 animate-spin text-dreampath-primary" />
                </div>
              ) : closedSessions.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>No closed chat sessions</p>
                </div>
              ) : (
                closedSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedSession?.id === session.id ? 'bg-dreampath-primary/10 border-dreampath-primary' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{session.visitor_name}</h4>
                        <p className="text-sm text-gray-600">{session.visitor_email}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReopenSession(session.id);
                        }}
                      >
                        Reopen
                      </Button>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {session.last_message || 'No messages yet'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.last_message_time ? formatTime(session.last_message_time) : formatDate(session.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col">
          {selectedSession ? (
            <Card className="flex-1 flex flex-col overflow-hidden">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedSession.visitor_name}</CardTitle>
                    <CardDescription>{selectedSession.visitor_email}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedSession.status === 'active' ? 'default' : 'secondary'}>
                      {selectedSession.status === 'active' ? (
                        <><Clock className="h-3 w-3 mr-1" /> Active</>
                      ) : (
                        <><CheckCircle2 className="h-3 w-3 mr-1" /> Closed</>
                      )}
                    </Badge>
                    {selectedSession.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCloseSession}
                      >
                        Close Chat
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <p>No messages in this chat session</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex ${msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender_type === 'admin' 
                              ? 'bg-dreampath-primary text-white rounded-tr-none' 
                              : 'bg-gray-100 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p>{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.sender_type === 'admin' ? 'text-white/70' : 'text-gray-500'}`}>
                            {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              {selectedSession.status === 'active' && (
                <CardFooter className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="w-full flex gap-2">
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
                </CardFooter>
              )}
            </Card>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed">
              <div className="text-center p-6">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No Chat Selected</h3>
                <p className="text-gray-500 mt-2">Select a chat session from the list to view and respond to messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatManager;
