import { useAnalyticsOnView } from "@/hooks/use-analytics";

export default function Experience() {
  const experienceRef = useAnalyticsOnView("experience");

  const experiences = [
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

  return (
    <section id="experience" ref={experienceRef} className="section-spacing bg-card">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">Professional Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-muted p-8 rounded-xl card-shadow hover:card-shadow-hover transition-smooth"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-secondary">{exp.title}</h3>
                  <p className="text-lg text-primary font-semibold">{exp.company}</p>
                </div>
                <div className="text-muted-foreground font-medium mt-2 md:mt-0">{exp.duration}</div>
              </div>
              
              <p className="text-lg mb-6 leading-relaxed text-muted-foreground">
                {exp.description}
              </p>

              {exp.accomplishments.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-4 text-secondary">Key Accomplishments</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {exp.accomplishments.map((accomplishment, accIndex) => (
                      <div key={accIndex} className="bg-card p-4 rounded-lg border-l-4 border-accent">
                        <p className="text-sm text-muted-foreground">{accomplishment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
