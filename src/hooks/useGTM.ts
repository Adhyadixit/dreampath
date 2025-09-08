import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const useGTM = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Push the pageview event to the dataLayer
    window.dataLayer.push({
      event: 'pageview',
      page: {
        url: window.location.pathname + window.location.search + window.location.hash,
        title: document.title,
      },
    });
  }, [location]);

  // Helper function to track custom events
  const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
      });
    }
  };

  return { trackEvent };
};

export default useGTM;
