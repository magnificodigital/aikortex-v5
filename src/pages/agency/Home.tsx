import { useState } from "react";
import { Globe, MessageCircle, ArrowUp, RefreshCw, Monitor, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

const tabs = [
  { value: "app", label: "App", icon: Monitor, placeholder: "Descreva o app que você quer criar..." },
  { value: "agent", label: "Agentes", icon: Sparkles, placeholder: "Descreva o agente que você quer criar..." },
  { value: "flow", label: "Flows", icon: Globe, placeholder: "Descreva o flow que você quer criar..." },
];

const channels = [
  { value: "web", label: "Web App", icon: Monitor },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
];

const quickActions = [
  { label: "Construtor de Formulários", icon: Monitor },
  { label: "Dashboard de Vendas", icon: Monitor },
  { label: "Landing Page", icon: Monitor },
];

export default function AgencyHome() {
  const { profile } = useAuth();
  const [values, setValues] = useState<Record<string, string>>({ app: "", agent: "", flow: "" });
  const [channel, setChannel] = useState("web");
  const [activeTab, setActiveTab] = useState("app");
  const name = profile?.full_name ?? "";

  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center px-6 py-20">
      <h1 className="text-center text-[44px] font-medium leading-tight tracking-tight text-foreground">
        {greeting()},{" "}
        <span className="font-serif italic font-normal">{name || "Admin"}</span>
      </h1>
      <p className="mt-4 max-w-md text-center text-base text-muted-foreground">
        Crie Agentes, Fluxos inteligentes e apps em minutos conversando com IA.
      </p>

      <div className="mt-10 w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-3 h-auto gap-1 bg-transparent p-0">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className={cn(
                  "rounded-full border border-transparent bg-transparent px-4 py-2 text-sm text-muted-foreground hover:text-foreground",
                  "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:font-medium data-[state=active]:shadow-none"
                )}
              >
                <t.icon className="mr-2 h-4 w-4" />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value} className="mt-0">
              <div className="rounded-xl border border-border bg-card p-4">
                <textarea
                  placeholder={t.placeholder}
                  value={values[t.value]}
                  onChange={(e) => setValues((v) => ({ ...v, [t.value]: e.target.value }))}
                  className="min-h-[100px] w-full resize-none border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {channels.map((c) => {
                      const active = channel === c.value;
                      return (
                        <button
                          key={c.value}
                          onClick={() => setChannel(c.value)}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm transition-colors",
                            active
                              ? "bg-accent text-accent-foreground"
                              : "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <c.icon className="h-3.5 w-3.5" />
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                    disabled={!values[t.value]?.trim()}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {quickActions.map((q) => (
          <button
            key={q.label}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <q.icon className="h-3.5 w-3.5" />
            {q.label}
          </button>
        ))}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Atualizar"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
