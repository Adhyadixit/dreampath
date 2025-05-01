import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Test function to check if we can insert data into the chat_sessions table
export const testChatSessionInsert = async () => {
  console.log('Testing chat session insert...');
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Key available:', supabaseKey ? 'Yes' : 'No');
  
  try {
    // Generate a test session ID
    const sessionId = `test-${Date.now()}`;
    
    // Create a test session
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        id: sessionId,
        visitor_id: 'test-visitor',
        visitor_name: 'Test User',
        visitor_email: 'test@example.com',
        status: 'active'
      })
      .select();
    
    if (error) {
      console.error('Error inserting test session:', error);
      return { success: false, error };
    }
    
    console.log('Test session inserted successfully:', data);
    
    // Try to insert a test message
    const { data: messageData, error: messageError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        sender_type: 'visitor',
        message: 'Test message'
      })
      .select();
    
    if (messageError) {
      console.error('Error inserting test message:', messageError);
      return { success: false, error: messageError };
    }
    
    console.log('Test message inserted successfully:', messageData);
    
    return { success: true, sessionData: data, messageData };
  } catch (err) {
    console.error('Unexpected error during test:', err);
    return { success: false, error: err };
  }
};

// Function to check if the tables exist
export const checkTablesExist = async () => {
  console.log('Checking if tables exist...');
  
  try {
    // Try to select from chat_sessions table
    const { data: sessionsData, error: sessionsError } = await supabase
      .from('chat_sessions')
      .select('count(*)')
      .limit(1);
    
    if (sessionsError) {
      console.error('Error checking chat_sessions table:', sessionsError);
      return { 
        success: false, 
        chat_sessions_exists: false,
        chat_messages_exists: false,
        error: sessionsError 
      };
    }
    
    // Try to select from chat_messages table
    const { data: messagesData, error: messagesError } = await supabase
      .from('chat_messages')
      .select('count(*)')
      .limit(1);
    
    if (messagesError) {
      console.error('Error checking chat_messages table:', messagesError);
      return { 
        success: false, 
        chat_sessions_exists: true,
        chat_messages_exists: false,
        error: messagesError 
      };
    }
    
    console.log('Tables exist check results:', { sessionsData, messagesData });
    
    return { 
      success: true, 
      chat_sessions_exists: true,
      chat_messages_exists: true,
      sessionsData,
      messagesData
    };
  } catch (err) {
    console.error('Unexpected error checking tables:', err);
    return { success: false, error: err };
  }
};
