import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Bot,
  Phone,
  Workflow,
  AppWindow,
  MessageSquare,
  Send,
  Users,
  FileText,
  ShoppingCart,
  ClipboardList,
  Video,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ChevronLeft,
  Sun,
  Gem,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

type SubItem = { label: string; to: string; icon: LucideIcon };
type Item = {
  label: string;
  to?: string;
  icon: LucideIcon;
  children?: SubItem[];
};
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "AIKORTEX",
    items: [
      { label: "Home", to: "/agency", icon: Home },
      { label: "Agentes", to: "/agency/agents", icon: Bot },
      { label: "Ligações", to: "/agency/calls", icon: Phone },
      { label: "Flows", to: "/agency/flows", icon: Workflow },
      { label: "Apps", to: "/agency/apps", icon: AppWindow },
      { label: "Mensagens", to: "/agency/messages", icon: MessageSquare },
      { label: "Disparos", to: "/agency/broadcasts", icon: Send },
    ],
  },
  {
    title: "GESTÃO",
    items: [
      {
        label: "Clientes",
        icon: Users,
        children: [{ label: "Contratos", to: "/agency/contracts", icon: FileText }],
      },
      {
        label: "Vendas",
        icon: ShoppingCart,
        children: [
          { label: "CRM", to: "/agency/crm", icon: ClipboardList },
          { label: "Reuniões", to: "/agency/meetings", icon: Video },
        ],
      },
    ],
  },
  {
    title: "PARTNERS",
    items: [
      { label: "Dashboard", to: "/agency/partners", icon: LayoutDashboard },
    ],
  },
  {
    title: "CONTA",
    items: [
      { label: "Configurações", to: "/agency/settings", icon: Settings },
    ],
  },
];

export default function AgencyLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    AIKORTEX: true,
    GESTÃO: true,
    PARTNERS: true,
    CONTA: true,
  });
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    Clientes: true,
    Vendas: true,
  });
  const [agencyOpen, setAgencyOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  const isActive = (to?: string) => !!to && location.pathname === to;

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-foreground">
      <aside
        className={cn(
          "flex h-full shrink-0 flex-col border-r border-[#1f1f1f] bg-[#0d0d0d] transition-[width] duration-200",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-5">
          <Gem className="h-6 w-6 text-[#22c55e]" />
          {!collapsed && (
            <span className="text-xl font-semibold tracking-tight text-white">
              Aikortex
            </span>
          )}
        </div>

        {/* Agency selector */}
        {!collapsed && (
          <div className="px-3 pb-3">
            <button
              onClick={() => setAgencyOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-md border border-[#1f1f1f] bg-[#111111] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#161616]"
            >
              <span className="truncate">Aikortex</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-neutral-400 transition-transform",
                  agencyOpen && "rotate-180"
                )}
              />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-1">

          {sections.map((section) => {
            const open = openSections[section.title] ?? true;
            return (
              <div key={section.title} className="mb-3">
                {!collapsed && (
                  <button
                    onClick={() =>
                      setOpenSections((s) => ({ ...s, [section.title]: !open }))
                    }
                    className="flex w-full items-center justify-between px-3 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-neutral-300"
                  >
                    <span>{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        !open && "-rotate-90"
                      )}
                    />
                  </button>
                )}
                {(open || collapsed) && (
                  <div className="mt-1 space-y-0.5">
                    {section.items.map((item) => {
                      if (item.children) {
                        const itemOpen = openItems[item.label] ?? true;
                        const anyChildActive = item.children.some((c) =>
                          isActive(c.to)
                        );
                        return (
                          <div key={item.label}>
                            <button
                              onClick={() =>
                                setOpenItems((s) => ({
                                  ...s,
                                  [item.label]: !itemOpen,
                                }))
                              }
                              className={cn(
                                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                "text-neutral-300 hover:bg-[#1a1a1a] hover:text-white",
                                anyChildActive && "text-white",
                                collapsed && "justify-center px-0"
                              )}
                            >
                              <item.icon className="h-4 w-4 shrink-0" />
                              {!collapsed && (
                                <>
                                  <span className="flex-1 text-left">
                                    {item.label}
                                  </span>
                                  <ChevronDown
                                    className={cn(
                                      "h-3 w-3 transition-transform",
                                      !itemOpen && "-rotate-90"
                                    )}
                                  />
                                </>
                              )}
                            </button>
                            {!collapsed && itemOpen && (
                              <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#1f1f1f] pl-2">
                                {item.children.map((sub) => (
                                  <NavLink
                                    key={sub.to}
                                    to={sub.to}
                                    className={({ isActive }) =>
                                      cn(
                                        "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors",
                                        "text-neutral-400 hover:bg-[#1a1a1a] hover:text-white",
                                        isActive && "bg-[#1a1a1a] text-white"
                                      )
                                    }
                                  >
                                    <sub.icon className="h-3.5 w-3.5" />
                                    <span>{sub.label}</span>
                                  </NavLink>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to!}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              "text-neutral-300 hover:bg-[#1a1a1a] hover:text-white",
                              isActive && "bg-[#1a1a1a] text-white",
                              collapsed && "justify-center px-0"
                            )
                          }
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#1f1f1f] p-2">
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#1a1a1a] hover:text-white",
              collapsed && "justify-center px-0"
            )}
          >
            <Sun className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Modo claro</span>}
          </button>
          <button
            onClick={handleSignOut}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-[#1a1a1a]",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-[#1a1a1a] hover:text-white",
              collapsed && "justify-center px-0"
            )}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 shrink-0 transition-transform",
                collapsed && "rotate-180"
              )}
            />
            {!collapsed && <span>Recolher</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
