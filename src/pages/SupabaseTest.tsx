import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { supabase, testConnection } from '@/utils/supabaseConnection';

const SupabaseTest = () => {
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [isCheckingTables, setIsCheckingTables] = useState(false);
  const [isTestingInsert, setIsTestingInsert] = useState(false);
  const [connectionResult, setConnectionResult] = useState<any>(null);
  const [tablesResult, setTablesResult] = useState<any>(null);
  const [insertResult, setInsertResult] = useState<any>(null);
  const [envVariables, setEnvVariables] = useState<any>(null);

  // Check environment variables on component mount
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    setEnvVariables({
      url: supabaseUrl,
      keyAvailable: !!supabaseKey,
      keyFirstChars: supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'N/A'
    });
  }, []);

  const handleTestConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const result = await testConnection();
      setConnectionResult(result);
    } catch (error) {
      console.error('Error testing connection:', error);
      setConnectionResult({ 
        success: false, 
        error, 
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setIsCheckingConnection(false);
    }
  };

  const handleCheckTables = async () => {
    setIsCheckingTables(true);
    try {
      // Check if chat_sessions table exists
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('chat_sessions')
        .select('count(*)');
      
      // Check if chat_messages table exists
      const { data: messagesData, error: messagesError } = await supabase
        .from('chat_messages')
        .select('count(*)');
      
      setTablesResult({
        success: !sessionsError && !messagesError,
        chat_sessions: {
          exists: !sessionsError,
          error: sessionsError,
          data: sessionsData
        },
        chat_messages: {
          exists: !messagesError,
          error: messagesError,
          data: messagesData
        }
      });
    } catch (error) {
      console.error('Error checking tables:', error);
      setTablesResult({ 
        success: false, 
        error, 
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setIsCheckingTables(false);
    }
  };

  const handleTestInsert = async () => {
    setIsTestingInsert(true);
    try {
      // Generate a test session ID
      const timestamp = new Date().toISOString();
      
      // Try to insert a test session
      const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          visitor_id: 'test-visitor',
          visitor_name: 'Test User',
          visitor_email: 'test@example.com',
          status: 'active',
          created_at: timestamp,
          updated_at: timestamp
        })
        .select();
      
      if (sessionError) {
        setInsertResult({
          success: false,
          session_insert: {
            success: false,
            error: sessionError
          }
        });
        return;
      }
      
      // If session was created, try to insert a test message
      if (sessionData && sessionData.length > 0) {
        const { data: messageData, error: messageError } = await supabase
          .from('chat_messages')
          .insert({
            session_id: sessionData[0].id,
            sender_type: 'visitor',
            message: 'Test message',
            is_read: false,
            created_at: timestamp
          })
          .select();
        
        setInsertResult({
          success: !messageError,
          session_insert: {
            success: true,
            data: sessionData
          },
          message_insert: {
            success: !messageError,
            error: messageError,
            data: messageData
          }
        });
      }
    } catch (error) {
      console.error('Error testing insert:', error);
      setInsertResult({ 
        success: false, 
        error, 
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setIsTestingInsert(false);
    }
  };

  return (
    <div className="container-wide py-12">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
      
      <div className="grid grid-cols-1 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Check if Supabase environment variables are properly loaded</CardDescription>
          </CardHeader>
          <CardContent>
            {envVariables && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Environment Variables:</h3>
                <ul className="space-y-2">
                  <li><strong>VITE_SUPABASE_URL:</strong> {envVariables.url || 'Not found'}</li>
                  <li><strong>VITE_SUPABASE_ANON_KEY:</strong> {envVariables.keyAvailable ? `Available (starts with ${envVariables.keyFirstChars})` : 'Not found'}</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Connection</CardTitle>
            <CardDescription>Test the basic Supabase connection</CardDescription>
          </CardHeader>
          <CardContent>
            {connectionResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Result:</h3>
                <div className={`p-2 rounded ${connectionResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p><strong>Status:</strong> {connectionResult.success ? 'Success' : 'Failed'}</p>
                  {!connectionResult.success && (
                    <p><strong>Error:</strong> {connectionResult.message}</p>
                  )}
                </div>
                <pre className="text-sm overflow-auto max-h-60 p-2 bg-gray-100 rounded mt-2">
                  {JSON.stringify(connectionResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleTestConnection} 
              disabled={isCheckingConnection}
              className="w-full"
            >
              {isCheckingConnection ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : 'Test Connection'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Check Tables</CardTitle>
            <CardDescription>Verify that the chat tables exist in your Supabase database</CardDescription>
          </CardHeader>
          <CardContent>
            {tablesResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Result:</h3>
                <div className={`p-2 rounded ${tablesResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p><strong>Status:</strong> {tablesResult.success ? 'All tables exist' : 'Some tables missing'}</p>
                  {tablesResult.chat_sessions && (
                    <p><strong>chat_sessions:</strong> {tablesResult.chat_sessions.exists ? 'Exists' : 'Missing'}</p>
                  )}
                  {tablesResult.chat_messages && (
                    <p><strong>chat_messages:</strong> {tablesResult.chat_messages.exists ? 'Exists' : 'Missing'}</p>
                  )}
                </div>
                <pre className="text-sm overflow-auto max-h-60 p-2 bg-gray-100 rounded mt-2">
                  {JSON.stringify(tablesResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCheckTables} 
              disabled={isCheckingTables}
              className="w-full"
            >
              {isCheckingTables ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : 'Check Tables'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Data Insert</CardTitle>
            <CardDescription>Try to insert test data into the chat tables</CardDescription>
          </CardHeader>
          <CardContent>
            {insertResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Result:</h3>
                <div className={`p-2 rounded ${insertResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p><strong>Status:</strong> {insertResult.success ? 'Success' : 'Failed'}</p>
                  {insertResult.session_insert && (
                    <p><strong>Session Insert:</strong> {insertResult.session_insert.success ? 'Success' : 'Failed'}</p>
                  )}
                  {insertResult.message_insert && (
                    <p><strong>Message Insert:</strong> {insertResult.message_insert.success ? 'Success' : 'Failed'}</p>
                  )}
                </div>
                <pre className="text-sm overflow-auto max-h-60 p-2 bg-gray-100 rounded mt-2">
                  {JSON.stringify(insertResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleTestInsert} 
              disabled={isTestingInsert}
              className="w-full"
            >
              {isTestingInsert ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : 'Test Insert'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SupabaseTest;
