import { Code, Layers, Database, Cloud } from "lucide-react";

export default function Skills() {
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

  return (
    <section id="skills" className="section-spacing bg-background">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl card-shadow hover:card-shadow-hover transition-smooth"
              >
                <div className="text-2xl mb-4 text-primary">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-secondary">{category.title}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="inline-block bg-muted text-foreground px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
