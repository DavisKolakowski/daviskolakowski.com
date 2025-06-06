import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnalyticsDebug } from "@/components/ui/analytics-debug";
import { AnalyticsTest } from "@/components/ui/analytics-test";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { initializeAnalytics } from "@/lib/analytics";
import Home from "@/pages/home";

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initializeAnalytics();
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Home />
      <AnalyticsDebug />
      <AnalyticsTest />
      <CookieConsent />
    </TooltipProvider>
  );
}

export default App;
