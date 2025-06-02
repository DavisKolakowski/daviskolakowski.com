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
    title: "Software Engineer",
    email: "contact@daviskolakowski.com",
    location: "Williamsport, PA",
    experience: "8+ Years Experience",
    currentPosition: "Software Engineer III",
    company: "Comcast"
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
    title: "Davis Kolakowski - Software Engineer",
    description: "Experienced Software Engineer with 8+ years in full-stack development, specializing in .NET, React, Vue, and TypeScript. Portfolio showcasing innovative solutions and technical expertise.",
    keywords: "Davis Kolakowski, Software Engineer, .NET, React, TypeScript, Full Stack Developer, Comcast, Portfolio",
    url: "https://daviskolakowski.dev/",
    themeColor: "#ffffff"
  };

  public readonly experiences: Experience[] = [
    {
      title: "Software Engineer III",
      company: "Comcast",
      duration: "Dec 2017 – Apr 2025",
      description: "Developed scalable web applications and microservices using .NET, React, and TypeScript for digital advertising platforms, focusing on performance and user engagement.",
      accomplishments: [
        "Reduced a manual 18-hour content validation process to 27 minutes (97% efficiency gain)",
        "Decreased report development time from days to under an hour (95%+ efficiency gain)",
        "Led successful migration to Okta identity management after previous 2-year failure",
        "Cut release cycles by 30% through Azure DevOps standardization"
      ],
      technologies: [".NET", "React", "TypeScript", "Azure", "SQL Server", "Microservices"]
    },
    {
      title: "Front End Developer",
      company: "Contractor",
      duration: "Aug 2015 – Dec 2017",
      description: "Designed and implemented responsive, cross-browser compatible web interfaces using HTML5, CSS3, and JavaScript, boosting user engagement.",
      accomplishments: [
        "Achieved 25% reduction in load times through optimization",
        "Built custom interactive UI components",
        "Collaborated with backend developers on RESTful API design"
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
