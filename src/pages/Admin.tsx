import { LayoutDashboard, Building2, FileStack, Settings } from "lucide-react";
import { AppShell, type NavItem } from "@/components/AppShell";

const items: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Agências", to: "/admin/agencias", icon: Building2 },
  { label: "Templates", to: "/admin/templates", icon: FileStack },
  { label: "Configurações", to: "/admin/configuracoes", icon: Settings },
];

export default function Admin() {
  return (
    <AppShell items={items} title="Dashboard">
      <div className="rounded-xl border border-border bg-card p-10">
        <h2 className="text-2xl font-semibold">Painel Admin</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Visão geral da plataforma Aikortex.
        </p>
      </div>
    </AppShell>
  );
}
