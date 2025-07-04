import { Mail, Send, Download } from "lucide-react";
import { LinkedInIcon } from "./ui/linkedin-icon";
import { GitHubIcon } from "./ui/github-icon";
import { useAnalyticsOnView } from "@/hooks/use-analytics";
import { trackPortfolioEvent } from "@/lib/analytics";
import { appConfig } from "@/config/AppConfiguration";

export default function Contact() {
  const contactRef = useAnalyticsOnView("contact");

  const handleEmailClick = () => {
    trackPortfolioEvent.socialClick('email');
  };

  const handleLinkedInClick = () => {
    trackPortfolioEvent.socialClick('linkedin');
  };

  const handleGitHubClick = () => {
    trackPortfolioEvent.socialClick('github');
  };

  const handleResumeDownload = () => {
    trackPortfolioEvent.resumeDownload();
  };

  const handleSendMessageClick = () => {
    trackPortfolioEvent.contactFormStart();
  };

  return (
    <section id="contact" ref={contactRef} className="section-spacing bg-card">
      <div className="max-w-4xl mx-auto container-padding text-center">
        <h2 className="text-4xl font-bold mb-4 text-secondary">Let's Work Together</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          I'm always interested in discussing new opportunities, challenging projects, 
          and innovative solutions. Feel free to reach out!
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-primary w-6 h-6" />
            </div>            <h3 className="text-lg font-semibold mb-2 text-secondary">Email</h3>
            <a 
              href={appConfig.getMailtoLink()}
              onClick={handleEmailClick}
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              {appConfig.personalInfo.email}
            </a>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkedInIcon className="text-primary w-6 h-6" />
            </div>            <h3 className="text-lg font-semibold mb-2 text-secondary">LinkedIn</h3>
            <a 
              {...appConfig.getSocialLinkProps('linkedin')}
              onClick={handleLinkedInClick}
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              {appConfig.socialLinks.linkedin.username}
            </a>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <GitHubIcon className="text-primary w-6 h-6" />
            </div>            <h3 className="text-lg font-semibold mb-2 text-secondary">GitHub</h3>
            <a 
              {...appConfig.getSocialLinkProps('github')}
              onClick={handleGitHubClick}
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              {appConfig.socialLinks.github.username}
            </a>
          </div>
        </div>
          <div className="flex justify-center gap-4">          <a 
            href={appConfig.getMailtoLink()}
            onClick={handleSendMessageClick}
            className="btn-primary inline-flex items-center justify-center transform hover:scale-105 min-w-[160px]"
          >
            <Send className="mr-2 w-4 h-4" />
            Send Message
          </a>          <a 
            {...appConfig.getResumeDownloadProps()}
            onClick={handleResumeDownload}
            className="btn-secondary-dark inline-flex items-center justify-center transform hover:scale-105 min-w-[160px]"
          >
            <Download className="mr-2 w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
