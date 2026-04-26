export type NodeType = "user" | "person" | "organization" | "training" | "employer";
export type Ring = "center" | "inner" | "middle" | "outer";

export interface GalaxyNodeData {
  id: string;
  name: string;
  type: NodeType;
  location?: string;
  skills?: string[];
  strength: number;
  ring: Ring;
  initials: string;
}

export const NODE_COLORS: Record<NodeType, string> = {
  user: "#FF5A6A",
  person: "#22D3EE",
  organization: "#8B5CF6",
  training: "#F59E0B",
  employer: "#34D399",
};

export const NODE_LABELS: Record<NodeType, string> = {
  user: "You",
  person: "Person",
  organization: "Organization",
  training: "Training",
  employer: "Employer",
};

export const GALAXY_NODES: GalaxyNodeData[] = [
  // Center
  { id: "self", name: "Amara Kone", type: "user", location: "Accra, Ghana", skills: ["Phone repair", "JavaScript", "Customer service", "HTML/CSS", "Mobile money"], strength: 100, ring: "center", initials: "AK" },
  // Inner ring — 5 closest
  { id: "p1", name: "Kojo Asante", type: "person", location: "Kumasi, GH", skills: ["Phone repair", "Customer service", "Twi", "Mobile money"], strength: 92, ring: "inner", initials: "KA" },
  { id: "p2", name: "Kwame Boateng", type: "person", location: "Tema, GH", skills: ["Hardware diagnostics", "Soldering", "Customer service"], strength: 90, ring: "inner", initials: "KB" },
  { id: "o1", name: "TechHub Accra", type: "employer", location: "Accra, GH", skills: ["Phone repair", "Diagnostics"], strength: 94, ring: "inner", initials: "TH" },
  { id: "t1", name: "Codetrain Africa", type: "training", location: "Accra, GH", skills: ["JavaScript", "HTML/CSS", "React"], strength: 87, ring: "inner", initials: "CT" },
  { id: "e1", name: "MTN MoMo", type: "employer", location: "Accra, GH", skills: ["Mobile money", "Customer service", "Field sales"], strength: 85, ring: "inner", initials: "MM" },
  // Middle ring — 6 nodes
  { id: "p3", name: "Adaeze Nwosu", type: "person", location: "Lagos, NG", skills: ["JavaScript", "HTML/CSS", "English"], strength: 72, ring: "middle", initials: "AN" },
  { id: "o2", name: "Impact Hub Accra", type: "organization", location: "Accra, GH", skills: ["Youth entrepreneurship", "Networking"], strength: 74, ring: "middle", initials: "IH" },
  { id: "o3", name: "MEST Africa", type: "training", location: "Accra, GH", skills: ["Tech entrepreneurship", "Product dev"], strength: 68, ring: "middle", initials: "ME" },
  { id: "p4", name: "Esi Mensah", type: "person", location: "Cape Coast, GH", skills: ["Mobile money", "JavaScript"], strength: 65, ring: "middle", initials: "EM" },
  { id: "p5", name: "Yaw Owusu", type: "person", location: "Bolgatanga, GH", skills: ["Customer service", "Negotiation", "English"], strength: 63, ring: "middle", initials: "YO" },
  { id: "e2", name: "Asoriba", type: "employer", location: "Remote · West Africa", skills: ["HTML/CSS", "JavaScript", "English"], strength: 70, ring: "middle", initials: "AS" },
  // Outer ring — 6 nodes
  { id: "p6", name: "Fatou Diop", type: "person", location: "Dakar, SN", skills: ["JavaScript", "French"], strength: 52, ring: "outer", initials: "FD" },
  { id: "o4", name: "Ashesi University", type: "organization", location: "Berekuso, GH", skills: ["Engineering", "Business"], strength: 55, ring: "outer", initials: "AU" },
  { id: "p7", name: "Priya Ramanathan", type: "person", location: "Bengaluru, IN", skills: ["Web dev", "Mentoring"], strength: 48, ring: "outer", initials: "PR" },
  { id: "t2", name: "Ghana Tech Lab", type: "training", location: "Accra, GH", skills: ["Digital skills", "Youth programs"], strength: 60, ring: "outer", initials: "GT" },
  { id: "p8", name: "Amina Bello", type: "person", location: "Abuja, NG", skills: ["Field tech", "Phone repair", "Soldering"], strength: 58, ring: "outer", initials: "AB" },
  { id: "o5", name: "Mastercard Fdn", type: "organization", location: "Ghana", skills: ["Grants", "Youth employment"], strength: 50, ring: "outer", initials: "MF" },
];

export const GALAXY_EDGES = [
  // Self connections
  { from: "self", to: "p1" }, { from: "self", to: "p2" }, { from: "self", to: "o1" },
  { from: "self", to: "t1" }, { from: "self", to: "e1" },
  { from: "self", to: "p3" }, { from: "self", to: "o2" }, { from: "self", to: "e2" },
  { from: "self", to: "p4" }, { from: "self", to: "p6" }, { from: "self", to: "o4" },
  // Cross connections
  { from: "p1", to: "o1" }, { from: "p2", to: "o1" }, { from: "p3", to: "t1" },
  { from: "o2", to: "o3" }, { from: "p4", to: "e1" }, { from: "t1", to: "t2" },
  { from: "p5", to: "e1" }, { from: "e2", to: "p3" }, { from: "o4", to: "o3" },
  { from: "p8", to: "p2" }, { from: "o5", to: "o2" }, { from: "p7", to: "t1" },
];
