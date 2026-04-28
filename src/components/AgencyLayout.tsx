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
  DollarSign,
  UserCog,
  CheckSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import logoBranco from "@/assets/aikortex-logo-branco.png";
import iconeBranco from "@/assets/aikortex-icone-branco.png";

type SubItem = { label: string; to: string; icon: LucideIcon };
type Item = {
  label: string;
  to?: string;
  icon: LucideIcon;
  children?: SubItem[];
};
type Section = { title: string; items: Item[] };

const topItems: Item[] = [
  { label: "Home", to: "/agency", icon: Home },
  { label: "Dashboard", to: "/agency/dashboard", icon: LayoutDashboard },
];

const sections: Section[] = [
  {
    title: "AIKORTEX",
    items: [
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
      { label: "Clientes", to: "/agency/clients", icon: Users },
      { label: "Vendas", to: "/agency/crm", icon: ShoppingCart },
      { label: "Financeiro", to: "/agency/finance", icon: DollarSign },
      { label: "Equipe", to: "/agency/team", icon: UserCog },
      { label: "Tarefas", to: "/agency/tasks", icon: CheckSquare },
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
    AIKORTEX: false,
    GESTÃO: false,
    PARTNERS: false,
    CONTA: true,
  });
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [agencyOpen, setAgencyOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  const isActive = (to?: string) => !!to && location.pathname === to;

  return (
    <div className="flex h-screen w-full bg-[#14151A] text-foreground">
      <aside
        className={cn(
          "flex h-full shrink-0 flex-col border-r border-white/[0.06] bg-[#111217] transition-[width] duration-200",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Logo */}
        <div className={cn("flex h-14 items-center border-b border-white/[0.06]", collapsed ? "justify-center px-2" : "px-4")}>
          {collapsed ? (
            <img src={iconeBranco} alt="Aikortex" className="h-7 w-7 object-contain" />
          ) : (
            <img src={logoBranco} alt="Aikortex" className="h-6 w-auto" />
          )}
        </div>

        {/* Agency selector */}
        {!collapsed && (
          <div className="px-2 pt-3">
            <button
              onClick={() => setAgencyOpen((v) => !v)}
              className="flex h-8 w-full items-center justify-between rounded-md border border-sidebar-border bg-transparent px-2 text-xs text-white transition-colors hover:border-[#7585A3]/60"
            >
              <span className="truncate">Aikortex</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-[#7585A3] transition-transform",
                  agencyOpen && "rotate-180"
                )}
              />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {/* Top items (fixed, no section) */}
          <div className="space-y-0.5">
            {topItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to!}
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    "text-[#7585A3] hover:bg-white/[0.04] hover:text-white",
                    isActive && "bg-white/[0.06] text-white font-medium",
                    collapsed && "justify-center px-0"
                  )
                }
              >
                <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>

          {sections.map((section) => {
            const open = openSections[section.title] ?? true;
            return (
              <div key={section.title}>
                {!collapsed && (
                  <button
                    onClick={() =>
                      setOpenSections((s) => ({ ...s, [section.title]: !open }))
                    }
                    className="flex w-full items-center justify-between px-3 py-2 mt-4 text-[10px] uppercase tracking-widest text-[#7585A3] hover:text-white"
                  >
                    <span>{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        !open && "-rotate-90"
                      )}
                      strokeWidth={1.75}
                    />
                  </button>
                )}
                {(open || collapsed) && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      if (item.children) {
                        const itemOpen = openItems[item.label] ?? true;
                        const anyChildActive = item.children.some((c) =>
                          isActive(c.to)
                        );
                        const parentActive = isActive(item.to);
                        return (
                          <div key={item.label}>
                            <div
                              className={cn(
                                "flex w-full items-center gap-3 rounded-md text-sm transition-colors",
                                "text-[#7585A3] hover:bg-white/[0.04] hover:text-white",
                                (anyChildActive || parentActive) && "text-white",
                                collapsed && "justify-center"
                              )}
                            >
                              {item.to ? (
                                <NavLink
                                  to={item.to}
                                  className={({ isActive }) =>
                                    cn(
                                      "flex flex-1 items-center gap-3 rounded-md px-3 py-2",
                                      isActive && "bg-white/[0.06] text-white font-medium",
                                      collapsed && "justify-center px-0"
                                    )
                                  }
                                >
                                  <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                                  {!collapsed && (
                                    <span className="flex-1 text-left">{item.label}</span>
                                  )}
                                </NavLink>
                              ) : (
                                <button
                                  onClick={() =>
                                    setOpenItems((s) => ({ ...s, [item.label]: !itemOpen }))
                                  }
                                  className={cn(
                                    "flex flex-1 items-center gap-3 px-3 py-2",
                                    collapsed && "justify-center px-0"
                                  )}
                                >
                                  <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                                  {!collapsed && (
                                    <span className="flex-1 text-left">{item.label}</span>
                                  )}
                                </button>
                              )}
                              {!collapsed && (
                                <button
                                  onClick={() =>
                                    setOpenItems((s) => ({ ...s, [item.label]: !itemOpen }))
                                  }
                                  className="px-2 py-2 text-[#7585A3] hover:text-white"
                                  aria-label={`Alternar ${item.label}`}
                                >
                                  <ChevronDown
                                    className={cn(
                                      "h-3.5 w-3.5 transition-transform",
                                      !itemOpen && "-rotate-90"
                                    )}
                                    strokeWidth={1.75}
                                  />
                                </button>
                              )}
                            </div>
                            {!collapsed && itemOpen && (
                              <div className="space-y-0.5 mt-0.5">
                                {item.children.map((sub) => (
                                  <NavLink
                                    key={sub.to}
                                    to={sub.to}
                                    style={{ paddingLeft: "2.75rem" }}
                                    className={({ isActive }) =>
                                      cn(
                                        "flex items-center gap-3 rounded-md pr-3 py-2 text-sm transition-colors",
                                        "text-[#7585A3] hover:bg-white/[0.04] hover:text-white",
                                        isActive && "bg-white/[0.06] text-white font-medium"
                                      )
                                    }
                                  >
                                    <sub.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
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
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                              "text-[#7585A3] hover:bg-white/[0.04] hover:text-white",
                              isActive && "bg-white/[0.06] text-white font-medium",
                              collapsed && "justify-center px-0"
                            )
                          }
                        >
                          <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
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
        <div className="border-t border-white/[0.06] px-2 py-2 space-y-0.5">
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[#7585A3] transition-colors hover:bg-white/[0.04] hover:text-white",
              collapsed && "justify-center px-0"
            )}
          >
            <Sun className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {!collapsed && <span>Modo claro</span>}
          </button>
          <button
            onClick={handleSignOut}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-white/[0.04]",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {!collapsed && <span>Sair</span>}
          </button>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[#7585A3] transition-colors hover:bg-white/[0.04] hover:text-white",
              collapsed && "justify-center px-0"
            )}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 shrink-0 transition-transform",
                collapsed && "rotate-180"
              )}
              strokeWidth={1.75}
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
