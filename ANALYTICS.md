# Google Analytics Implementation

This project includes a comprehensive Google Analytics 4 (GA4) implementation with enhanced tracking, GDPR compliance, and debugging capabilities.

## 🎯 Features

### Core Analytics
- **Page View Tracking**: Automatic tracking of page views and navigation
- **Event Tracking**: Custom events for user interactions
- **Scroll Depth**: Tracks how far users scroll through content
- **Time on Site**: Measures user engagement duration
- **Error Tracking**: Captures JavaScript errors and unhandled promise rejections

### User Interaction Tracking
- **Section Views**: Tracks when users view different sections (Hero, About, Skills, etc.)
- **Project Interactions**: Tracks project views and GitHub link clicks
- **Contact Form**: Tracks form starts and submissions
- **Social Media Clicks**: Tracks clicks on social media links
- **Resume Downloads**: Tracks resume/CV downloads
- **Navigation**: Tracks menu item clicks and mobile menu usage
- **Skills**: Tracks hover interactions with skills

### Privacy & Compliance
- **GDPR Compliance**: Consent mode implementation with cookie preferences
- **Default Denied**: Analytics starts in denied state until user consent
- **IP Anonymization**: User IP addresses are anonymized
- **Granular Consent**: Users can choose specific cookie categories

### Development Tools
- **Analytics Debug Panel**: Real-time event visualization (development only)
- **Keyboard Shortcut**: Ctrl+Shift+A to toggle debug panel
- **Event Logging**: Captures and displays the last 20 analytics events

## 🚀 Implementation Details

### Analytics ID
- **Tracking ID**: `G-Q1760H3DK9`
- **Property**: Davis Kolakowski Portfolio

### Key Components

#### 1. Core Analytics (`src/lib/analytics.ts`)
```typescript
// Track custom events
trackEvent('click', 'navigation', 'Menu - projects');

// Use predefined portfolio events
trackPortfolioEvent.projectView('Linear Content Automation Platform');
trackPortfolioEvent.resumeDownload();
trackPortfolioEvent.socialClick('linkedin');
```

#### 2. Analytics Hooks (`src/hooks/use-analytics.tsx`)
```typescript
// Track section views
const sectionRef = useAnalyticsOnView("about");

// Track clicks
const handleClick = useAnalyticsClick('click', 'button', 'CTA Button');
```

#### 3. Consent Management (`src/components/ui/cookie-consent.tsx`)
- Displays cookie consent banner
- Allows granular preference selection
- Updates Google consent mode
- Stores preferences in localStorage

### Event Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `navigation` | Menu and navigation clicks | Menu items, CTAs |
| `project` | Project-related interactions | Project views, GitHub clicks |
| `contact_form` | Contact form interactions | Form start, submission |
| `social` | Social media clicks | LinkedIn, GitHub, email |
| `resume` | Resume/CV interactions | Downloads, views |
| `section` | Section visibility | Hero, About, Skills viewed |
| `skill` | Skills interactions | Skill hover events |
| `engagement` | User engagement metrics | Scroll depth, time on site |
| `error` | Error tracking | JS errors, promise rejections |

### Custom Dimensions & Metrics

#### Events Tracked
- **Page Views**: Automatic on route changes
- **Scroll Depth**: 25%, 50%, 75%, 100% milestones
- **Time on Site**: Tracked on page unload
- **Error Rate**: JavaScript and promise rejection errors
- **Conversion Events**: Contact form submissions, resume downloads

## 🔧 Configuration

### Environment Setup
The analytics automatically detects the environment:
- **Development**: Shows debug panel, logs events
- **Production**: Full tracking, no debug tools

### Consent Mode States
```javascript
// Default state (GDPR compliant)
analytics_storage: 'denied'
ad_storage: 'denied'
functionality_storage: 'granted'
personalization_storage: 'denied'
security_storage: 'granted'
```

### Custom Events Structure
```typescript
gtag('event', 'action_name', {
  event_category: 'category',
  event_label: 'label',
  value: number
});
```

## 📊 Analytics Goals

### Primary Conversion Goals
1. **Resume Downloads** - Direct measure of recruiter interest
2. **Contact Form Submissions** - Lead generation
3. **Project Link Clicks** - Portfolio engagement
4. **Social Media Clicks** - Network expansion

### Engagement Metrics
1. **Time on Site** - Content quality indicator
2. **Scroll Depth** - Content consumption
3. **Section Views** - Content effectiveness
4. **Return Visits** - Overall site appeal

## 🐛 Debugging

### Development Mode
1. Press `Ctrl+Shift+A` to open the analytics debug panel
2. View real-time event tracking
3. Verify event structure and data
4. Monitor tracking implementation

### Production Verification
1. Use Google Analytics Real-Time reports
2. Check Google Tag Assistant Chrome extension
3. Verify events in GA4 DebugView
4. Monitor conversion tracking

## 📱 Mobile Considerations
- Touch interactions are tracked as clicks
- Mobile menu usage is tracked separately
- Responsive design maintains tracking integrity
- Performance optimized for mobile devices

## 🔒 Privacy Features
- IP anonymization enabled
- No cross-site tracking
- User consent respected
- Data minimization practices
- Clear privacy controls

## 📈 Optimization Recommendations

### Performance
- Analytics script loads asynchronously
- Event batching for efficiency
- Minimal impact on Core Web Vitals
- Lazy loading for non-critical tracking

### Data Quality
- Consistent event naming convention
- Structured data hierarchy
- Regular tracking audits
- A/B testing capabilities

This implementation provides comprehensive insights while maintaining user privacy and site performance.
