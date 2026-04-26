import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DockItem = { to: string; label: string; icon: LucideIcon; badge?: string };

export function FloatingDock({ items }: { items: DockItem[] }) {
  const location = useLocation();
  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-0.5 rounded-full border border-white/[0.08] px-1.5 py-1.5 sm:gap-1 sm:px-2"
        style={{ background: "rgba(6,8,18,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.08)" }}>
        {items.map((item) => {
          const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to + "/"));
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to} className="relative flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors sm:h-11 sm:w-11",
                  active ? "text-white" : "text-slate-500 hover:text-slate-300",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(34,211,238,0.15))", boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <Icon className="relative z-10 h-[18px] w-[18px]" />
                {item.badge && (
                  <span className="absolute -right-0.5 -top-0.5 z-20 h-4 min-w-4 rounded-full px-1 text-center text-[8px] font-bold leading-4 text-white"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)" }}>
                    {item.badge}
                  </span>
                )}
              </motion.div>
              {active && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-0.5 text-[9px] font-medium text-violet-300"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
