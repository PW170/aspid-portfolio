import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";

export default function Experience() {
  const experiences = useQuery(api.portfolio.getExperiences);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Experience</h1>
          <p className="text-muted-foreground">My professional journey</p>
        </motion.div>

        <div className="space-y-8">
          {experiences ? (
            experiences.map((exp) => (
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
      <Footer />
    </div>
  );
}
