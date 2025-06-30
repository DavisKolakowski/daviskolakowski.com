/**
 * Public Configuration
 * Configuration values that need to be accessible in HTML and other non-module contexts
 * This file is manually synchronized with src/config/ files
 */

// Ensure dataLayer exists before any gtag calls
window.dataLayer = window.dataLayer || [];

window.APP_CONFIG = {
  analytics: {
    trackingId: 'G-Q1760H3DK9',
    analyticsSettings: {
      anonymize_ip: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: false,
      send_page_view: true
    }
  },
  siteMetadata: {
    title: 'Davis Kolakowski - .NET Software Engineer',
    description: 'Experienced Software Engineer with 8+ years in full-stack development, specializing in .NET, React, Vue, and TypeScript. Currently Lead Software Engineer at Mirth Systems, building innovative nightlife discovery platforms.',
    keywords: 'Davis Kolakowski, Software Engineer, .NET, React, TypeScript, Vue.js, Full Stack Developer, Mirth Systems, Pulse Platform, Portfolio',
    url: 'https://daviskolakowski.com/',
    themeColor: '#ffffff'
  },
  assets: {
    profileSocialImage: '/assets/profile-social.jpg'
  }
};
