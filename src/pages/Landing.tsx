import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowRight, Code, ExternalLink, Github, Layers, Send, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Landing() {
  const projects = useQuery(api.portfolio.getFeaturedProjects);
  const skills = useQuery(api.portfolio.getSkills);
  const experiences = useQuery(api.portfolio.getExperiences);
  const sendMessage = useMutation(api.portfolio.sendMessage);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendMessage(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                Building Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Experiences
                </span>
              </h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                I'm a Full Stack Developer passionate about creating beautiful, functional, and user-centered digital products.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="rounded-full" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Work <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full glass hover:bg-white/10" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contact Me
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
            <p className="text-muted-foreground">Tools and technologies I work with</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills ? (
              skills.map((skill, index) => (
                <GlassCard key={skill._id} hoverEffect className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    {skill.category === "Frontend" && <Layers className="h-6 w-6 text-primary" />}
                    {skill.category === "Backend" && <Terminal className="h-6 w-6 text-primary" />}
                    {skill.category === "Design" && <Code className="h-6 w-6 text-primary" />}
                    {skill.category === "Tools" && <Code className="h-6 w-6 text-primary" />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                  {skill.level && (
                    <div className="w-full bg-secondary/20 rounded-full h-2 mt-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  )}
                </GlassCard>
              ))
            ) : (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <GlassCard key={i} className="h-48 animate-pulse">
                  <div className="h-full w-full bg-muted/20 rounded-lg" />
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">Some of my recent work</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects ? (
              projects.map((project) => (
                <GlassCard key={project._id} hoverEffect className="overflow-hidden p-0 flex flex-col h-full">
                  {project.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-primary transition-colors">
                          <ExternalLink className="h-4 w-4 mr-1" /> Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-primary transition-colors">
                          <Github className="h-4 w-4 mr-1" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              Array.from({ length: 3 }).map((_, i) => (
                <GlassCard key={i} className="h-96 animate-pulse">
                  <div className="h-48 bg-muted/20 rounded-t-lg mb-4" />
                  <div className="h-4 bg-muted/20 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted/20 rounded w-1/2" />
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <p className="text-muted-foreground">My professional journey</p>
          </motion.div>

          <div className="space-y-8">
            {experiences ? (
              experiences.map((exp, index) => (
                <GlassCard key={exp._id} className="relative pl-8 border-l-2 border-primary/30 rounded-l-none">
                  <div className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <span className="text-sm text-muted-foreground bg-secondary/10 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-lg text-primary mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </GlassCard>
              ))
            ) : (
              Array.from({ length: 2 }).map((_, i) => (
                <GlassCard key={i} className="h-32 animate-pulse">
                  <div className="h-4 bg-muted/20 rounded w-1/3 mb-4" />
                  <div className="h-4 bg-muted/20 rounded w-full" />
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground">Have a project in mind? Let's talk.</p>
          </motion.div>

          <GlassCard className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 focus:border-primary/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 focus:border-primary/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[150px]"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (
                  <>Send Message <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}