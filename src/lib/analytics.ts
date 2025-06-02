// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-Q1760H3DK9';

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage,
    });
  }
};

// Track specific portfolio events
export const trackPortfolioEvent = {
  // Contact form interactions
  contactFormSubmit: () => trackEvent('submit', 'contact_form', 'Contact Form'),
  contactFormStart: () => trackEvent('start', 'contact_form', 'Contact Form Started'),
  
  // Project interactions
  projectView: (projectName: string) => trackEvent('view', 'project', projectName),
  projectLinkClick: (projectName: string, linkType: 'demo' | 'github') => 
    trackEvent('click', 'project_link', `${projectName}_${linkType}`),
  
  // Resume/CV interactions
  resumeDownload: () => trackEvent('download', 'resume', 'Resume PDF'),
  resumeView: () => trackEvent('view', 'resume', 'Resume View'),
  
  // Social media clicks
  socialClick: (platform: string) => trackEvent('click', 'social', platform),
  
  // Navigation
  sectionView: (section: string) => trackEvent('view', 'section', section),
  
  // Skills interaction
  skillHover: (skill: string) => trackEvent('hover', 'skill', skill),

  // Performance metrics
  timeOnSite: (seconds: number) => trackEvent('timing', 'engagement', 'Time on Site', seconds),
  
  // Error tracking
  errorOccurred: (errorType: string, errorMessage: string) => 
    trackEvent('exception', 'error', `${errorType}: ${errorMessage}`),
};

// Initialize analytics (call this in your main App component)
export const initializeAnalytics = () => {
  // Track initial page load
  if (typeof window !== 'undefined') {
    trackPageView(window.location.pathname + window.location.search);

    // Track time on site
    const startTime = Date.now();
    const trackTimeOnSite = () => {
      const timeOnSite = Math.round((Date.now() - startTime) / 1000);
      trackPortfolioEvent.timeOnSite(timeOnSite);
    };

    // Track time on site when user leaves
    window.addEventListener('beforeunload', trackTimeOnSite);

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepthHandler = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        trackScrollDepth(scrollPercent);
      }
    };

    window.addEventListener('scroll', trackScrollDepthHandler);

    // Track errors
    window.addEventListener('error', (error) => {
      trackPortfolioEvent.errorOccurred('JavaScript Error', error.message);
    });

    window.addEventListener('unhandledrejection', (event) => {
      trackPortfolioEvent.errorOccurred('Promise Rejection', event.reason?.toString() || 'Unknown');
    });
  }
};
