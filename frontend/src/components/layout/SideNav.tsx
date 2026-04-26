import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = { to: string; label: string; icon: LucideIcon; badge?: string };

export function SideNav({ items, title }: { items: NavItem[]; title: string }) {
  const location = useLocation();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] md:block" style={{ background: "rgba(6, 8, 18, 0.6)", backdropFilter: "blur(24px)" }}>
      <div className="px-5 pt-6 pb-4"><p className="eyebrow text-violet-400">{title}</p></div>
      <nav className="flex flex-col gap-1 px-3">
        {items.map((item) => {
          const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to + "/"));
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to}
              className={cn("group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-medium transition-all",
                active ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]")}>
              {active && (
                <motion.div layoutId="active-nav-pill" className="absolute inset-0 rounded-2xl"
                  style={{ background: "rgba(139, 92, 246, 0.12)", boxShadow: "0 0 28px rgba(139,92,246,0.15), inset 0 0 0 1px rgba(139,92,246,0.2)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <Icon className="relative z-10 h-[18px] w-[18px] shrink-0" style={active ? { color: "#8B5CF6" } : undefined} />
              <span className="relative z-10 flex-1">{item.label}</span>
              {item.badge && (
                <span className="relative z-10 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "rgba(139,92,246,0.2)", color: "#A78BFA" }}>{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
