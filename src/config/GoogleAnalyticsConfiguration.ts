/**
 * Google Analytics Configuration
 * Simplified configuration for Google Analytics tracking
 */

export interface AnalyticsSettings {
  anonymize_ip: boolean;
  allow_google_signals: boolean;
  allow_ad_personalization_signals: boolean;
  send_page_view: boolean;
}

export interface DebugSettings {
  keyboardShortcut: string;
  maxEvents: number;
  showInProduction: boolean;
}

export interface ScrollDepthSettings {
  trackingIntervals: number[];
}

class GoogleAnalyticsConfiguration {
  public readonly trackingId: string = 'G-Q1760H3DK9';
  
  public readonly propertyName: string = 'Davis Kolakowski Portfolio';
  
  public readonly streamUrl: string = 'https://daviskolakowski.com';
  
  public readonly streamId: string = '11299271420';

  public readonly analyticsSettings: AnalyticsSettings = {
    anonymize_ip: true,
    allow_google_signals: true,
    allow_ad_personalization_signals: false,
    send_page_view: true
  };

  public readonly debugSettings: DebugSettings = {
    keyboardShortcut: 'Ctrl+Shift+A',
    maxEvents: 20,
    showInProduction: false
  };

  public readonly scrollDepthSettings: ScrollDepthSettings = {
    trackingIntervals: [25, 50, 75, 100]
  };

  public readonly eventCategories = {
    NAVIGATION: 'navigation',
    PROJECT: 'project',
    CONTACT_FORM: 'contact_form',
    SOCIAL: 'social',
    RESUME: 'resume',
    SECTION: 'section',
    SKILL: 'skill',
    ENGAGEMENT: 'engagement',
    ERROR: 'error',
    PROJECT_LINK: 'project_link',
    TIMING: 'timing',
    EXCEPTION: 'exception'
  } as const;

  public readonly eventActions = {
    VIEW: 'view',
    CLICK: 'click',
    SUBMIT: 'submit',
    START: 'start',
    DOWNLOAD: 'download',
    HOVER: 'hover',
    TIMING: 'timing',
    SCROLL_DEPTH: 'scroll_depth'
  } as const;

  public getGtagConfigSettings() {
    return {
      ...this.analyticsSettings,
      page_location: window?.location.href,
    };
  }

  public isScrollDepthInterval(percentage: number): boolean {
    return this.scrollDepthSettings.trackingIntervals.includes(percentage);
  }

  public shouldShowDebugPanel(): boolean {
    return import.meta.env.DEV && !this.debugSettings.showInProduction;
  }

  public getDebugKeyboardShortcut(): { ctrl: boolean; shift: boolean; key: string } {
    // Parse "Ctrl+Shift+A" format
    const parts = this.debugSettings.keyboardShortcut.split('+');
    return {
      ctrl: parts.includes('Ctrl'),
      shift: parts.includes('Shift'),
      key: parts[parts.length - 1]
    };
  }

  public isAnalyticsReady(): boolean {
    return typeof window !== 'undefined' && 
           typeof window.gtag === 'function' && 
           Array.isArray(window.dataLayer);
  }

  public waitForAnalytics(maxWaitMs: number = 5000): Promise<boolean> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const checkReady = () => {
        if (this.isAnalyticsReady()) {
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > maxWaitMs) {
          console.warn('⚠️ Analytics initialization timeout');
          resolve(false);
          return;
        }
        
        setTimeout(checkReady, 100);
      };
      
      checkReady();
    });
  }
}

export const analyticsConfig = new GoogleAnalyticsConfiguration();
