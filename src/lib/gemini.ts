// NOTE: API key in frontend per explicit user request.
export const GEMINI_KEY = "AQ.Ab8RN6IhRvJNFQGyVFzRI8ynRxlaHaKL_Q3il9zSUM3r57zlKQ";

const ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export type ChatMsg = { role: "user" | "model"; text: string };

export async function geminiChat(messages: ChatMsg[], system?: string): Promise<string> {
  const body: any = {
    contents: messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    })),
  };
  if (system) {
    body.systemInstruction = { parts: [{ text: system }] };
  }

  const res = await fetch(`${ENDPOINT}?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Gemini error ${res.status}: ${t.slice(0, 200)}`);
  }
  const json = await res.json();
  return json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response.";
}

export const OVAI_SYSTEM = `You are OVAI, a luxury women's health AI assistant specializing in PMOS (Polycystic Metabolic Ovarian Syndrome) and related conditions. You speak with warmth, clarity, and clinical precision. Always:
- Use markdown formatting with clear headings and bullet points.
- Be empathetic but evidence-informed.
- Never diagnose; always encourage consulting a healthcare provider.
- Keep responses focused, structured, and elegant.`;

export async function analyzeSymptoms(symptoms: string[], details: string): Promise<string> {
  const prompt = `Analyze these reported symptoms for a woman concerned about PMOS (Polycystic Metabolic Ovarian Syndrome):

Selected symptoms: ${symptoms.join(", ") || "none selected"}
Additional context: ${details || "none provided"}

Respond in markdown with EXACTLY these sections as ## headings:
## Pattern Analysis
## Risk Consideration
## Key Concerns
## Lifestyle Steps
## When to Seek Care

Be concise, structured, and supportive. Never diagnose — frame insights as patterns to discuss with a clinician.`;

  return geminiChat([{ role: "user", text: prompt }], OVAI_SYSTEM);
}
