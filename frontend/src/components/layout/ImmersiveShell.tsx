import { type ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { FloatingDock, type DockItem } from "./FloatingDock";
import { BackgroundOrbs } from "@/components/motion/BackgroundOrbs";
import { ThemeToggle } from "@/components/motion/ThemeToggle";
import { LanguageSelector } from "@/components/motion/LanguageSelector";
import { ROLE_META, useApp } from "@/lib/app-context";
import { pageVariants } from "@/lib/motion";

export function ImmersiveShell({ dockItems, children }: { dockItems: DockItem[]; children: ReactNode }) {
  const { role, setRole } = useApp();
  const meta = role ? ROLE_META[role] : null;
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#060812" }}>
      <BackgroundOrbs />
      {/* Constellation grid */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Top bar — solid on scroll */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(6, 8, 18, 0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <Link to="/"><Logo /></Link>
        {meta && (
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <span className="text-[11px] text-slate-500">{meta.label}</span>
            <div className="grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)", boxShadow: "0 0 16px rgba(139,92,246,0.3)" }}>
              {meta.initials}
            </div>
            <button onClick={() => setRole(null)} className="text-slate-600 hover:text-slate-400 transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </header>

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 min-h-screen pt-16 pb-28"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Floating dock */}
      <FloatingDock items={dockItems} />
    </div>
  );
}
