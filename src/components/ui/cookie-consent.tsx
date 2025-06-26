import { useState, useEffect } from 'react';
import { Button } from './button';

interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // In development mode, show a notice that consent is auto-granted
      if (import.meta.env.DEV) {
        console.log('🔧 Development mode: Cookie consent automatically granted for testing');
        const devConsent = {
          analytics: true,
          marketing: false,
          functional: true,
        };
        localStorage.setItem('cookie-consent', JSON.stringify(devConsent));
        updateGoogleConsent(devConsent);
        setIsVisible(false);
      } else {
        // In production, show consent banner after a short delay
        setTimeout(() => setIsVisible(true), 1000);
      }
    } else {
      const savedPreferences = JSON.parse(consent);
      updateGoogleConsent(savedPreferences);
    }
  }, []);
  const updateGoogleConsent = (prefs: ConsentPreferences) => {
    if (typeof window !== 'undefined' && window.gtag) {
      const consentSettings = {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        functionality_storage: prefs.functional ? 'granted' : 'denied',
        personalization_storage: prefs.marketing ? 'granted' : 'denied',
      };
      
      window.gtag('consent', 'update', consentSettings);
      
      // Debug logging
      if (import.meta.env.DEV) {
        console.log('🍪 Cookie consent updated:', consentSettings);
      }
      
      // Track consent choice
      if (window.gtag) {
        window.gtag('event', 'consent_update', {
          event_category: 'privacy',
          analytics_consent: prefs.analytics,
          marketing_consent: prefs.marketing,
        });
      }
    }
  };

  const handleAcceptAll = () => {
    const allConsent = {
      analytics: true,
      marketing: true,
      functional: true,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allConsent));
    updateGoogleConsent(allConsent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      analytics: false,
      marketing: false,
      functional: true,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    updateGoogleConsent(minimalConsent);
    setIsVisible(false);
  };

  // In development, show a banner indicating auto-consent
  if (import.meta.env.DEV && !isVisible) {
    return (
      <div className="fixed top-4 right-4 max-w-sm z-50 bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg shadow-lg text-xs">
        <div className="font-semibold">🔧 Development Mode</div>
        <div>Analytics consent auto-granted for testing</div>
        <div className="text-xs mt-1 opacity-75">
          Press Ctrl+Shift+A for debug panel
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 max-w-md z-50 bg-card p-6 rounded-lg shadow-lg border">
      <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
      <p className="text-sm text-muted-foreground mb-4">
        We use cookies to enhance your experience and analyze site usage. 
        You can accept all cookies or choose your preferences.
      </p>
      
      <div className="flex gap-2">
        <Button onClick={handleAcceptAll} className="flex-1">
          Accept All
        </Button>
        <Button onClick={handleRejectAll} variant="outline" className="flex-1">
          Essential Only
        </Button>
      </div>
    </div>
  );
}
