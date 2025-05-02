import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { findBestResponse, greetings, connectToAgentResponses, whatsappDirectLink } from '@/utils/chatbotData';

interface ChatbotMessage {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatbotProps {
  onConnectToAgent: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onConnectToAgent }) => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showWhatsappLink, setShowWhatsappLink] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with a greeting
  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setMessages([
      {
        id: Date.now().toString(),
        content: randomGreeting,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    
    // Focus the input field when the chat loads
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simulate typing effect for bot messages
  const addBotResponse = (content: string) => {
    setIsTyping(true);
    
    // Simulate typing delay based on message length
    const typingDelay = Math.min(1000, Math.max(500, content.length * 10));
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }, typingDelay);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatbotMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Store user input before clearing
    const userInput = inputValue.toLowerCase();
    setInputValue('');
    
    // Check for connect to agent request
    if (
      userInput.includes('agent') || 
      userInput.includes('human') || 
      userInput.includes('person') || 
      userInput.includes('representative') ||
      userInput.includes('real person') ||
      userInput.includes('talk to someone') ||
      userInput.includes('whatsapp') ||
      (userInput.includes('yes') && messages.some(msg => {
        return msg.sender === 'bot' && (
          msg.content.includes('Would you like to speak with') || 
          msg.content.includes('Would you like me to connect you') ||
          msg.content.includes('Would you like to chat with a human') ||
          msg.content.includes('Would you like to connect with an agent')
        );
      }))
    ) {
      // User wants to connect to an agent - show WhatsApp link directly
      const response = connectToAgentResponses[Math.floor(Math.random() * connectToAgentResponses.length)];
      addBotResponse(response);
      setShowWhatsappLink(true);
    } else {
      // Regular response
      const response = findBestResponse(userInput);
      addBotResponse(response);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-dreampath-accent text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs mt-1 opacity-70 text-right">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* WhatsApp direct link button */}
        {showWhatsappLink && (
          <div className="flex justify-center my-2">
            <a 
              href={whatsappDirectLink}
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(whatsappDirectLink, '_blank', 'noopener,noreferrer');
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contact us on WhatsApp
            </a>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="border-t p-4 mt-auto">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
