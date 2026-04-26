import { LogOut } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ROLE_META, useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const { role, setRole } = useApp();
  const meta = role ? ROLE_META[role] : null;
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-xl" style={{ background: "rgba(6, 8, 18, 0.8)" }}>
      <div className="flex h-16 items-center gap-3 px-5">
        <Link to="/" className="shrink-0"><Logo /></Link>
        <div className="ml-auto flex items-center gap-1.5">
          {meta && (
            <div className="flex items-center gap-2">
              <div className="hidden text-right leading-tight sm:block">
                <div className="text-[13px] font-medium text-slate-200">{meta.name}</div>
                <div className="text-[11px] text-slate-500">{meta.label}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)", boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}>
                {meta.initials}
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                onClick={() => { setRole(null); navigate({ to: "/" }); }} title="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
