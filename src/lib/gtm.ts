// Google Tag Manager configuration
type EventParams = {
  event: string;
  [key: string]: any;
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const GTM_ID = 'GTM-TFKTDJPN';

// Initialize GTM
export const initGTM = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  }
};

// Track page view
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData: Record<string, any> = {}) => {
  trackEvent('form_submission', {
    form_name: formName,
    ...formData,
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, newTab = false) => {
  trackEvent('outbound_link', {
    link_url: url,
    link_new_tab: newTab,
  });
  
  // If not opening in a new tab, delay the navigation to allow the event to be sent
  if (!newTab) {
    setTimeout(() => {
      window.location.href = url;
    }, 100);
    return false;
  }
  return true;
};
