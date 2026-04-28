import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

type Props = {
  items: NavItem[];
  title: string;
  children: ReactNode;
};

export function AppShell({ items, title, children }: Props) {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <aside className="flex h-full w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
            Aikortex
          </span>
          <span className="text-primary">⚙</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive &&
                    "bg-sidebar-accent text-primary"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          {profile?.email && (
            <div className="mb-2 px-2 text-xs text-muted-foreground truncate">
              {profile.email}
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="flex h-16 items-center border-b border-border px-8">
          <h1 className="text-base font-medium text-foreground">{title}</h1>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
