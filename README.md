# Davis Kolakowski Portfolio

A modern, responsive portfolio website showcasing professional experience, technical skills, and featured projects. Built with React, TypeScript, and Tailwind CSS.

🌐 **Live Site**: [daviskolakowski.com](https://daviskolakowski.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Design System](#design-system)
- [Components](#components)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Contact](#contact)

## 🎯 Overview

This portfolio website serves as a comprehensive showcase of my professional journey as a Software Engineer with 8+ years of experience in full-stack development. The site features a clean, modern design with smooth animations and responsive layouts, highlighting my expertise in .NET, React, TypeScript, and other modern web technologies.

### Key Highlights

- **Professional Experience**: Software Engineer III at Comcast with significant efficiency improvements (97% reduction in manual processes)
- **Technical Expertise**: Full-stack development specializing in .NET, React, TypeScript, and cloud technologies
- **Featured Projects**: Innovative solutions including automation platforms, reporting services, and ETL toolkits
- **Contact Integration**: Direct links to resume, email, LinkedIn, and GitHub

## ✨ Features

### 🎨 User Experience
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Animations**: CSS animations with `framer-motion` integration
- **Dark/Light Mode**: Theme support with `next-themes`
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Mobile-First**: Optimized for mobile devices with progressive enhancement

### 🧩 Interactive Components
- **Navigation**: Fixed header with smooth scroll to sections
- **Hero Section**: Animated profile picture with gradient background
- **Skills Grid**: Categorized technical skills with icons
- **Experience Timeline**: Professional history with accomplishments
- **Project Showcase**: Featured projects with GitHub integration
- **Contact Section**: Multiple contact methods with social links

### 🚀 Performance
- **Vite Build System**: Fast development and optimized production builds
- **Asset Optimization**: Optimized images and fonts
- **Code Splitting**: Efficient bundle loading
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards

## 🛠 Tech Stack

### Frontend Framework
- **React 18.3.1**: Component-based UI library
- **TypeScript 5.6.3**: Type-safe JavaScript
- **Vite 5.4.14**: Next-generation frontend tooling

### Styling & UI
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Shadcn/ui**: Pre-built component library
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Animation library

### Development Tools
- **ESLint & Prettier**: Code linting and formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Build & Deployment
- **Vite**: Build tool and dev server
- **GitHub Actions**: CI/CD pipeline (if applicable)
- **Static Hosting**: Optimized for CDN deployment

## 📁 Project Structure

```
daviskolakowski.com/
├── public/
│   └── assets/              # Static assets
├── src/
│   ├── assets/             # Images, documents, fonts
│   │   ├── ProfilePicture.jpg
│   │   └── DavisJacobKolakowski_Resume.docx
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components (Shadcn/ui)
│   │   ├── About.tsx      # About section
│   │   ├── Contact.tsx    # Contact section with social links
│   │   ├── Experience.tsx # Professional experience
│   │   ├── Footer.tsx     # Site footer
│   │   ├── Hero.tsx       # Landing hero section
│   │   ├── Navigation.tsx # Fixed navigation header
│   │   ├── Projects.tsx   # Featured projects showcase
│   │   └── Skills.tsx     # Technical skills grid
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── home.tsx       # Main landing page
│   │   └── not-found.tsx  # 404 page
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles and CSS variables
├── components.json         # Shadcn/ui configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or yarn/pnpm equivalent)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DavisKolakowski/daviskolakowski.com.git
   cd daviskolakowski.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run check
```

### Development Workflow

1. **Component Development**: Create new components in `src/components/`
2. **Styling**: Use Tailwind CSS classes with custom CSS variables
3. **Type Safety**: Leverage TypeScript for type checking
4. **Hot Reload**: Automatic browser refresh during development

### Adding New Components

1. Create component file in appropriate directory
2. Export component as default
3. Add to parent component or page
4. Update types if necessary

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow component-scoped styling
- Utilize CSS custom properties for theme consistency
- Maintain responsive design patterns

## 🏗 Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` directory with:
- Minified JavaScript and CSS
- Optimized assets
- Tree-shaken dependencies
- Generated source maps

### Deployment Options

#### Static Hosting (Recommended)
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop `dist/` folder or connect repository
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3 + CloudFront**: For enterprise-level hosting

#### Server Deployment
- **Nginx**: Serve static files with custom configuration
- **Apache**: Configure virtual host for static content

### Environment Variables

The project doesn't require environment variables for basic functionality, but you can add them for:
- Analytics tracking IDs
- Contact form endpoints
- CDN configurations

## 🎨 Design System

### Color Palette

The design uses a modern color system with CSS custom properties:

```css
/* Light Mode */
--primary: 210 100% 54%      /* #0070F3 - Brand blue */
--secondary: 0 0% 0%         /* #000000 - Primary text */
--accent: 328 100% 50%       /* #FF0080 - Accent pink */
--background: 0 0% 98%       /* #FAFAFA - Page background */
--card: 0 0% 100%            /* #FFFFFF - Card background */

/* Dark Mode */
--primary: 210 100% 60%      /* Adjusted for dark theme */
--secondary: 0 0% 100%       /* White text on dark */
--background: 220 13% 9%     /* Dark background */
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive Scale**: Fluid typography with clamp()

### Spacing & Layout

- **Container**: Max-width 6xl (1152px) with responsive padding
- **Section Spacing**: 96px (24 * 0.25rem) vertical padding
- **Component Spacing**: Consistent 24px gaps and margins

### Component Variants

- **Buttons**: Primary, secondary, and ghost variants
- **Cards**: Consistent shadow and hover effects
- **Grid Layouts**: Responsive grid systems for different content types

## 🧩 Components

### Core Layout Components

#### `<Navigation />`
Fixed header navigation with smooth scrolling to sections.
- Mobile-responsive hamburger menu
- Active section highlighting
- Brand logo with gradient text

#### `<Hero />`
Landing section with animated profile picture and call-to-action buttons.
- Animated floating background
- Professional headshot
- Contact information display

#### `<About />`
Professional summary with key information cards.
- Years of experience highlight
- Current position and location
- Technical focus areas

#### `<Skills />`
Categorized technical skills with icons.
- Four main categories: Languages, Frameworks, Database & Tools, Cloud & DevOps
- Skill tags with hover effects
- Icon representations for each category

#### `<Experience />`
Professional work history with accomplishments.
- Timeline-style layout
- Key accomplishments highlighting
- Technology tags for each role

#### `<Projects />`
Featured project showcase with GitHub integration.
- Project cards with hover effects
- Technology stack indicators
- Direct GitHub repository links
- Project highlights and descriptions

#### `<Contact />`
Multiple contact methods with social media integration.
- Email, LinkedIn, and GitHub links
- Resume download functionality
- Call-to-action buttons

### UI Components (Shadcn/ui)

The project includes a comprehensive set of pre-built UI components:
- Buttons, Cards, Dialogs
- Form elements (Input, Select, Checkbox)
- Navigation components (Dropdown, Tabs)
- Feedback components (Toast, Alert)
- Layout components (Separator, Scroll Area)

## ⚡ Performance

### Optimization Strategies

1. **Asset Optimization**
   - Image compression and WebP format support
   - Font subset loading for Inter typeface
   - SVG icon optimization with Lucide React

2. **Code Splitting**
   - Dynamic imports for route-based splitting
   - Component-level splitting for large components
   - Tree shaking for unused dependencies

3. **Caching Strategy**
   - Long-term caching for static assets
   - Service worker implementation (optional)
   - CDN integration for global delivery

4. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

### Performance Metrics

Target performance metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🌐 Browser Support

### Supported Browsers

- **Chrome**: Version 88+
- **Firefox**: Version 85+
- **Safari**: Version 14+
- **Edge**: Version 88+

### Progressive Enhancement

- CSS Grid with Flexbox fallbacks
- Modern JavaScript with polyfills for older browsers
- Responsive images with fallback formats

### Accessibility

- **WCAG 2.1 AA Compliance**
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader optimization

## 📞 Contact

### Professional Contact

- **Email**: [contact@daviskolakowski.com](mailto:contact@daviskolakowski.com)
- **LinkedIn**: [linkedin.com/in/davis-kolakowski](https://www.linkedin.com/in/davis-kolakowski)
- **GitHub**: [github.com/daviskolakowski](https://github.com/daviskolakowski)
- **Location**: Williamsport, PA

### Technical Support

For technical questions about this portfolio website:
- Open an issue on the GitHub repository
- Fork the repository for contributions
- Review the codebase for implementation details

---

**Built with ❤️ and React.js by Davis Kolakowski**

*This portfolio represents my commitment to clean code, modern web technologies, and exceptional user experiences. Feel free to explore the codebase and reach out for collaboration opportunities.*
