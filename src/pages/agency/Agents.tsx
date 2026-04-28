import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Bot, Sparkles, Headphones, ShoppingBag, Wand2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type Agent = {
  id: string;
  name: string | null;
  agent_type: string | null;
  status: string | null;
  description: string | null;
  updated_at: string | null;
};

type Template = {
  id: string;
  name: string | null;
  description: string | null;
  sector: string | null;
  agent_type: string | null;
  avatar_url?: string | null;
};

const typeBadgeClass: Record<string, string> = {
  Router: "bg-orange-500/20 text-orange-400",
  SDR: "bg-green-500/20 text-green-500",
  SAC: "bg-blue-500/20 text-blue-400",
};

const categoryColor: Record<string, string> = {
  Vendas: "text-green-500",
  Suporte: "text-blue-400",
  Livre: "text-muted-foreground",
};

const categoryIcon: Record<string, typeof Bot> = {
  Vendas: ShoppingBag,
  Suporte: Headphones,
  Livre: Wand2,
};

function initialOf(name?: string | null) {
  return (name?.trim()?.[0] ?? "A").toUpperCase();
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

export default function Agents() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadAgents() {
      setLoading(true);
      try {
        let agencyId: string | null = null;
        if (user?.id) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("agency_id")
            .eq("id", user.id)
            .maybeSingle();
          agencyId = (profile as { agency_id?: string } | null)?.agency_id ?? null;
        }

        if (!agencyId) {
          if (!cancelled) setAgents([]);
          return;
        }

        const { data: agentsData } = await supabase
          .from("agents")
          .select("id, name, agent_type, status, description, updated_at")
          .eq("agency_id", agencyId)
          .order("updated_at", { ascending: false });

        if (!cancelled) setAgents((agentsData as Agent[]) ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadAgents();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from('agent_templates')
        .select('id, name, description, agent_type, sector')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching templates:', error);
      }
      setTemplates(data || []);
      setLoadingTemplates(false);
    };
    fetchTemplates();
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl bg-background p-8">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agentes IA</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Crie agentes inteligentes para vendas, suporte, marketing e mais.
          </p>
        </div>
        <button
          onClick={() => navigate("/agency/agents/new")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Plus className="h-4 w-4" />
          Novo Agente
        </button>
      </div>

      {/* Meus Agentes */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Meus Agentes</h2>
        {loading ? (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Carregando…
          </div>
        ) : agents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <Bot className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Nenhum agente criado ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent) => {
              const badgeClass =
                typeBadgeClass[agent.agent_type ?? ""] ??
                "bg-muted text-muted-foreground";
              return (
                <div
                  key={agent.id}
                  onClick={() => navigate(`/agency/agents/${agent.id}`)}
                  className="flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-base font-semibold text-foreground">
                    {initialOf(agent.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {agent.name ?? "Sem nome"}
                      </h3>
                      {agent.agent_type && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs",
                            badgeClass
                          )}
                        >
                          {agent.agent_type}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {[agent.agent_type ?? "Custom", agent.status ?? "—"]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                    {agent.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {agent.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Atualizado em {formatDate(agent.updated_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Templates */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Templates</h2>
        {loadingTemplates ? (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Carregando…
          </div>
        ) : templates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
            Nenhum template disponível
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((tpl) => {
              const Icon = categoryIcon[tpl.sector ?? ""] ?? Sparkles;
              const catColor = categoryColor[tpl.sector ?? ""] ?? "text-muted-foreground";
              return (
                <button
                  key={tpl.id}
                  onClick={() => navigate(`/agency/agents/new?template=${tpl.id}`)}
                  className="group flex cursor-pointer flex-col items-start rounded-xl border border-border bg-card p-6 text-left transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-muted">
                    {tpl.avatar_url ? (
                      <img
                        src={tpl.avatar_url}
                        alt={tpl.name ?? ""}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="h-5 w-5 text-foreground" />
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {tpl.name ?? "Sem nome"}
                  </h3>
                  {tpl.sector && (
                    <p className={cn("mt-0.5 text-sm", catColor)}>
                      {tpl.sector}
                    </p>
                  )}
                  {tpl.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {tpl.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
