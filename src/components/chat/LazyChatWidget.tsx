import { useState, useEffect, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load the ChatWidget component
const ChatWidget = lazy(() => import('./ChatWidget'));

// Loading component
const LoadingSpinner = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <div className="bg-white rounded-full p-3 shadow-lg">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  </div>
);

const LazyChatWidget = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolled) {
        setIsScrolled(true);
        // Remove the event listener after the first scroll
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set a timeout to load the chat widget after 10 seconds even if user doesn't scroll
    const timer = setTimeout(() => {
      if (!isScrolled) {
        setIsScrolled(true);
        window.removeEventListener('scroll', handleScroll);
      }
    }, 10000);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isScrolled]);

  // Only render the ChatWidget after the user has scrolled or after timeout
  if (!isScrolled) return null;
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ChatWidget />
    </Suspense>
  );
};

export default LazyChatWidget;
