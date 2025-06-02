import { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { trackPortfolioEvent, trackEvent } from '@/lib/analytics';
import { analyticsConfig } from '@/config/GoogleAnalyticsConfiguration';

export function AnalyticsTest() {
  const [isVisible, setIsVisible] = useState(false);
  // Show only in development
  if (!analyticsConfig.shouldShowDebugPanel()) return null;

  const testEvents = [
    {
      name: 'Page View',
      action: () => trackEvent('test_page_view', 'test', 'Analytics Test Page'),
    },
    {
      name: 'Section View',
      action: () => trackPortfolioEvent.sectionView('test_section'),
    },
    {
      name: 'Project View',
      action: () => trackPortfolioEvent.projectView('Test Project'),
    },
    {
      name: 'Social Click',
      action: () => trackPortfolioEvent.socialClick('test_platform'),
    },
    {
      name: 'Resume Download',
      action: () => trackPortfolioEvent.resumeDownload(),
    },
    {
      name: 'Contact Form Start',
      action: () => trackPortfolioEvent.contactFormStart(),
    },
    {
      name: 'Skill Hover',
      action: () => trackPortfolioEvent.skillHover('React'),
    },    {
      name: 'Scroll Depth',
      action: () => trackEvent(analyticsConfig.eventActions.SCROLL_DEPTH, analyticsConfig.eventCategories.ENGAGEMENT, '50%', 50),
    },
  ];

  if (!isVisible) {
    return (
      <Button
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
      >
        🧪 Test Analytics
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-80 z-50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Analytics Test Panel</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(false)}
          >
            ×
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Click buttons to fire test events
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {testEvents.map((event, index) => (
            <Button
              key={index}
              onClick={event.action}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {event.name}
            </Button>
          ))}
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Check browser console and debug panel (Ctrl+Shift+A) for event logs
        </div>
      </CardContent>
    </Card>
  );
}
