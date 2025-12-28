import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Code, Layers, Terminal } from "lucide-react";

export default function Skills() {
  const skills = useQuery(api.portfolio.getSkills);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Technical Skills</h1>
          <p className="text-muted-foreground">
            Tools and technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills
            ? skills.map((skill) => (
                <GlassCard
                  key={skill._id}
                  hoverEffect
                  className="flex flex-col items-center text-center"
                >
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    {skill.category === "Frontend" && (
                      <Layers className="h-6 w-6 text-primary" />
                    )}
                    {skill.category === "Backend" && (
                      <Terminal className="h-6 w-6 text-primary" />
                    )}
                    {skill.category === "Design" && (
                      <Code className="h-6 w-6 text-primary" />
                    )}
                    {skill.category === "Tools" && (
                      <Code className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.category}
                  </p>
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
            : Array.from({ length: 4 }).map((_, i) => (
                <GlassCard key={i} className="h-48 animate-pulse">
                  <div className="h-full w-full bg-muted/20 rounded-lg" />
                </GlassCard>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
