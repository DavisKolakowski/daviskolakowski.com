import { Code, Layers, Database, Cloud, Wrench, Network } from "lucide-react";
import { useAnalyticsOnView } from "@/hooks/use-analytics";
import { trackPortfolioEvent } from "@/lib/analytics";

export default function Skills() {
  const skillsRef = useAnalyticsOnView("skills");

  const skillCategories = [
    {
      icon: Code,
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "C#", "TSQL", "HTML", "CSS", "PowerShell", "Bicep", "Power Query"]
    },
    {
      icon: Layers,
      title: "Frameworks & Libraries",
      skills: ["Vue.js", "React", "ASP.NET Core", ".NET", ".NET Framework 4.6+", "Blazor", ".NET Aspire"]
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["SQL Server", "PostgreSQL", "PostGIS", "Stored Procedures", "Views", "ETL Pipelines", "Spatial Data"]
    },
    {
      icon: Network,
      title: "Architecture",
      skills: ["RESTful APIs", "Microservices", "Authentication Systems", "JWT", "OAuth/OpenID Connect", "RabbitMQ", "Job Scheduling"]
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      skills: ["Azure DevOps", "CI/CD Pipelines", "Automated Testing", "Azure", "AWS", "Docker", "Prometheus", "Azure Maps"]
    },
    {
      icon: Wrench,
      title: "Tools & Analytics",
      skills: ["Visual Studio", "VS Code", "Azure Data Factory", "Tableau Integration", "Excel", "Power BI", "Elastic Stack"]
    }
  ];

  const handleSkillHover = (skill: string) => {
    trackPortfolioEvent.skillHover(skill);
  };

  return (
    <section id="skills" ref={skillsRef} className="section-spacing bg-background">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl card-shadow hover:card-shadow-hover transition-smooth"
            >
              <div className="text-2xl mb-4 text-primary">
                <category.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">{category.title}</h3>              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="bg-muted px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-smooth cursor-default"
                    onMouseEnter={() => handleSkillHover(skill)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
