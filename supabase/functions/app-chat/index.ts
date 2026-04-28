import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function callOpenRouter(model: string, messages: any[], apiKey: string) {
  const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://aikortex.app",
      "X-Title": "Aikortex Wizard",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 600,
    }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    return { ok: false, error: `${resp.status} ${text}`, content: null };
  }
  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    return { ok: false, error: "empty content", content: null };
  }
  return { ok: true, error: null, content: content as string };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    const user = userData.user;

    let body: any;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }
    const { agent_id, user_message } = body ?? {};
    if (typeof agent_id !== "string" || typeof user_message !== "string" || !user_message.trim()) {
      return jsonResponse({ error: "Campos agent_id e user_message são obrigatórios" }, 400);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("agency_id")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile?.agency_id) {
      return jsonResponse({ error: "Profile sem agência" }, 403);
    }

    const { data: agent } = await supabase
      .from("agents")
      .select("id, agency_id, config, agent_type, name, template_id")
      .eq("id", agent_id)
      .maybeSingle();
    if (!agent) {
      return jsonResponse({ error: "Agente não encontrado" }, 404);
    }
    if (agent.agency_id !== profile.agency_id) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const config = (agent.config as any) ?? {};
    const prevMessages: { role: string; content: string }[] = Array.isArray(config.messages)
      ? config.messages
      : [];
    const currentStep: number = typeof config.wizard_step === "number" ? config.wizard_step : 1;

    const updatedMessages = [...prevMessages, { role: "user", content: user_message }];

    const systemPrompt = `Você é o assistente de configuração de agentes da Aikortex.

Tipo de agente: ${agent.agent_type}
Passo atual do wizard: ${currentStep} de 3

Os 3 passos do wizard são:
1. Descobrir — entender o objetivo do agente, público, problema que resolve.
2. Estruturar — definir nome, persona, tom de voz, conhecimento de domínio.
3. Construir — confirmar configuração final e preparar para publicação.

Conduza o usuário pelo passo atual com perguntas claras e objetivas, uma por vez.
Seja amigável, conciso, em português do Brasil.

Quando o passo atual estiver concluído e o usuário pronto para o próximo, INICIE sua resposta com a tag literal [NEXT_STEP:N] onde N é o próximo passo (2 ou 3). Exemplo: "[NEXT_STEP:2] Ótimo! Agora vamos estruturar...". Não use a tag em outras situações.

Quando o passo 3 estiver concluído, INICIE com [READY_TO_PUBLISH] sinalizando que o agente está pronto para o usuário clicar em Publicar.`;

    const openrouterKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!openrouterKey) {
      return jsonResponse({ error: "OPENROUTER_API_KEY não configurada" }, 500);
    }

    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...updatedMessages,
    ];

    let llm = await callOpenRouter("qwen/qwen3-30b-a3b", llmMessages, openrouterKey);
    if (!llm.ok) {
      console.warn("Primary model failed, trying fallback:", llm.error);
      llm = await callOpenRouter("google/gemini-2.5-flash", llmMessages, openrouterKey);
    }
    if (!llm.ok || !llm.content) {
      return jsonResponse({ error: "LLM indisponível", detail: llm.error }, 502);
    }

    let content = llm.content;
    let newStep = currentStep;
    let readyToPublish = false;

    const nextMatch = content.match(/^\[NEXT_STEP:(\d)\]\s*/);
    if (nextMatch) {
      const n = parseInt(nextMatch[1], 10);
      newStep = Math.max(1, Math.min(3, n));
      content = content.slice(nextMatch[0].length);
    }
    const readyMatch = content.match(/^\[READY_TO_PUBLISH\]\s*/);
    if (readyMatch) {
      readyToPublish = true;
      newStep = 3;
      content = content.slice(readyMatch[0].length);
    }

    const finalMessages = [...updatedMessages, { role: "assistant", content }];
    const newConfig = {
      ...config,
      messages: finalMessages,
      wizard_step: newStep,
      ready_to_publish: readyToPublish,
    };

    const { error: updateErr } = await supabase
      .from("agents")
      .update({ config: newConfig })
      .eq("id", agent_id);
    if (updateErr) {
      console.error("Failed to persist agent config:", updateErr);
    }

    return jsonResponse({
      assistant_message: content,
      wizard_step: newStep,
      ready_to_publish: readyToPublish,
    });
  } catch (e) {
    console.error("app-chat error:", e);
    return jsonResponse({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
