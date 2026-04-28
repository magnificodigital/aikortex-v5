import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Bot, Sparkles, Headphones, ShoppingBag, Wand2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type Agent = {
  id: string;
  name: string | null;
  type: string | null;
  status: string | null;
  description: string | null;
  avatar_url: string | null;
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
          .select("id, name, type, status, description, avatar_url, updated_at")
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
    <div className="mx-auto w-full max-w-6xl px-8 py-10">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">Agentes IA</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Crie agentes inteligentes para vendas, suporte, marketing e mais.
          </p>
        </div>
        <button
          onClick={() => navigate("/agency/agents/new")}
          className="inline-flex items-center gap-2 rounded-md bg-[#22c55e] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#1ea34d]"
        >
          <Plus className="h-4 w-4" />
          Novo Agente
        </button>
      </div>

      {/* Meus Agentes */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-white">Meus Agentes</h2>
        {loading ? (
          <div className="rounded-lg border border-[#1f1f1f] bg-[#111111] p-6 text-sm text-neutral-500">
            Carregando…
          </div>
        ) : agents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#1f1f1f] bg-[#111111] p-10 text-center">
            <Bot className="mx-auto mb-3 h-8 w-8 text-neutral-600" />
            <p className="text-sm text-neutral-400">Nenhum agente criado ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent) => {
              const badgeClass =
                typeBadgeClass[agent.type ?? ""] ??
                "bg-neutral-700/30 text-neutral-300 border-neutral-700";
              return (
                <div
                  key={agent.id}
                  className="flex items-start gap-4 rounded-lg border border-[#1f1f1f] bg-[#111111] p-4 transition-colors hover:border-[#2a2a2a]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a] text-base font-semibold text-white">
                    {agent.avatar_url ? (
                      <img
                        src={agent.avatar_url}
                        alt={agent.name ?? "Agente"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initialOf(agent.name)
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {agent.name ?? "Sem nome"}
                      </h3>
                      {agent.type && (
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            badgeClass
                          )}
                        >
                          {agent.type}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {[agent.type ?? "Custom", agent.status ?? "—"]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                    {agent.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                        {agent.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-neutral-600">
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
        <h2 className="mb-4 text-lg font-semibold text-white">Templates</h2>
        {loadingTemplates ? (
          <div className="rounded-lg border border-[#1f1f1f] bg-[#111111] p-6 text-sm text-neutral-500">
            Carregando…
          </div>
        ) : templates.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#1f1f1f] bg-[#111111] p-6 text-sm text-neutral-500">
            Nenhum template disponível
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((tpl) => {
              const Icon = categoryIcon[tpl.sector ?? ""] ?? Sparkles;
              const catColor = categoryColor[tpl.sector ?? ""] ?? "text-neutral-400";
              return (
                <button
                  key={tpl.id}
                  onClick={() => navigate(`/agency/agents/new?template=${tpl.id}`)}
                  className="group flex flex-col items-start rounded-lg border border-[#1f1f1f] bg-[#111111] p-5 text-left transition-colors hover:border-[#2a2a2a] hover:bg-[#141414]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a]">
                    {tpl.avatar_url ? (
                      <img
                        src={tpl.avatar_url}
                        alt={tpl.name ?? ""}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="h-5 w-5 text-neutral-300" />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {tpl.name ?? "Sem nome"}
                    </h3>
                    {tpl.agent_type && (
                      <span className="rounded-full border border-neutral-700 bg-neutral-700/30 px-2 py-0.5 text-[10px] font-medium text-neutral-300">
                        {tpl.agent_type}
                      </span>
                    )}
                  </div>
                  {tpl.sector && (
                    <p className={cn("mt-1 text-xs font-medium", catColor)}>
                      {tpl.sector}
                    </p>
                  )}
                  {tpl.description && (
                    <p className="mt-3 text-sm text-neutral-400">{tpl.description}</p>
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
