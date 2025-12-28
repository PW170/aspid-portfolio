import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                Scale Retail,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Realize Dreams
                </span>
              </h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mb-8">
                Hi, I'm Pranav (known online as Aspid), a young and ambitious
                web developer passionate about turning ideas into powerful
                digital realities.
              </p>
              <div className="flex justify-start gap-4">
                <Button
                  size="lg"
                  className="rounded-full"
                  onClick={() => navigate("/projects")}
                >
                  View Work <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full glass hover:bg-white/10"
                  onClick={() => navigate("/contact")}
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>

            {/* Right Column: Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative group">
                {/* Decorative background for image */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative glass-panel p-2 overflow-hidden aspect-square w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                  <a href="https://freeimage.host/i/fVvQP0F" target="_blank" rel="noopener noreferrer" className="w-full h-full">
                    <img
                      src="https://iili.io/fVvQP0F.th.png"
                      alt="Aspid Profile"
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
