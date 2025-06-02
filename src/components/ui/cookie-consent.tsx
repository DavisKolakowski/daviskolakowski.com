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
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      updateGoogleConsent(savedPreferences);
    }
  }, []);

  const updateGoogleConsent = (prefs: ConsentPreferences) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        functionality_storage: prefs.functional ? 'granted' : 'denied',
        personalization_storage: prefs.marketing ? 'granted' : 'denied',
      });
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
