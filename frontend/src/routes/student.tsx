import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ImmersiveShell } from "@/components/layout/ImmersiveShell";
import { Home, User, Network, Map, Compass, Search } from "lucide-react";
import type { DockItem } from "@/components/layout/FloatingDock";

const DOCK: DockItem[] = [
  { to: "/student", label: "Home", icon: Home },
  { to: "/student/profile", label: "Profile", icon: User },
  { to: "/student/network", label: "Network", icon: Network },
  { to: "/student/heatmap", label: "Radar", icon: Map },
  { to: "/student/path", label: "Path", icon: Compass, badge: "AI" },
  { to: "/student/search", label: "Search", icon: Search },
];

export const Route = createFileRoute("/student")({
  component: () => (
    <ImmersiveShell dockItems={DOCK}>
      <Outlet />
    </ImmersiveShell>
  ),
});
