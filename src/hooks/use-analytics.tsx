import { useEffect, useRef } from 'react';
import { trackPortfolioEvent } from '@/lib/analytics';

interface UseAnalyticsOptions {
  threshold?: number;
  trackOnce?: boolean;
}

export const useAnalyticsOnView = (
  sectionName: string,
  options: UseAnalyticsOptions = {}
) => {
  const { threshold = 0.5, trackOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!trackOnce || !hasTracked.current)) {
          // Add a small delay to ensure the element is truly visible
          setTimeout(() => {
            if (entry.isIntersecting) {
              trackPortfolioEvent.sectionView(sectionName);
              hasTracked.current = true;
              
              // Debug logging
              if (import.meta.env.DEV) {
                console.log(`👁️ Section viewed: ${sectionName}`);
              }
            }
          }, 200);
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Only trigger when element is 50px into viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionName, threshold, trackOnce]);

  return ref;
};

export const useAnalyticsClick = (
  eventAction: string,
  eventCategory: string,
  eventLabel?: string
) => {
  return () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
      });
    }
  };
};
