import { motion } from "framer-motion";
import { Link2, FileText, Camera, Award, Users, Github, Linkedin, Upload, FolderOpen, MessageSquare } from "lucide-react";
import { staggerContainer, listItem } from "@/lib/motion";

const IMPORT_METHODS = [
  { icon: Link2, label: "URL / Portfolio", desc: "Paste a link to your work", color: "#8B5CF6", action: "url" },
  { icon: FileText, label: "Upload CV / Resume", desc: "PDF, DOCX, or TXT", color: "#22D3EE", action: "file" },
  { icon: Camera, label: "Photo of Certificate", desc: "We'll extract skills via AI", color: "#F59E0B", action: "photo" },
  { icon: Award, label: "Certificate / Credential", desc: "Upload or paste credential ID", color: "#34D399", action: "cert" },
  { icon: FolderOpen, label: "Google Drive", desc: "Import from your Drive", color: "#4285F4", action: "gdrive" },
  { icon: Users, label: "References", desc: "Add people who can vouch for you", color: "#FF5A6A", action: "ref" },
  { icon: Linkedin, label: "Import from LinkedIn", desc: "Connect your LinkedIn profile", color: "#0A66C2", action: "linkedin" },
  { icon: Github, label: "Import from GitHub", desc: "Show your code contributions", color: "#F8FAFC", action: "github" },
];

export function SkillImportPanel({ onImport }: { onImport?: (method: string) => void }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3">Import Skills From</p>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-2 sm:grid-cols-2">
        {IMPORT_METHODS.map((m) => {
          const Icon = m.icon;
          return (
            <motion.button
              key={m.action}
              variants={listItem}
              whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${m.color}15` }}
              onClick={() => onImport?.(m.action)}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.06] p-3 text-left transition-colors hover:border-white/[0.1]"
              style={{ background: "rgba(15,23,42,0.4)" }}
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: `${m.color}15` }}>
                <Icon className="h-4 w-4" style={{ color: m.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white">{m.label}</p>
                <p className="text-[10px] text-slate-500 truncate">{m.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
