/**
 * Analytics Testing Script
 * Run this in the browser console to test analytics implementation
 */

// Test basic event tracking
console.log('🧪 Testing Analytics Implementation...');

// Test custom events
if (window.gtag) {
  console.log('✅ Google Analytics loaded');
  
  // Test custom event
  window.gtag('event', 'test_event', {
    event_category: 'testing',
    event_label: 'Console Test',
    value: 1
  });
  console.log('✅ Test event sent');
  
  // Test conversion event
  window.gtag('event', 'test_conversion', {
    event_category: 'testing',
    event_label: 'Conversion Test'
  });
  console.log('✅ Test conversion sent');
  
} else {
  console.log('❌ Google Analytics not loaded');
}

// Test analytics utility functions
if (window.trackPortfolioEvent) {
  window.trackPortfolioEvent.projectView('Test Project');
  console.log('✅ Portfolio event tracking works');
} else {
  console.log('❌ Portfolio event tracking not available');
}

// Test consent mode
if (window.gtag) {
  window.gtag('consent', 'query', {
    callback: (consentState) => {
      console.log('📊 Current consent state:', consentState);
    }
  });
}

// Performance test
const startTime = performance.now();
for (let i = 0; i < 10; i++) {
  if (window.gtag) {
    window.gtag('event', `performance_test_${i}`, {
      event_category: 'testing',
      event_label: 'Performance Test'
    });
  }
}
const endTime = performance.now();
console.log(`⚡ Performance: 10 events sent in ${(endTime - startTime).toFixed(2)}ms`);

console.log('🎉 Analytics testing complete!');

// Instructions
console.log(`
📋 Verification Steps:
1. Check the Analytics Debug panel (Ctrl+Shift+A)
2. Open Google Analytics Real-Time reports
3. Use Google Tag Assistant Chrome extension
4. Check browser Network tab for gtag requests

🔍 What to look for:
- Events appearing in debug panel
- Real-time data in GA dashboard
- No console errors
- Network requests to google-analytics.com
`);
