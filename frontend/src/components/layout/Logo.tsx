import { cn } from "@/lib/utils";

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-7 w-7">
        <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)", boxShadow: "0 0 16px rgba(139,92,246,0.4)" }} />
        <div className="absolute inset-[6px] rounded-full" style={{ background: "#060812" }} />
        <div className="absolute inset-[10px] rounded-full" style={{ background: "linear-gradient(135deg, #8B5CF6, #22D3EE)" }} />
      </div>
      {!mark && <span className="font-display text-[17px] font-bold tracking-tight text-white">unmapped</span>}
    </div>
  );
}
