import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  Bot,
  Workflow,
  AppWindow,
  MessageSquare,
  Users,
  DollarSign,
  Calendar,
  LayoutDashboard,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

type Item = { label: string; to: string; icon: LucideIcon };
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "AIKORTEX",
    items: [
      { label: "Home", to: "/agency", icon: Home },
      { label: "Agentes", to: "/agency/agents", icon: Bot },
      { label: "Flows", to: "/agency/flows", icon: Workflow },
      { label: "Apps", to: "/agency/apps", icon: AppWindow },
    ],
  },
  {
    title: "GESTÃO",
    items: [
      { label: "Mensagens", to: "/agency/messages", icon: MessageSquare },
      { label: "Clientes", to: "/agency/clients", icon: Users },
      { label: "Vendas", to: "/agency/crm", icon: DollarSign },
      { label: "Reuniões", to: "/agency/meetings", icon: Calendar },
    ],
  },
  {
    title: "PARTNERS",
    items: [{ label: "Dashboard", to: "/agency/partners", icon: LayoutDashboard }],
  },
  {
    title: "CONTA",
    items: [{ label: "Configurações", to: "/agency/settings", icon: Settings }],
  },
];

export default function AgencyLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  const agencyName = profile?.full_name?.split(" ")[0]
    ? `Agência ${profile.full_name.split(" ")[0]}`
    : "Sua Agência";

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-foreground">
      <aside className="flex h-full w-60 shrink-0 flex-col border-r border-[#1f1f1f] bg-[#111111]">
        <div className="flex h-16 items-center gap-2 px-5">
          <span className="text-lg font-semibold tracking-tight text-[#22c55e]">
            Aikortex
          </span>
          <span className="text-[#22c55e]">⚙</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {sections.map((section) => (
            <div key={section.title} className="mb-5">
              <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-neutral-500">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        "text-neutral-300 hover:bg-[#1a1a1a] hover:text-white",
                        isActive && "bg-[#1a1a1a] text-[#22c55e]"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[#1f1f1f] p-3">
          <div className="px-2 pb-2">
            <div className="truncate text-sm font-medium text-white">
              {agencyName}
            </div>
            <div className="truncate text-xs text-neutral-500">
              {profile?.email ?? ""}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#1a1a1a] hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
