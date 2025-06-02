import { useAnalyticsOnView } from "@/hooks/use-analytics";
import { appConfig } from "@/config/AppConfiguration";

export default function Experience() {
  const experienceRef = useAnalyticsOnView("experience");

  return (
    <section id="experience" ref={experienceRef} className="section-spacing bg-card">
      <div className="max-w-6xl mx-auto container-padding">        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">Professional Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="space-y-12">
          {appConfig.experiences.map((exp, index) => (
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
              )}              {exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-muted px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-smooth cursor-default"
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
