import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { SideNav, type NavItem } from "./SideNav";
import { BackgroundOrbs } from "@/components/motion/BackgroundOrbs";

export function PanelShell({ navItems, navTitle, children }: { navItems: NavItem[]; navTitle: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#060812" }}>
      <BackgroundOrbs />
      <TopBar />
      <div className="flex flex-1">
        <SideNav items={navItems} title={navTitle} />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="border-b border-white/[0.06] px-8 pt-8 pb-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-violet-400">{eyebrow}</p>}
          <h1 className="mt-2 font-display text-[34px] font-bold leading-[1.1] tracking-tight text-white">{title}</h1>
          {description && <p className="mt-2 text-[15px] text-slate-400">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
