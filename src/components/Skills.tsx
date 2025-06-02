import { Code, Layers, Database, Cloud } from "lucide-react";
import { useAnalyticsOnView } from "@/hooks/use-analytics";
import { trackPortfolioEvent } from "@/lib/analytics";

export default function Skills() {
  const skillsRef = useAnalyticsOnView("skills");

  const skillCategories = [
    {
      icon: Code,
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "C#", "TSQL", "HTML", "CSS"]
    },
    {
      icon: Layers,
      title: "Frameworks",
      skills: ["React", "ASP.NET Core", ".NET 8", ".NET Framework", "Vue.js", "Blazor"]
    },
    {
      icon: Database,
      title: "Database & Tools",
      skills: ["SQL Server", "PostgreSQL", "Azure DevOps", "Visual Studio", "Azure Data Factory"]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      skills: ["Azure", "AWS", "CI/CD Pipelines", "Microservices", "RESTful APIs"]
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
