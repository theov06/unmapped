import { useState } from "react";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "sw", label: "Kiswahili" },
  { code: "ar", label: "العربية" },
  { code: "bn", label: "বাংলা" },
  { code: "hi", label: "हिन्दी" },
  { code: "pt", label: "Português" },
];

export function LanguageSelector() {
  const [lang, setLang] = useState(() => localStorage.getItem("unmapped:lang") || "en");
  const [open, setOpen] = useState(false);

  const select = (code: string) => {
    setLang(code);
    localStorage.setItem("unmapped:lang", code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium transition-colors"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8" }}>
        <Globe className="h-3 w-3" />
        {LANGUAGES.find((l) => l.code === lang)?.label || "EN"}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl overflow-hidden"
          style={{ background: "rgba(8,12,24,0.95)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
          {LANGUAGES.map((l) => (
            <button key={l.code} onClick={() => select(l.code)}
              className="flex w-full items-center gap-2 px-3 py-2 text-[12px] transition-colors hover:bg-white/[0.04]"
              style={{ color: lang === l.code ? "#8B5CF6" : "#94A3B8", fontWeight: lang === l.code ? 600 : 400 }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
