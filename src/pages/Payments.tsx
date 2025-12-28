import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Clock3, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideIcon } from "lucide-react";

interface PaymentPlan {
  title: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
}

interface PaymentHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

const paymentPlans: PaymentPlan[] = [
  {
    title: "Send money <111$",
    price: "< $111",
    timeline: "Instant transfer",
    description:
      "Send me money from projects or personally below 111 USD or below 94 euros.",
    features: [
      "Secure payment processing",
      "Direct personal transfer",
      "Project milestone payment",
    ],
  },
  {
    title: "Large payment",
    price: "> $111",
    timeline: "Secure transfer",
    description:
      "Payments above 111USD or 94 EURO are large payments, use this gateway for large payments.",
    features: [
      "Escrow protection",
      "International compliance",
      "Dedicated support",
    ],
  },
];


const paymentHighlights: PaymentHighlight[] = [
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
          {paymentPlans.map((plan: PaymentPlan) => (
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
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="mt-auto">Start this plan</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] sm:h-[85vh]">
                  <SheetHeader>
                    <SheetTitle>Payment Details</SheetTitle>
                    <SheetDescription>
                      Choose your preferred payment method.
                    </SheetDescription>
                  </SheetHeader>
                  {plan.title === "Large payment" ? (
                    <div className="grid grid-cols-1 gap-8 mt-6 h-full pb-12 overflow-y-auto">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary">
                          Cryptocurrency (USDT)
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                          <li>
                            This will involve using a cryptocurrency called "Tether
                            USD"
                          </li>
                          <li>
                            This cryptocurrency is directly linked to the price of
                            the USD
                          </li>
                          <li>
                            Buy the amount worth of Tether you want to send it to me
                          </li>
                          <li>Use the given QR or the given crypto address</li>
                        </ol>
                        <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                            Crypto Address (ERC-20/BEP-20)
                          </p>
                          <p className="font-mono text-sm break-all select-all bg-background p-2 rounded border border-border">
                            0x1f9cF8db4299Bb0ad2205Bd7fE3B58E1Ee4A60e6
                          </p>
                        </div>
                        <div className="mt-4">
                          <a
                            href="https://freeimage.host/i/fVgRNqb"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src="https://iili.io/fVgRNqb.th.png"
                              alt="Crypto QR Code"
                              className="rounded-lg border border-border w-full h-auto max-h-[50vh] object-contain"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 h-full pb-12 overflow-y-auto">
                      {/* 1st Half: Indian transfers */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary">
                          Indian transfers:
                        </h3>
                        <div>
                          <p className="text-muted-foreground">
                            Transfer me money through UPI
                          </p>
                          <p className="font-mono bg-secondary/20 p-2 rounded mt-1 inline-block">
                            9823780410@fam
                          </p>
                        </div>
                        <div className="mt-4">
                          <a
                            href="https://freeimage.host/i/fVUY2vp"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src="https://iili.io/fVUY2vp.th.jpg"
                              alt="Payment QR Code"
                              className="rounded-lg border border-border w-full h-auto max-h-[50vh] object-contain"
                            />
                          </a>
                        </div>
                      </div>

                      {/* 2nd Half: International transfers */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary">
                          International transfers:
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                          <li>
                            Go to{" "}
                            <a
                              href="https://wise.com/in/send-money/send-money-to-india"
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline"
                            >
                              Wise
                            </a>
                          </li>
                          <li>
                            Select the amount (below 111 USD or 94 EURO)
                          </li>
                          <li>Select recipient country: India</li>
                          <li>Click "Send money"</li>
                          <li>Click on "Add recipient"</li>
                          <li>Click on "See all options"</li>
                          <li>Click on "UPI"</li>
                          <li>
                            Enter UPI ID:{" "}
                            <span className="font-mono bg-secondary/20 p-1 rounded">
                              9823780410@fam
                            </span>
                          </li>
                          <li>Transfer money</li>
                        </ol>
                        <div className="mt-4">
                          <a
                            href="https://freeimage.host/i/fVgJNfa"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src="https://iili.io/fVgJNfa.th.png"
                              alt="Visual Guide"
                              className="rounded-lg border border-border w-full h-auto max-h-[50vh] object-contain"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
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


      </div>
      <Footer />
    </div>
  );
}
