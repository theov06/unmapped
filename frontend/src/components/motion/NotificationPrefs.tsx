import { useState } from "react";
import { Bell, MessageSquare, Mail, Smartphone } from "lucide-react";

const CHANNELS = [
  { id: "sms", icon: Smartphone, label: "SMS Notifications", desc: "Get matched opportunities via text", color: "#34D399" },
  { id: "email", icon: Mail, label: "Email Digest", desc: "Weekly summary of new matches", color: "#22D3EE" },
  { id: "push", icon: Bell, label: "Push Notifications", desc: "Real-time alerts in browser", color: "#8B5CF6" },
  { id: "whatsapp", icon: MessageSquare, label: "WhatsApp", desc: "Opportunity alerts via WhatsApp", color: "#25D366" },
];

export function NotificationPrefs() {
  const [enabled, setEnabled] = useState<Set<string>>(new Set(["email"]));

  const toggle = (id: string) => {
    const next = new Set(enabled);
    if (next.has(id)) next.delete(id); else next.add(id);
    setEnabled(next);
  };

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3">Stay Updated</p>
      <div className="space-y-2">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          const on = enabled.has(c.id);
          return (
            <button key={c.id} onClick={() => toggle(c.id)}
              className="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all"
              style={{
                background: on ? `${c.color}08` : "rgba(15,23,42,0.3)",
                borderColor: on ? `${c.color}30` : "rgba(255,255,255,0.06)",
              }}>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: `${c.color}15` }}>
                <Icon className="h-4 w-4" style={{ color: c.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-white">{c.label}</p>
                <p className="text-[10px] text-slate-500">{c.desc}</p>
              </div>
              <div className="h-5 w-9 rounded-full p-0.5 transition-colors"
                style={{ background: on ? c.color : "rgba(255,255,255,0.1)" }}>
                <div className="h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: on ? "translateX(16px)" : "translateX(0)" }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
