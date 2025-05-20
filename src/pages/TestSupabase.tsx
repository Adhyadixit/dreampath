import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabase() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...');
        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
        
        // Test connection by fetching the current user (won't fail even if not logged in)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        console.log('Supabase connection successful');
        console.log('Session:', session);
        
        // Test inserting a test record
        const testData = {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+1234567890',
          message: 'This is a test message',
          service: 'test-service'
        };
        
        console.log('Attempting to insert test data...');
        const { data, error: insertError } = await supabase
          .from('project_inquiries')
          .insert([testData])
          .select();
          
        if (insertError) {
          throw insertError;
        }
        
        console.log('Test data inserted successfully:', data);
        setSuccess(true);
        
      } catch (err) {
        console.error('Supabase test failed:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
        
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dreampath-primary mx-auto mb-4"></div>
            <p>Testing connection to Supabase...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Connection Failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                    <code className="text-xs text-gray-800">
                      {JSON.stringify({
                        VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
                        VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
                      }, null, 2)}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Connection Successful!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Successfully connected to Supabase and inserted a test record.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium mb-4">Next Steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Check your Supabase dashboard to verify the test data was inserted</li>
            <li>Ensure the <code className="bg-gray-100 px-1 rounded">project_inquiries</code> table exists with the correct schema</li>
            <li>Verify RLS (Row Level Security) policies allow inserts from anonymous users</li>
            <li>Check the browser console for detailed logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
