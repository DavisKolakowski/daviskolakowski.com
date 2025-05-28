import { Briefcase, GraduationCap, MapPin, Clock } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section-spacing bg-card">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-secondary">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="base-spacing">
            <p className="text-lg leading-relaxed text-muted-foreground">
              With over eight years of expertise in full-stack development, I specialize in creating 
              scalable web applications using modern technologies like React, TypeScript, and .NET. 
              I'm passionate about optimizing performance and automating processes to enhance user experiences.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              At Comcast, I've led critical projects that have resulted in significant efficiency gains, 
              including reducing an 18-hour manual process to just 27 minutes and cutting report development 
              time by 95%. I thrive in collaborative environments and enjoy mentoring junior developers.
            </p>
          </div>
          
          <div className="bg-muted p-8 rounded-xl card-shadow">
            <h3 className="text-2xl font-semibold mb-6 text-secondary">Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary w-5 h-5" />
                <span>Williamsport, PA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-primary w-5 h-5" />
                <span>8+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-primary w-5 h-5" />
                <span>Software Engineer III at Comcast</span>
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
