import {
  Home,
  Bot,
  Workflow,
  AppWindow,
  MessageSquare,
  Users,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/AppShell";

const items: NavItem[] = [
  { label: "Home", to: "/agency", icon: Home },
  { label: "Agentes", to: "/agency/agentes", icon: Bot },
  { label: "Flows", to: "/agency/flows", icon: Workflow },
  { label: "Apps", to: "/agency/apps", icon: AppWindow },
  { label: "Mensagens", to: "/agency/mensagens", icon: MessageSquare },
  { label: "Clientes", to: "/agency/clientes", icon: Users },
];

export default function Agency() {
  return (
    <AppShell items={items} title="Home">
      <div className="rounded-xl border border-border bg-card p-10">
        <h2 className="text-2xl font-semibold">Bem-vindo ao Aikortex</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Escolha uma seção no menu lateral para começar.
        </p>
      </div>
    </AppShell>
  );
}
