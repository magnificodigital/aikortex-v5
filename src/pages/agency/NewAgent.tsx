import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Phone,
  Mic,
  ArrowUp,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "assistant" | "user"; content: string };

const steps = [
  { n: 1, label: "Descobrir" },
  { n: 2, label: "Estruturar" },
  { n: 3, label: "Construir" },
];

const navItems = ["Agente", "Integrações", "Canais"];

export default function NewAgent() {
  const navigate = useNavigate();
  const [agentType] = useState("SDR");
  const [activeStep] = useState(1);
  const [activeNav, setActiveNav] = useState("Agente");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        'Olá! Sou o seu assistente de configuração da Aikortex. Vamos criar seu agente juntos.\n\n1. Qual será o nome do seu agente? (Ex: "Alex", "Bia da Empresa X")',
    },
  ]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background px-4">
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
            <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-500">
              {agentType}
            </span>
          </div>

          <div className="mx-2 h-5 w-px bg-border" />

          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Agente de Ligação</span>
          </div>
        </div>

        <nav className="flex items-center gap-1">
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
          <button className="ml-2 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Publicar
          </button>
        </nav>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Left panel */}
        <section className="flex w-[400px] shrink-0 flex-col border-r border-border">
          {/* Progress */}
          <div className="flex items-center justify-between gap-2 border-b border-border px-6 py-3">
            {steps.map((s, i) => {
              const active = s.n === activeStep;
              return (
                <div key={s.n} className="flex flex-1 items-center gap-2">
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border text-[11px]",
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
                      active
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
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
          <div className="flex-1 overflow-y-auto bg-background px-5 py-6">
            <div className="space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
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
          </div>

          {/* Input */}
          <div className="border-t border-border bg-background p-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Digite sua resposta..."
                className="flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Microfone"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
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
              Agente de Ligação
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center px-6">
            <div className="flex max-w-md flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Phone className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Configure seu agente de Ligação
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Para usar o modo de voz, configure sua chave de API da
                ElevenLabs nas Integrações.
              </p>
              <button
                onClick={() => setActiveNav("Integrações")}
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Settings2 className="h-4 w-4" />
                Ir para Integrações
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
