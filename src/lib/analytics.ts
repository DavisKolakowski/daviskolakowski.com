// Google Analytics utility functions
import { analyticsConfig } from '@/config/GoogleAnalyticsConfiguration';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = analyticsConfig.trackingId;

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
    try {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
      
      // Console log in development for debugging
      if (import.meta.env.DEV) {
        console.log(`📊 Analytics Event:`, {
          action,
          category,
          label,
          value
        });
      }
    } catch (error) {
      console.error('❌ Analytics tracking error:', error);
    }
  } else {
    console.warn('⚠️ Analytics not available for event:', { action, category, label, value });
  }
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', analyticsConfig.eventActions.SCROLL_DEPTH, {
      event_category: analyticsConfig.eventCategories.ENGAGEMENT,
      event_label: `${percentage}%`,
      value: percentage,
    });
  }
};

// Track specific portfolio events
export const trackPortfolioEvent = {
  // Contact form interactions
  contactFormSubmit: () => trackEvent(analyticsConfig.eventActions.SUBMIT, analyticsConfig.eventCategories.CONTACT_FORM, 'Contact Form'),
  contactFormStart: () => trackEvent(analyticsConfig.eventActions.START, analyticsConfig.eventCategories.CONTACT_FORM, 'Contact Form Started'),
  
  // Project interactions
  projectView: (projectName: string) => trackEvent(analyticsConfig.eventActions.VIEW, analyticsConfig.eventCategories.PROJECT, projectName),
  projectLinkClick: (projectName: string, linkType: 'demo' | 'github') => 
    trackEvent(analyticsConfig.eventActions.CLICK, analyticsConfig.eventCategories.PROJECT_LINK, `${projectName}_${linkType}`),
  
  // Resume/CV interactions
  resumeDownload: () => trackEvent(analyticsConfig.eventActions.DOWNLOAD, analyticsConfig.eventCategories.RESUME, 'Resume PDF'),
  resumeView: () => trackEvent(analyticsConfig.eventActions.VIEW, analyticsConfig.eventCategories.RESUME, 'Resume View'),
  
  // Social media clicks
  socialClick: (platform: string) => trackEvent(analyticsConfig.eventActions.CLICK, analyticsConfig.eventCategories.SOCIAL, platform),
  
  // Navigation
  sectionView: (section: string) => trackEvent(analyticsConfig.eventActions.VIEW, analyticsConfig.eventCategories.SECTION, section),
  
  // Skills interaction
  skillHover: (skill: string) => trackEvent(analyticsConfig.eventActions.HOVER, analyticsConfig.eventCategories.SKILL, skill),

  // Performance metrics
  timeOnSite: (seconds: number) => trackEvent(analyticsConfig.eventActions.TIMING, analyticsConfig.eventCategories.ENGAGEMENT, 'Time on Site', seconds),
  
  // Error tracking
  errorOccurred: (errorType: string, errorMessage: string) => 
    trackEvent(analyticsConfig.eventActions.TIMING, analyticsConfig.eventCategories.ERROR, `${errorType}: ${errorMessage}`),
};

// Initialize analytics (call this in your main App component)
export const initializeAnalytics = async () => {
  // Wait for analytics to be ready
  const isReady = await analyticsConfig.waitForAnalytics();
  
  if (!isReady) {
    console.error('❌ Failed to initialize Google Analytics');
    return;
  }

  // Track initial page load
  if (typeof window !== 'undefined') {
    // In development, automatically grant consent for testing
    if (import.meta.env.DEV) {
      window.gtag('consent', 'update', analyticsConfig.getConsentSettings(true));
      console.log('🔧 Development mode: Analytics consent automatically granted for testing');
    }
    
    // Enhanced page view tracking
    trackPageView(window.location.pathname + window.location.search);

    // Track time on site with more granular intervals
    const startTime = Date.now();
    const trackTimeOnSite = () => {
      const timeOnSite = Math.round((Date.now() - startTime) / 1000);
      trackPortfolioEvent.timeOnSite(timeOnSite);
    };

    // Track time on site when user leaves
    window.addEventListener('beforeunload', trackTimeOnSite);
    
    // Also track every 30 seconds for better engagement metrics
    const timeInterval = setInterval(() => {
      const timeOnSite = Math.round((Date.now() - startTime) / 1000);
      if (timeOnSite % 30 === 0 && timeOnSite <= 300) { // Track up to 5 minutes
        trackEvent('engagement_time', analyticsConfig.eventCategories.ENGAGEMENT, `${timeOnSite}s`, timeOnSite);
      }
    }, 30000);
    
    // Clear interval on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(timeInterval);
    });

    // Track scroll depth with enhanced logic
    let maxScrollDepth = 0;
    let scrollTimer: number | null = null;
    
    const trackScrollDepthHandler = () => {
      // Debounce scroll events
      if (scrollTimer) clearTimeout(scrollTimer);
      
      scrollTimer = window.setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScrollDepth && analyticsConfig.isScrollDepthInterval(scrollPercent)) {
          maxScrollDepth = scrollPercent;
          trackScrollDepth(scrollPercent);
        }
      }, 250);
    };

    window.addEventListener('scroll', trackScrollDepthHandler, { passive: true });

    // Enhanced error tracking
    window.addEventListener('error', (error) => {
      trackPortfolioEvent.errorOccurred('JavaScript Error', error.message);
      console.error('🐛 JavaScript Error tracked:', error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      trackPortfolioEvent.errorOccurred('Promise Rejection', event.reason?.toString() || 'Unknown');
      console.error('🐛 Promise Rejection tracked:', event);
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackEvent('page_hidden', analyticsConfig.eventCategories.ENGAGEMENT, 'Page Hidden');
      } else {
        trackEvent('page_visible', analyticsConfig.eventCategories.ENGAGEMENT, 'Page Visible');
      }
    });

    console.log('✅ Google Analytics initialized successfully');
  }
};
