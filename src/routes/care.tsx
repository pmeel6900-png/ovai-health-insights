import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Ambient } from "@/components/Ambient";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/care")({
  head: () => ({
    meta: [
      { title: "Care Navigator · OVAI" },
      { name: "description", content: "A guided roadmap for PMOS care — from symptom tracking through specialist treatment and mental health support." },
    ],
  }),
  component: Care,
});

const STEPS = [
  { glyph: "✦", title: "Track Symptoms", desc: "Begin a 60-day log of cycle, mood, energy, skin, and weight. Patterns reveal themselves." },
  { glyph: "◈", title: "See a Gynecologist", desc: "Bring your log. Request a clinical evaluation focused on PMOS criteria and family history." },
  { glyph: "✧", title: "Blood Tests", desc: "Hormonal panel: LH, FSH, testosterone, AMH, prolactin, TSH, fasting insulin, HbA1c, lipid profile." },
  { glyph: "❖", title: "Ultrasound", desc: "Transvaginal ultrasound to evaluate ovarian morphology and endometrial lining." },
  { glyph: "❉", title: "Lifestyle Changes", desc: "Strength training, low-glycemic nutrition, sleep hygiene, stress reduction — the foundation of every treatment plan." },
  { glyph: "✺", title: "Treatment Options", desc: "Inositol, metformin, hormonal regulation, anti-androgens, fertility support — personalized to your goals." },
  { glyph: "✶", title: "Mental Health Support", desc: "Therapy, community, and tools for anxiety and body image — care that honors the whole woman." },
];

function Care() {
  return (
    <div className="relative min-h-screen bg-background">
      <Ambient />
      <Navbar />
      <main className="relative z-10 px-6 pt-12 pb-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="font-data text-xs tracking-[0.4em] text-teal">CARE NAVIGATOR</p>
          <h1 className="mt-4 font-serif text-4xl text-ivory md:text-6xl">
            Your <span className="italic text-gradient-gold">roadmap</span>, illuminated.
          </h1>
          <p className="mt-4 max-w-2xl text-ivory/65">
            A clear, clinical path from the first signal to whole-person care.
          </p>

          <div className="relative mt-16 pl-12 md:pl-16">
            <TimelineLine />
            <div className="space-y-12">
              {STEPS.map((s, i) => (
                <Step key={i} index={i + 1} {...s} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current?.parentElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const visible = Math.max(0, Math.min(total, vh - rect.top));
      setH((visible / total) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border/40 md:left-6" />
      <div
        ref={ref}
        className="absolute left-4 top-0 w-px md:left-6"
        style={{
          height: `${h}%`,
          background: "linear-gradient(180deg, #0ABFBC, #C9A84C)",
          boxShadow: "0 0 12px rgba(10,191,188,0.6)",
          transition: "height 0.2s linear",
        }}
      />
    </>
  );
}

function Step({ index, glyph, title, desc }: { index: number; glyph: string; title: string; desc: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <div className="absolute -left-12 top-0 grid h-9 w-9 place-items-center rounded-full border border-teal bg-background text-teal shadow-teal md:-left-14 md:h-11 md:w-11">
        <span className="text-lg">{glyph}</span>
      </div>
      <div className="luxe-card p-6 md:p-8">
        <div className="font-data text-xs tracking-[0.3em] text-gold">STEP {String(index).padStart(2, "0")}</div>
        <h3 className="mt-2 font-serif text-2xl text-ivory">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ivory/70">{desc}</p>
      </div>
    </div>
  );
}
