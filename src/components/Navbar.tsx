import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
    >
      <div className="glass rounded-full px-4 py-2 flex items-center justify-between border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer pl-2" onClick={() => navigate("/")}>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Aspid
          </span>
        </div>
        
        {/* Desktop Menu - Button Box */}
        <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-full px-2 py-1 border border-white/5 mx-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.href)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                isActive(link.href) 
                  ? "bg-primary/20 text-primary" 
                  : "text-foreground/80 hover:text-primary hover:bg-white/10"
              )}
            >
              {link.name}
            </button>
          ))}
        </div>
        
        {/* Auth Button */}
        <div className="hidden md:block pr-1">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-white/10 text-xs h-8 px-4"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden pr-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-full text-foreground hover:text-primary hover:bg-white/10 focus:outline-none transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-white/10 overflow-hidden p-2 flex flex-col gap-1 shadow-xl bg-black/60 backdrop-blur-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.href);
                  setIsOpen(false);
                }}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-colors text-center w-full",
                  isActive(link.href)
                    ? "bg-primary/20 text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-white/10"
                )}
              >
                {link.name}
              </button>
            ))}
            <div className="h-px bg-white/10 my-1 mx-4" />
            {isAuthenticated && (
              <Button
                variant="ghost"
                className="w-full justify-center rounded-xl hover:bg-white/10"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}