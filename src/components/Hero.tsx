import { ArrowRight, MapPin, Mail } from "lucide-react";
import profilePicture from "@assets/ProfilePicture.jpg";

export default function Hero() {
  const scrollToProjects = () => {
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
    <section id="hero" className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center pt-20">
      <div className="max-w-6xl mx-auto container-padding grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Hi, I'm <span className="text-gradient">Davis</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium">
              Software Engineer
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experienced Software Engineer with over eight years of expertise in full-stack development, 
              specializing in web technologies like React, Vue, TypeScript, and .NET. Passionate about 
              driving user growth through innovative, user-centric solutions.
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
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Williamsport, PA</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contact@daviskolakowski.com</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 bg-gradient-to-br from-primary to-accent rounded-full absolute -inset-2 animate-float opacity-20"></div>
            <img 
              src={profilePicture}
              alt="Davis Kolakowski - Professional Profile" 
              className="w-80 h-80 rounded-full object-cover border-4 border-card card-shadow-hover relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
