import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/Navbar";
import { Ambient } from "@/components/Ambient";
import { Footer } from "@/components/Footer";
import { geminiChat, OVAI_SYSTEM, type ChatMsg } from "@/lib/gemini";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat · OVAI" },
      { name: "description", content: "Have a private conversation with OVAI about your body, cycles, and PMOS." },
    ],
  }),
  component: Chat,
});

const SUGGESTIONS = [
  "What is PMOS?",
  "How is PMOS diagnosed?",
  "Best foods for hormonal balance?",
  "Can PMOS affect fertility?",
];

function Chat() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text: string) => {
    const userMsg: ChatMsg = { role: "user", text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setStreaming("");
    try {
      const reply = await geminiChat(next, OVAI_SYSTEM);
      // typewriter effect
      let i = 0;
      const step = Math.max(1, Math.floor(reply.length / 200));
      await new Promise<void>((resolve) => {
        const id = setInterval(() => {
          i += step;
          if (i >= reply.length) {
            setStreaming(reply);
            clearInterval(id);
            resolve();
          } else {
            setStreaming(reply.slice(0, i));
          }
        }, 18);
      });
      setMessages([...next, { role: "model", text: reply }]);
      setStreaming("");
    } catch (e: any) {
      setMessages([...next, { role: "model", text: `*Error: ${e?.message ?? "failed"}*` }]);
    } finally {
      setLoading(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    send(input.trim());
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Ambient />
      <Navbar />
      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pt-8 pb-6 md:px-12">
        <div className="mb-6">
          <p className="font-data text-xs tracking-[0.4em] text-teal">OVAI · TERMINAL</p>
          <h1 className="mt-2 font-serif text-3xl text-ivory md:text-4xl">
            Ask. <span className="italic text-gradient-gold">Listen.</span>
          </h1>
        </div>

        <div className="luxe-card flex-1 overflow-hidden p-0">
          <div className="h-[55vh] space-y-5 overflow-y-auto p-6 md:p-8">
            {messages.length === 0 && !streaming && (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <div className="font-serif text-5xl text-gradient-gold">OVAI</div>
                  <p className="mt-3 text-sm text-ivory/50">Start the conversation below.</p>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} />
            ))}
            {streaming && <Bubble msg={{ role: "model", text: streaming }} caret />}
            {loading && !streaming && (
              <div className="text-xs tracking-widest text-teal/70">OVAI IS THINKING…</div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border/40 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => !loading && send(s)}
                  className="chip text-xs"
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 rounded-full border border-border bg-background/60 px-5 py-3 text-ivory placeholder:text-ivory/30 focus:border-teal focus:outline-none"
              />
              <button type="submit" disabled={loading || !input.trim()} className="btn-gold text-xs tracking-[0.2em]">
                SEND
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Bubble({ msg, caret }: { msg: ChatMsg; caret?: boolean }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-5 py-3 ${
          isUser
            ? "border border-gold/40 bg-gold/10 text-ivory"
            : "border border-teal/20 bg-background/60 text-ivory"
        }`}
      >
        <div className={`mb-1 font-data text-[10px] tracking-[0.3em] ${isUser ? "text-gold" : "text-teal"}`}>
          {isUser ? "YOU" : "OVAI"}
        </div>
        <div className={`prose-ovai text-sm ${caret ? "caret" : ""}`}>
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
