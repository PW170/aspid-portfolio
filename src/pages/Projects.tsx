import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
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

        <div className="flex flex-col gap-8">
          {projects
            ? projects.map((project) => (
                <GlassCard
                  key={project._id}
                  className={cn(
                    "overflow-hidden p-0 flex flex-col md:flex-row min-h-[250px] group",
                    project.link && "cursor-pointer",
                  )}
                  hoverEffect
                  onClick={() => {
                    if (project.link) {
                      window.open(project.link, "_blank");
                    }
                  }}
                >
                  {/* Image Section - Left (or Top on mobile) */}
                  {project.imageUrl && (
                    <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/60" />
                    </div>
                  )}

                  {/* Content Section - Right */}
                  <div className="flex-1 p-6 flex flex-col justify-between backdrop-blur-sm bg-black/20">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                          {project.title}
                        </h3>
                        <span
                          className={cn(
                            "px-3 py-1 text-xs font-semibold rounded-full border shadow-sm",
                            project.status
                              ?.toLowerCase()
                              .includes("unfinished") ||
                              project.status
                                ?.toLowerCase()
                                .includes("abandonded")
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              : project.status
                                    ?.toLowerCase()
                                    .includes("completed") ||
                                  project.status
                                    ?.toLowerCase()
                                    .includes("finished")
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-primary/10 text-primary border-primary/20",
                          )}
                        >
                          {project.status || "In Progress"}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/70 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4 mr-2" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <GlassCard
                  key={i}
                  className="h-64 animate-pulse flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-2/5 bg-muted/20 h-48 md:h-auto" />
                  <div className="p-6 flex-1 space-y-4">
                    <div className="h-6 bg-muted/20 rounded w-1/3" />
                    <div className="h-4 bg-muted/20 rounded w-3/4" />
                    <div className="h-4 bg-muted/20 rounded w-1/2" />
                  </div>
                </GlassCard>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
