import { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface AnalyticsEvent {
  timestamp: number;
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function AnalyticsDebug() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Only show in development
    if (import.meta.env.PROD) return;

    // Override gtag to capture events for debugging
    const originalGtag = window.gtag;
    window.gtag = function(command: string, ...args: any[]) {
      if (command === 'event' && args[0]) {
        const [action, params] = args;
        setEvents(prev => [...prev, {
          timestamp: Date.now(),
          action,
          category: params?.event_category || 'unknown',
          label: params?.event_label,
          value: params?.value
        }].slice(-20)); // Keep only last 20 events
      }
      if (originalGtag) {
        originalGtag(command, ...args);
      }
    };

    // Show/hide with keyboard shortcut
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  if (import.meta.env.PROD || !isVisible) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-80 overflow-hidden z-50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Analytics Debug</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(false)}
          >
            ×
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Press Ctrl+Shift+A to toggle
        </p>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-48">
        {events.length === 0 ? (
          <p className="text-xs text-muted-foreground">No events captured yet</p>
        ) : (
          <div className="space-y-2">
            {events.reverse().map((event, index) => (
              <div key={index} className="text-xs p-2 bg-muted rounded">
                <div className="font-mono">
                  <span className="text-blue-600">{event.action}</span>
                  <span className="text-gray-500"> | {event.category}</span>
                  {event.label && <span className="text-green-600"> | {event.label}</span>}
                  {event.value && <span className="text-orange-600"> | {event.value}</span>}
                </div>
                <div className="text-gray-400 text-xs">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
