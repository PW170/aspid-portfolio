import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = useQuery(api.portfolio.getProjects);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground">A collection of my work</p>
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
      <Footer />
    </div>
  );
}
