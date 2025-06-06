import { ArrowRight, MapPin, Mail } from "lucide-react";
import { useAnalyticsOnView } from "@/hooks/use-analytics";
import { trackEvent } from "@/lib/analytics";
import { appConfig } from "@/config/AppConfiguration";

export default function Hero() {
  const heroRef = useAnalyticsOnView("hero");

  const scrollToProjects = () => {
    trackEvent('click', 'navigation', 'Hero CTA - View My Work');
    const element = document.getElementById("projects");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToContact = () => {
    trackEvent('click', 'navigation', 'Hero CTA - Get In Touch');
    const element = document.getElementById("contact");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center pt-20"
    >
      <div className="max-w-6xl mx-auto container-padding grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Hi, I'm <span className="text-gradient">{appConfig.personalInfo.name.split(' ')[0]}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium">
              {appConfig.personalInfo.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {appConfig.siteMetadata.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToProjects}
              className="btn-primary inline-flex items-center justify-center"
            >
              View My Work
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button
              onClick={scrollToContact}
              className="btn-secondary inline-flex items-center justify-center"
            >
              Get In Touch
            </button>
          </div>          <div className="flex flex-col sm:flex-row gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{appConfig.personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{appConfig.personalInfo.email}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 bg-gradient-to-br from-primary to-accent rounded-full absolute -inset-2 animate-float opacity-20"></div>            <img 
              src={appConfig.assetPaths.profileImage}
              alt={`${appConfig.personalInfo.name} - Professional Profile`} 
              className="w-80 h-80 rounded-full object-cover border-4 border-card card-shadow-hover relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
