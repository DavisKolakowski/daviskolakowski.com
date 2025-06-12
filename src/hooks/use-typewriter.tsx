import { useEffect, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';

interface UseTypewriterOptions {
  delay?: number;
  deleteSpeed?: number;
  pauseFor?: number;
}

export const useTypewriter = (options: UseTypewriterOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Check if we're navigating directly to hero section via hash
    const hash = window.location.hash.substring(1);
    if (hash === 'hero') {
      setTimeout(() => {
        setIsVisible(true);
        setShouldAnimate(true);
      }, 200); // Small delay to ensure smooth scroll completes
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldAnimate(true);
        } else {
          // Reset when leaving the section so it can animate again
          setIsVisible(false);
          setShouldAnimate(false);
        }
      },
      { 
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '-50px 0px' // Add some margin to prevent too frequent triggering
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also listen for hash changes in case user navigates to hero section
    const handleHashChange = () => {
      const currentHash = window.location.hash.substring(1);
      if (currentHash === 'hero') {
        setTimeout(() => {
          setIsVisible(true);
          setShouldAnimate(true);
        }, 200);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Remove hasRun dependency
  // We'll return the Typewriter component to be rendered
  const TypewriterComponent = () => {
    const {
      delay = 75,
      deleteSpeed = 30,
      pauseFor = 2000
    } = options;

    if (!isVisible || !shouldAnimate) {
      return <span className="hero-text-white">Hi, I'm </span>;
    }

    return (
      <Typewriter
        key={Date.now()} // Force re-render with new key when shouldAnimate changes
        onInit={(typewriter) => {
          typewriter
            .typeString('<span class="hero-text-white">Hi, I\'m </span><span class="hero-text-gradient-enhanced">Davis</span>')
            .pauseFor(pauseFor)
            .start();
        }}
        options={{
          loop: false, // Only run once per trigger
          delay,
          deleteSpeed,
          cursor: '', // Disable default cursor completely
          autoStart: false
        }}
      />
    );
  };

  return {
    containerRef,
    TypewriterComponent,
    isVisible,
    shouldAnimate
  };
};
