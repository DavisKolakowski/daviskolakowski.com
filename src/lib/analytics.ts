// Google Analytics utility functions
import { analyticsConfig } from '@/config/GoogleAnalyticsConfiguration';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
    GA_CONFIG_READY: boolean;
    GA_SCRIPT_LOADED: boolean;
    APP_CONFIG: {
      analytics: {
        trackingId: string;
        analyticsSettings: any;
      };
    };
  }
}

export const GA_TRACKING_ID = analyticsConfig.trackingId;

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('config', GA_TRACKING_ID, {
        page_location: url,
        page_title: document.title,
        send_page_view: true
      });
      
      if (import.meta.env.DEV) {
        console.log(`📊 Page View Tracked:`, { url, title: document.title });
      }
    } catch (error) {
      console.error('❌ Page view tracking error:', error);
    }
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
  if (typeof window === 'undefined') {
    console.warn('⚠️ Analytics initialization skipped - not in browser environment');
    return false;
  }

  // Wait for both config and script to be ready
  const isReady = await waitForAnalyticsReady();
  
  if (!isReady) {
    console.error('❌ Failed to initialize Google Analytics - timeout waiting for script');
    return false;
  }

  try {
    // Get config from window (set by HTML script)
    const gaConfig = window.APP_CONFIG?.analytics;
    if (!gaConfig) {
      console.error('❌ GA config not found in window.APP_CONFIG');
      return false;
    }

    // Configure GA with enhanced settings (only if not already configured in HTML)
    window.gtag('config', gaConfig.trackingId, {
      ...gaConfig.analyticsSettings,
      enhanced_measurement: true,
      page_location: window.location.href,
      page_title: document.title,
      send_page_view: true,
      // Add custom parameters for better tracking
      custom_map: {
        'custom_parameter_1': 'portfolio_version'
      }
    });

    // Track initial page load
    trackPageView(window.location.pathname + window.location.search);

    // Set up enhanced event tracking
    setupEnhancedTracking();
    
    console.log('✅ Google Analytics initialized successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Analytics initialization error:', error);
    return false;
  }
};

// Helper function to wait for analytics to be ready
const waitForAnalyticsReady = (maxWaitMs: number = 10000): Promise<boolean> => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const checkReady = () => {
      // Check if all required components are ready
      const hasGtag = typeof window.gtag === 'function';
      const hasDataLayer = Array.isArray(window.dataLayer);
      const hasConfig = !!window.APP_CONFIG?.analytics;
      const scriptLoaded = window.GA_SCRIPT_LOADED === true;
      
      if (hasGtag && hasDataLayer && hasConfig && scriptLoaded) {
        resolve(true);
        return;
      }
      
      if (Date.now() - startTime > maxWaitMs) {
        console.warn('⚠️ Analytics initialization timeout', {
          hasGtag,
          hasDataLayer,
          hasConfig,
          scriptLoaded,
          waitTime: Date.now() - startTime
        });
        resolve(false);
        return;
      }
      
      setTimeout(checkReady, 100);
    };
    
    checkReady();
  });
};

// Set up enhanced tracking features
const setupEnhancedTracking = () => {
  const startTime = Date.now();
  
  // Track time on site with better intervals
  const trackTimeOnSite = () => {
    const timeOnSite = Math.round((Date.now() - startTime) / 1000);
    trackPortfolioEvent.timeOnSite(timeOnSite);
  };

  // Track time on site when user leaves
  window.addEventListener('beforeunload', trackTimeOnSite);
  
  // Track engagement at specific intervals
  const engagementIntervals = [30, 60, 120, 300, 600]; // 30s, 1m, 2m, 5m, 10m
  engagementIntervals.forEach(seconds => {
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        trackEvent('engagement_milestone', analyticsConfig.eventCategories.ENGAGEMENT, `${seconds}s`, seconds);
      }
    }, seconds * 1000);
  });

  // Enhanced scroll depth tracking
  let maxScrollDepth = 0;
  let scrollTimer: number | null = null;
  
  const trackScrollDepthHandler = () => {
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

  // Enhanced error tracking with more context
  window.addEventListener('error', (error) => {
    trackPortfolioEvent.errorOccurred(
      'JavaScript Error', 
      `${error.message} at ${error.filename}:${error.lineno}:${error.colno}`
    );
    console.error('🐛 JavaScript Error tracked:', error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || 'Unknown rejection';
    trackPortfolioEvent.errorOccurred('Promise Rejection', reason);
    console.error('🐛 Promise Rejection tracked:', event);
  });

  // Track page visibility changes for better engagement metrics
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackEvent('page_hidden', analyticsConfig.eventCategories.ENGAGEMENT, 'Page Hidden');
    } else {
      trackEvent('page_visible', analyticsConfig.eventCategories.ENGAGEMENT, 'Page Visible');
    }
  });

  // Track user interaction events
  let interactionCount = 0;
  ['click', 'keydown', 'scroll', 'mousemove'].forEach(eventType => {
    document.addEventListener(eventType, () => {
      interactionCount++;
      // Track first interaction for engagement timing
      if (interactionCount === 1) {
        const timeToFirstInteraction = Math.round((Date.now() - startTime) / 1000);
        trackEvent('first_interaction', analyticsConfig.eventCategories.ENGAGEMENT, eventType, timeToFirstInteraction);
      }
    }, { once: eventType !== 'scroll' && eventType !== 'mousemove', passive: true });
  });

  // Track performance metrics
  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = Math.round(navigation.loadEventEnd - navigation.loadEventStart);
          const domContentLoaded = Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
          
          trackEvent('page_load_time', analyticsConfig.eventCategories.TIMING, 'Load Time', loadTime);
          trackEvent('dom_content_loaded', analyticsConfig.eventCategories.TIMING, 'DOM Content Loaded', domContentLoaded);
        }
      }, 100);
    });
  }
};
