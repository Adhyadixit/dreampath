import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the window to the top
 * whenever the route (pathname) changes.
 * 
 * This component doesn't render anything, it just performs
 * the scrolling effect.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of page when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add smooth scrolling
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
