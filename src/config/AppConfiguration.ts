/**
 * Application Configuration
 * Central configuration for personal information, contact details, and site settings
 */

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  experience: string;
  currentPosition: string;
  company: string;
}

export interface SocialLinks {
  email: string;
  linkedin: {
    url: string;
    username: string;
  };
  github: {
    url: string;
    username: string;
  };
}

export interface AssetPaths {
  resume: {
    path: string;
    filename: string;
  };
  profileImage: string;
  profileSocialImage: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string;
  url: string;
  themeColor: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
  accomplishments: string[];
  technologies: string[];
}

class AppConfiguration {
  public readonly personalInfo: PersonalInfo = {
    name: "Davis Kolakowski",
    title: ".NET Software Engineer",
    email: "kolakowski.davis@gmail.com",
    location: "Williamsport, PA",
    experience: "8+ Years Experience",
    currentPosition: "Lead Software Engineer",
    company: "Mirth Systems, LLC"
  };

  public readonly socialLinks: SocialLinks = {
    email: "contact@daviskolakowski.com",
    linkedin: {
      url: "https://www.linkedin.com/in/davis-kolakowski",
      username: "linkedin.com/in/davis-kolakowski"
    },
    github: {
      url: "https://github.com/daviskolakowski",
      username: "github.com/daviskolakowski"
    }
  };

  public readonly assetPaths: AssetPaths = {
    resume: {
      path: "/DavisJacobKolakowski_Resume.docx",
      filename: "DavisJacobKolakowski_Resume.docx"
    },
    profileImage: "/ProfilePicture.jpg",
    profileSocialImage: "/assets/profile-social.jpg"
  };
  public readonly siteMetadata: SiteMetadata = {
    title: "Davis Kolakowski - .NET Software Engineer",
    description: "Experienced Software Engineer with over eight years of expertise in full-stack development, specializing in web technologies like Vue.js, React, TypeScript, and .NET. Passionate about driving user growth through innovative, user-centric solutions, with a proven track record of optimizing performance and automating processes to enhance user experiences.",
    keywords: "Davis Kolakowski, Software Engineer, .NET, React, TypeScript, Vue.js, Full Stack Developer, Mirth Systems, Pulse Platform, Portfolio, JavaScript, C#, TSQL, Azure, AWS, PostgreSQL",
    url: "https://daviskolakowski.com/",
    themeColor: "#ffffff"
  };

  public readonly experiences: Experience[] = [
    {
      title: "Lead Software Engineer",
      company: "Mirth Systems, LLC",
      duration: "Apr 2025 – Present",
      description: "Conceived and led the development of Pulse, an innovative real-time nightlife discovery platform, designing a privacy-first, location-based system with a unique three-category classification (Venue Types, Tags, Vibes) to deliver community-driven insights.",
      accomplishments: [
        "Architected and implemented the minimum viable product (MVP) using Vue.js, .NET Core, PostgreSQL, and Auth0",
        "Engineered a scalable microservices architecture with secure authentication, optimizing for real-time data synchronization and user engagement",
        "Demonstrated entrepreneurial leadership by translating market needs into a user-focused solution, driving value for consumers and venues"
      ],
      technologies: ["Vue.js", ".NET Core", "PostgreSQL", "Auth0", "Azure", "Docker", "Microservices"]
    },
    {
      title: "Software Engineer III",
      company: "Comcast",
      duration: "Dec 2017 – Apr 2025",
      description: "Developed scalable web applications and microservices using .NET, React, and TypeScript for digital advertising platforms, focusing on performance and user engagement.",
      accomplishments: [
        "Reduced a manual 18-hour content validation process to 27 minutes (97% efficiency gain) through custom C# automation",
        "Decreased report development time from days to under an hour (95%+ efficiency gain) by creating a reusable React data grid framework",
        "Led the successful migration to Okta identity management after a previous 2-year failure, ensuring seamless authentication",
        "Standardized deployment processes with Azure DevOps, cutting release cycles by 30% and improving feature delivery speed",
        "Built executive dashboards that enabled data-driven decision-making for senior leadership",
        "Mentored junior developers in modern web and cloud technologies, promoting a culture of experimentation and improvement"
      ],
      technologies: [".NET", ".NET 8", "React", "TypeScript", "Azure", "SQL Server", "Microservices", "Azure DevOps", "Okta"]
    },
    {
      title: "Front End Developer",
      company: "Contractor",
      duration: "Aug 2015 – Dec 2017",
      description: "Designed and implemented responsive, cross-browser compatible web interfaces using HTML5, CSS3, and JavaScript, boosting user engagement.",
      accomplishments: [
        "Optimized site performance through code minification, image optimization, and lazy loading, achieving a 25% reduction in load times",
        "Built custom interactive UI components and data visualizations to simplify workflows and enhance user experience",
        "Collaborated with backend developers to design and consume RESTful APIs, ensuring seamless data integration"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "RESTful APIs"]
    },
    {
      title: "Operations Agent",
      company: "Geek Squad",
      duration: "Mar 2015 – Aug 2015",
      description: "Provided technical support for hardware and software issues, achieving a 90% customer satisfaction rate through effective troubleshooting and problem resolution.",
      accomplishments: [],
      technologies: []
    }
  ];

  public getMailtoLink(): string {
    return `mailto:${this.personalInfo.email}`;
  }

  public getResumeDownloadProps() {
    return {
      href: this.assetPaths.resume.path,
      download: this.assetPaths.resume.filename
    };
  }

  public getSocialLinkProps(platform: 'linkedin' | 'github') {
    const link = this.socialLinks[platform];
    return {
      href: link.url,
      target: "_blank" as const,
      rel: "noopener noreferrer" as const
    };
  }
}

export const appConfig = new AppConfiguration();
