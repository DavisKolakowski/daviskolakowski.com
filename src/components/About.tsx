import { Briefcase, GraduationCap, MapPin, Clock } from "lucide-react";
import { useAnalyticsOnView } from "@/hooks/use-analytics";
import { appConfig } from "@/config/AppConfiguration";

export default function About() {
  const aboutRef = useAnalyticsOnView("about");

  return (
    <section id="about" ref={aboutRef} className="section-spacing bg-card">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">          <div className="base-spacing">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {appConfig.siteMetadata.description}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Currently serving as {appConfig.personalInfo.currentPosition} at {appConfig.personalInfo.company}, where I'm leading the development of Pulse, an innovative real-time nightlife discovery platform. Skilled in collaborating with cross-functional teams to deliver scalable features that acquire, activate, and retain users. I've previously achieved significant efficiency gains including reducing an 18-hour manual process to just 27 minutes and cutting report development time by 95%.
            </p>
          </div>
          
          <div className="bg-muted p-8 rounded-xl card-shadow">
            <h3 className="text-2xl font-semibold mb-6 text-secondary">Quick Facts</h3>            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary w-5 h-5" />
                <span>{appConfig.personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-primary w-5 h-5" />
                <span>{appConfig.personalInfo.experience}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-primary w-5 h-5" />
                <span>{appConfig.personalInfo.currentPosition} at {appConfig.personalInfo.company}</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="text-primary w-5 h-5" />
                <span>Full-Stack Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
