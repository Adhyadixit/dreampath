import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GTM_ID, trackPageView } from '@/lib/gtm';

interface GTMProviderProps {
  children: React.ReactNode;
}

export const GTMProvider: React.FC<GTMProviderProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname + location.search;

  // Track page views when the path changes
  useEffect(() => {
    trackPageView(path);
  }, [path]);

  return <>{children}</>;
};

export default GTMProvider;
