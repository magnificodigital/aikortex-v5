import { useState } from "react";
import { Bot, Workflow, AppWindow, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

const tabs = [
  { value: "app", label: "App", icon: AppWindow, placeholder: "Descreva o app que quer criar..." },
  { value: "agent", label: "Agente", icon: Bot, placeholder: "Descreva o agente que quer criar..." },
  { value: "flow", label: "Flow", icon: Workflow, placeholder: "Descreva o flow que quer criar..." },
];

const quickActions = [
  { title: "Criar Agente", description: "Configure um novo agente de IA", icon: Bot },
  { title: "Criar Flow", description: "Monte um fluxo automatizado", icon: Workflow },
  { title: "Criar App", description: "Construa uma aplicação completa", icon: AppWindow },
];

export default function AgencyHome() {
  const { profile } = useAuth();
  const [values, setValues] = useState<Record<string, string>>({ app: "", agent: "", flow: "" });
  const name = profile?.full_name?.split(" ")[0] ?? "";

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="text-3xl font-semibold text-white">
        {greeting()}{name ? `, ${name}` : ""}
      </h1>
      <p className="mt-1 text-sm text-neutral-400">O que vamos construir hoje?</p>

      <div className="mt-8 rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
        <Tabs defaultValue="app">
          <TabsList className="bg-[#1a1a1a]">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="data-[state=active]:bg-[#22c55e] data-[state=active]:text-black"
              >
                <t.icon className="mr-2 h-4 w-4" />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value} className="mt-4 space-y-3">
              <Textarea
                placeholder={t.placeholder}
                value={values[t.value]}
                onChange={(e) => setValues((v) => ({ ...v, [t.value]: e.target.value }))}
                className="min-h-[120px] border-[#1f1f1f] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:ring-[#22c55e]"
              />
              <div className="flex justify-end">
                <Button className="bg-[#22c55e] text-black hover:bg-[#22c55e]/90">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Criar com IA
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {quickActions.map((q) => (
          <button
            key={q.title}
            className="group rounded-xl border border-[#1f1f1f] bg-[#111111] p-5 text-left transition-colors hover:border-[#22c55e]/50"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
              <q.icon className="h-5 w-5" />
            </div>
            <div className="text-sm font-medium text-white">{q.title}</div>
            <div className="mt-1 text-xs text-neutral-400">{q.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
