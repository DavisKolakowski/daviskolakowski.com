import { useEffect } from 'react';

export const useScrollToHash = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for fixed navigation
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      }
    };

    // Handle initial hash on page load
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Wait for content to load
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial load
    handleInitialHash();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
};
