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
    consentSettings: {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500
    },
    analyticsSettings: {
      anonymize_ip: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: false
    }
  },
  siteMetadata: {
    title: 'Davis Kolakowski - Software Engineer',
    description: 'Experienced Software Engineer with 8+ years in full-stack development, specializing in .NET, React, Vue, and TypeScript. Portfolio showcasing innovative solutions and technical expertise.',
    keywords: 'Davis Kolakowski, Software Engineer, .NET, React, TypeScript, Full Stack Developer, Comcast, Portfolio',
    url: 'https://daviskolakowski.dev/',
    themeColor: '#ffffff'
  },
  assets: {
    profileSocialImage: '/assets/profile-social.jpg'
  }
};
