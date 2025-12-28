import { GlassCard } from "@/components/GlassCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";

export default function Reviews() {
  const reviews = useQuery(api.portfolio.getExperiences);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Reviews</h1>
          <p className="text-muted-foreground">
            Feedback from collaborators and partners
          </p>
        </motion.div>

        <div className="space-y-8">
          {reviews
            ? reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl p-6 bg-white/5 border border-white/10 space-y-3 backdrop-blur"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-secondary/80">
                          Project
                        </p>
                        <h3 className="text-xl font-bold">{review.title}</h3>
                      </div>
                      <span className="text-sm text-muted-foreground bg-secondary/10 px-3 py-1 rounded-full">
                        {review.startDate} -{" "}
                        {review.current
                          ? "Present"
                          : (review.endDate ?? "Completed")}
                      </span>
                    </div>
                    <p className="text-lg text-primary">{review.company}</p>
                    <p className="text-muted-foreground italic">
                      "{review.description}"
                    </p>
                  </div>
                </div>
              ))
            : Array.from({ length: 2 }).map((_, i) => (
                <GlassCard key={i} className="space-y-4 animate-pulse">
                  <div className="h-4 bg-muted/20 rounded w-1/4" />
                  <div className="h-6 bg-muted/20 rounded w-2/3" />
                  <div className="h-4 bg-muted/20 rounded w-full" />
                </GlassCard>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
