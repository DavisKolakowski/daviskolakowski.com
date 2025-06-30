import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./ui/github-icon";
import { useAnalyticsOnView } from "@/hooks/use-analytics";
import { trackPortfolioEvent } from "@/lib/analytics";

interface Project {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  highlights: string[];
}

export default function Projects() {
  const projectsRef = useAnalyticsOnView("projects");

  const projects: Project[] = [
    {
      title: "Pulse Nightlife Discovery Platform",
      description: "Conceived and developed an innovative real-time nightlife discovery platform with privacy-first, location-based design featuring a unique three-category classification system (Venue Types, Tags, Vibes) for community-driven insights.",
      githubUrl: "https://github.com/MirthSystems/pulse-by-mirth-systems",
      liveUrl: "https://pulse.mirthsystems.com/",
      technologies: ["Vue.js", ".NET Core", "PostgreSQL", "Auth0", "Azure", "Docker"],
      highlights: [
        "Real-time messaging with 15-minute ephemeral content",
        "PostgreSQL-based recommendation engine",
        "Scalable microservices architecture",
        "Privacy-first location-based discovery"
      ]
    },
    {
      title: "Linear Content Automation Platform",
      description: "Architected and developed a C#/.NET application that automated critical linear advertising content validation, reducing nightly quality control process from 18 person-hours to 27 minutes (97% reduction).",
      githubUrl: "https://github.com/DavisKolakowski/Linear",
      technologies: ["C#", ".NET", "SQL Server", "HTML/CSS"],
      highlights: [
        "97% efficiency improvement",
        "Fault-tolerant validation algorithms",
        "Zero on-air commercial errors"
      ]
    },
    {
      title: "MSSQL Data Grid Reporting Service",
      description: "Designed and implemented a comprehensive reporting framework allowing developers to expose database views/stored procedures as fully-featured React data grids.",
      githubUrl: "https://github.com/DavisKolakowski/ReportingServices",
      technologies: ["React", "TypeScript", "C#", "TSQL"],
      highlights: [
        "95%+ reduction in report creation time",
        "Extensible architecture for developers",
        "Legacy platform compatibility"
      ]
    },
    {
      title: "XLReportBook",
      description: "Developed a .NET Standard library to streamline Excel report creation, ensuring compatibility with .NET Framework 4.6.1 using DocumentFormat.OpenXml.",
      githubUrl: "https://github.com/DavisKolakowski/XLReportBook",
      technologies: [".NET Standard", "C#", "OpenXml", "Excel"],
      highlights: [
        ".NET Framework 4.6.1 compatibility",
        "Custom attribute framework",
        "Comprehensive testing coverage"
      ]
    },
    {
      title: "AQC Manifestly ETL Toolkit",
      description: "Engineered a C# ETL solution to integrate Manifestly's RESTful API data with internal SQL databases for KPI-based management through Tableau.",
      githubUrl: "https://github.com/DavisKolakowski/AQC.Manifestly-ETL-Toolkit",
      technologies: ["C#", "ETL", "REST API", "Tableau"],
      highlights: [
        "API to SQL integration",
        "Tableau dashboard support",
        "Quality assurance metrics"
      ]
    }
  ];

  const handleProjectLinkClick = (projectTitle: string, linkType: 'demo' | 'github' = 'github') => {
    trackPortfolioEvent.projectLinkClick(projectTitle, linkType);
  };

  const handleProjectView = (projectTitle: string) => {
    trackPortfolioEvent.projectView(projectTitle);
  };

  return (
    <section id="projects" ref={projectsRef} className="section-spacing bg-background">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl card-shadow hover:card-shadow-hover transition-smooth group flex flex-col h-full"
              onMouseEnter={() => handleProjectView(project.title)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-secondary group-hover:text-primary transition-smooth">
                  {project.title}
                </h3>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-smooth"
                      aria-label={`View ${project.title} live demo`}
                      title={`View ${project.title} live demo`}
                      onClick={() => handleProjectLinkClick(project.title, 'demo')}
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  )}
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-smooth"
                    aria-label={`View ${project.title} on GitHub`}
                    title={`View ${project.title} on GitHub`}
                    onClick={() => handleProjectLinkClick(project.title, 'github')}
                  >
                    <GitHubIcon className="w-6 h-6" />
                  </a>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="space-y-4 mb-6">
                {project.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary font-semibold hover:text-accent transition-smooth cursor-pointer"
                    onClick={() => handleProjectLinkClick(project.title, 'github')}
                  >
                    <GitHubIcon className="mr-2 w-4 h-4" />
                    <span>View Code</span>
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-accent font-semibold hover:text-primary transition-smooth cursor-pointer"
                      onClick={() => handleProjectLinkClick(project.title, 'demo')}
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
