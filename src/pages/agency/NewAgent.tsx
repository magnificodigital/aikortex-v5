import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Phone,
  Mic,
  ArrowUp,
  Bot,
  MessageCircle,
  Globe,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

type Message = { role: "assistant" | "user"; content: string };

type Template = {
  id: string;
  name: string;
  description: string | null;
  agent_type: string;
  sector: string | null;
  system_prompt: string | null;
};

const DEFAULT_GREETING: Message = {
  role: "assistant",
  content:
    "Olá! Sou o seu assistente de configuração da Aikortex. Vamos criar seu agente juntos.\n\n1. Qual será o nome do seu agente? (Ex: \"Alex\", \"Bia da Empresa X\", \"Consultor Especialista\")",
};

function buildTemplateGreeting(t: Template): Message {
  const descLine = t.description ? `${t.description}\n\n` : "";
  return {
    role: "assistant",
    content: `Olá! Vamos configurar o agente "${t.name}".\n\n${descLine}1. Qual será o nome do seu agente? (Ex: "Alex", "Bia da Empresa X")`,
  };
}

const steps = [
  { n: 1, label: "Descobrir" },
  { n: 2, label: "Estruturar" },
  { n: 3, label: "Construir" },
];

const navItems = ["Agente", "Integrações", "Canais"];

export default function NewAgent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get("template");
  const { user } = useAuth();
  const [templateId, setTemplateId] = useState<string | null>(templateParam);
  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [loadingTemplate, setLoadingTemplate] = useState<boolean>(!!templateParam);
  const [activeStep] = useState(1);
  const [activeNav, setActiveNav] = useState("Agente");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    templateParam
      ? [{ role: "assistant", content: "Carregando template…" }]
      : [DEFAULT_GREETING]
  );

  const agentType = loadingTemplate
    ? "…"
    : template?.agent_type ?? (templateParam ? "Custom" : "SDR");

  useEffect(() => {
    if (!templateParam) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("agent_templates")
        .select("id, name, description, agent_type, sector, system_prompt")
        .eq("id", templateParam)
        .eq("is_active", true)
        .maybeSingle();
      if (cancelled) return;
      if (!error && data) {
        const t = data as Template;
        setTemplate(t);
        setTemplateId(t.id);
        setMessages([buildTemplateGreeting(t)]);
      } else {
        setMessages([DEFAULT_GREETING]);
      }
      setLoadingTemplate(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [templateParam]);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("agency_id")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setAgencyId((data as { agency_id?: string } | null)?.agency_id ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    if (!agencyId) {
      toast.error("Sua conta não está vinculada a uma agência");
      return;
    }
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");

    if (agentId) return;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("agents")
        .insert({
          agency_id: agencyId,
          agent_type: template?.agent_type ?? "Custom",
          name: text.slice(0, 80),
          template_id: templateId ?? null,
          status: "draft",
          description: template?.description ?? null,
          system_prompt: template?.system_prompt ?? null,
        })
        .select("id")
        .single();
      if (error) throw error;
      setAgentId(data.id);
      toast.success("Rascunho salvo");
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível salvar o rascunho");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="flex h-14 w-full shrink-0 items-center border-b border-border bg-background px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/agency/agents")}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              Agente de Texto e Voz
            </span>
            <span className="rounded-md border border-border px-2 py-0.5 text-xs text-foreground">
              {agentType}
            </span>
            {saving ? (
              <span className="text-xs text-muted-foreground">Salvando…</span>
            ) : agentId ? (
              <span className="text-xs text-muted-foreground">Rascunho salvo</span>
            ) : null}
          </div>

          <div className="mx-2 h-5 w-px bg-border" />

          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Agente de Ligação</span>
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                activeNav === item
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item}
            </button>
          ))}
          <button className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Publicar
          </button>
        </nav>
      </header>

      {/* Body */}
      <div className="flex h-[calc(100vh-3.5rem)] min-h-0">
        {/* Left panel */}
        <section className="flex w-[420px] shrink-0 flex-col border-r border-border">
          {/* Progress */}
          <div className="flex items-center gap-2 border-b border-border px-6 py-3">
            {steps.map((s, i) => {
              const active = s.n === activeStep;
              return (
                <div key={s.n} className="flex flex-1 items-center gap-2">
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {s.n}
                  </div>
                  <span
                    className={cn(
                      "text-xs",
                      active ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="ml-1 h-px flex-1 bg-border" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Chat messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-2",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-card px-3 py-2">
              <button
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Microfone"
              >
                <Mic className="h-4 w-4" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Digite sua resposta..."
                rows={1}
                className="flex-1 resize-none border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || !agencyId || saving}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted p-2 text-foreground transition-colors hover:bg-accent disabled:opacity-50"
                aria-label="Enviar"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center border-b border-border px-6">
            <span className="text-sm font-medium text-foreground">
              {activeNav === "Integrações"
                ? "Integrações"
                : activeNav === "Canais"
                ? "Canais de operação"
                : "Configuração do Agente"}
            </span>
          </div>

          {activeNav === "Agente" && (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                Configurando seu agente
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Continue respondendo no chat à esquerda. Conforme você avança nos passos Descobrir / Estruturar / Construir, a configuração final do agente aparecerá aqui.
              </p>
            </div>
          )}

          {activeNav === "Integrações" && (
            <div className="flex-1 overflow-y-auto p-6">
              <p className="mb-4 text-xs text-muted-foreground">
                As chaves de integração são configuradas no nível da agência. Os agentes herdam as integrações disponíveis.
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: Sparkles,
                    name: "LiteLLM Proxy",
                    desc: "Providers de LLM (OpenAI, Anthropic, Google, DeepSeek, Qwen…)",
                    badge: "Configurar na Agência",
                    badgeClass: "bg-muted text-muted-foreground",
                  },
                  {
                    icon: Phone,
                    name: "ElevenLabs",
                    desc: "Chamadas de voz em tempo real",
                    badge: "Configurar na Agência",
                    badgeClass: "bg-muted text-muted-foreground",
                  },
                  {
                    icon: Mic,
                    name: "Voz Aikortex",
                    desc: "Áudios assíncronos para WhatsApp e mensagens",
                    badge: "Incluso",
                    badgeClass: "bg-green-500/20 text-green-500",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-xs",
                          item.badgeClass
                        )}
                      >
                        {item.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeNav === "Canais" && (
            <div className="flex-1 overflow-y-auto p-6">
              <p className="mb-4 text-xs text-muted-foreground">
                Selecione onde este agente vai operar. Os canais ficam ativos ao publicar o agente e exigem que a agência tenha a integração correspondente conectada.
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: MessageCircle,
                    name: "WhatsApp",
                    desc: "Meta Cloud API — agência precisa estar conectada",
                    key: "whatsapp",
                    disabled: true,
                  },
                  {
                    icon: Globe,
                    name: "Web Chat",
                    desc: "Widget embedável no site do cliente",
                    key: "webchat",
                    disabled: false,
                  },
                  {
                    icon: Mail,
                    name: "Email",
                    desc: "Respostas automáticas via SMTP da agência",
                    key: "email",
                    disabled: true,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                      <Switch
                        checked={!!channelStates[item.key]}
                        disabled={item.disabled}
                        onCheckedChange={(v) =>
                          setChannelStates((s) => ({ ...s, [item.key]: v }))
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
