import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Clock3, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const paymentPlans = [
  {
    title: "Basic",
    price: "$25",
    timeline: "3-day delivery",
    description:
      "Essential landing page or personal site to get you started online.",
    features: ["Single page layout", "Mobile responsive", "Basic SEO setup"],
  },
  {
    title: "Decent",
    price: "$50",
    timeline: "1-week delivery",
    description:
      "Multi-page website with custom styling and interactive elements.",
    features: [
      "Up to 5 pages",
      "Contact form integration",
      "Social media connection",
    ],
  },
  {
    title: "Ecommerce",
    price: "$150",
    timeline: "2-week delivery",
    description:
      "Full online store setup with product management and payment processing.",
    features: [
      "Product catalog setup",
      "Shopping cart & checkout",
      "Admin dashboard training",
    ],
  },
];

const paymentHighlights = [
  {
    title: "Secure Milestone Releases",
    description:
      "Every payment is tied to accepted deliverables, so you only pay when value is delivered.",
    icon: Shield,
  },
  {
    title: "Transparent Timeline",
    description:
      "Upfront schedules keep you in the loop on what's shipping and when.",
    icon: Clock3,
  },
  {
    title: "Value-First Approach",
    description:
      "Each sprint focuses on revenue-driving features to keep momentum high.",
    icon: Sparkles,
  },
];

export default function Payments() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-primary/70">
            Payments & Engagement
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Transparent pricing for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              high-impact delivery
            </span>
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Choose the collaboration style that meets your timeline and risk
            profile. Every engagement is milestone-based, so you can scale
            confidently while maintaining cash flow.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              size="lg"
              className="rounded-full"
              onClick={() => navigate("/contact")}
            >
              Book a discovery call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full glass hover:bg-white/10"
              onClick={() => navigate("/projects")}
            >
              Review recent work
            </Button>
          </div>
        </motion.div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentPlans.map((plan) => (
            <GlassCard
              key={plan.title}
              hoverEffect
              className="flex flex-col gap-6"
            >
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary/80">
                  Plan
                </p>
                <h3 className="text-2xl font-semibold">{plan.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>
              <div>
                <span className="text-3xl font-bold">{plan.price}</span>
                <p className="text-sm text-muted-foreground">{plan.timeline}</p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-auto" onClick={() => navigate("/contact")}>
                Start this plan
              </Button>
            </GlassCard>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentHighlights.map(({ title, description, icon: Icon }) => (
            <GlassCard key={title} className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </GlassCard>
          ))}
        </section>

        <GlassCard className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-secondary/80">
              Engagement flow
            </p>
            <h3 className="text-2xl font-semibold mt-2">
              Simple 3-step billing
            </h3>
            <p className="text-muted-foreground">
              30% deposit to lock in the sprint → milestone releases for each
              phase → final polish & handoff on completion.
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/contact")}
          >
            Reserve a sprint
          </Button>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
}
