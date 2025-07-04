import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { analyticsConfig } from '@/config/GoogleAnalyticsConfiguration';

interface HealthCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export function AnalyticsHealth() {
  const [isVisible, setIsVisible] = useState(false);
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);

  const runHealthChecks = () => {
    const checks: HealthCheck[] = [];

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      checks.push({
        name: 'gtag Function',
        status: 'pass',
        message: 'gtag function is available'
      });
    } else {
      checks.push({
        name: 'gtag Function',
        status: 'fail',
        message: 'gtag function not found'
      });
    }

    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      checks.push({
        name: 'dataLayer',
        status: 'pass',
        message: `dataLayer exists with ${window.dataLayer.length} items`
      });
    } else {
      checks.push({
        name: 'dataLayer',
        status: 'fail',
        message: 'dataLayer not found or not an array'
      });
    }

    checks.push({
      name: 'Tracking ID',
      status: 'pass',
      message: `Using ${analyticsConfig.trackingId}`
    });

    if (navigator.onLine) {
      checks.push({
        name: 'Network',
        status: 'pass',
        message: 'Online'
      });
    } else {
      checks.push({
        name: 'Network',
        status: 'fail',
        message: 'Offline'
      });
    }

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('config', analyticsConfig.trackingId);
        checks.push({
          name: 'Ad Blocker',
          status: 'pass',
          message: 'Analytics not blocked'
        });
      } catch (error) {
        checks.push({
          name: 'Ad Blocker',
          status: 'warning',
          message: 'Analytics might be blocked'
        });
      }
    }

    setHealthChecks(checks);
  };

  useEffect(() => {
    if (isVisible) {
      runHealthChecks();
    }
  }, [isVisible]);

  if (!analyticsConfig.shouldShowDebugPanel()) return null;

  if (!isVisible) {
    return (
      <Button
        className="fixed top-4 left-4 z-40"
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
      >
        🏥 Analytics Health
      </Button>
    );
  }

  return (
    <Card className="fixed top-4 left-4 w-80 max-h-96 overflow-hidden z-50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Analytics Health Check</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(false)}
          >
            ×
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={runHealthChecks}
        >
          🔄 Refresh
        </Button>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-72">
        <div className="space-y-2">
          {healthChecks.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <div className="flex-1">
                <div className="font-medium text-sm">{check.name}</div>
                <div className="text-xs text-muted-foreground">{check.message}</div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                check.status === 'pass' ? 'bg-green-500' :
                check.status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
