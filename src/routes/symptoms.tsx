import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/Navbar";
import { Ambient } from "@/components/Ambient";
import { Footer } from "@/components/Footer";
import { analyzeSymptoms } from "@/lib/gemini";

export const Route = createFileRoute("/symptoms")({
  head: () => ({
    meta: [
      { title: "Symptom Decoder · OVAI" },
      { name: "description", content: "Select your symptoms and receive an AI-powered pattern analysis from OVAI." },
    ],
  }),
  component: Symptoms,
});

const SYMPTOMS = [
  "Irregular Periods", "Weight Gain", "Facial Hair", "Hair Thinning",
  "Acne", "Fatigue", "Mood Swings", "Pelvic Pain",
  "Sleep Issues", "Anxiety", "Dark Skin Patches", "Bloating",
  "Heavy Bleeding", "Sugar Cravings", "Headaches", "Difficulty Conceiving",
];

function Symptoms() {
  const [selected, setSelected] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const analyze = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const r = await analyzeSymptoms(selected, details);
      setResult(r);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <Ambient />
      <Navbar />
      <main className="relative z-10 px-6 pt-12 pb-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="font-data text-xs tracking-[0.4em] text-teal">SYMPTOM DECODER</p>
          <h1 className="mt-4 font-serif text-4xl text-ivory md:text-6xl">
            What is your body <span className="italic text-gradient-gold">whispering</span>?
          </h1>
          <p className="mt-4 text-ivory/65">
            Select every symptom you've noticed. The more honest, the clearer the pattern.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {SYMPTOMS.map((s) => (
              <button
                key={s}
                onClick={() => toggle(s)}
                className={`chip ${selected.includes(s) ? "active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <label className="font-data text-xs tracking-[0.3em] text-ivory/60">
              ADDITIONAL CONTEXT
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              placeholder="Cycle length, when symptoms began, family history, anything else…"
              className="mt-2 w-full rounded-xl border border-border bg-card p-4 text-ivory placeholder:text-ivory/30 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            />
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={analyze}
              disabled={loading || selected.length === 0}
              className="btn-gold text-sm tracking-[0.2em]"
            >
              {loading ? "ANALYZING…" : "ANALYZE"}
            </button>
            {selected.length > 0 && (
              <button onClick={() => setSelected([])} className="text-xs tracking-widest text-ivory/50 hover:text-teal">
                CLEAR
              </button>
            )}
          </div>

          {error && (
            <div className="mt-8 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {result && (
            <div className="fade-up luxe-card mt-12 p-8 md:p-10">
              <div className="font-data text-xs tracking-[0.4em] text-gold">OVAI ANALYSIS</div>
              <div className="prose-ovai mt-4">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
              <p className="mt-8 border-t border-border/40 pt-4 text-xs text-ivory/40">
                Educational insight only. Please discuss with a qualified healthcare provider.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
