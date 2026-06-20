import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Ambient } from "@/components/Ambient";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OVAI — Decode What Your Body Is Saying" },
      { name: "description", content: "Luxury AI women's health companion for PMOS awareness, symptom decoding, and care guidance." },
    ],
  }),
  component: Home,
});

function Home() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {!revealed && <OpeningReveal />}
      <div
        className="relative transition-opacity duration-700"
        style={{ opacity: revealed ? 1 : 0, pointerEvents: revealed ? "auto" : "none" }}
      >
        <Ambient />
        <Navbar />
        <Hero />
        <Features />
        <Stats />
        <Footer />
      </div>
    </div>
  );
}

function OpeningReveal() {
  const letters = ["O", "V", "A", "I"];
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030608]">
      <h1 className="shimmer-text font-serif text-7xl tracking-[0.4em] md:text-9xl">
        {letters.map((l, i) => (
          <span
            key={i}
            className="letter-reveal inline-block"
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            {l}
          </span>
        ))}
      </h1>
      <p
        className="fade-up mt-8 font-serif text-lg italic tracking-wider text-ivory/70 md:text-xl"
        style={{ animationDelay: "1.6s" }}
      >
        Decode What Your Body Is Saying
      </p>
      <div className="glow-in mt-12" style={{ animationDelay: "2.4s" }}>
        <span className="btn-gold pointer-events-none inline-block text-sm tracking-[0.2em]">
          BEGIN YOUR JOURNEY
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 px-6 pt-12 pb-32 md:px-12 md:pt-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="fade-up font-data text-xs tracking-[0.4em] text-teal" style={{ animationDelay: "0.1s" }}>
          POLYCYSTIC METABOLIC OVARIAN SYNDROME · AI INTELLIGENCE
        </p>
        <h1
          className="fade-up mt-8 font-serif text-5xl leading-[1.05] text-ivory md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.25s" }}
        >
          Decode what your
          <br />
          <span className="text-gradient-gold italic">body</span> is saying.
        </h1>
        <p
          className="fade-up mx-auto mt-8 max-w-2xl text-lg text-ivory/70 md:text-xl"
          style={{ animationDelay: "0.45s" }}
        >
          <span className="font-data text-teal">1 in 5 women.</span>{" "}
          <span className="font-data text-gold">70% undiagnosed.</span>{" "}
          Your answers start here.
        </p>
        <div className="fade-up mt-12 flex flex-wrap justify-center gap-4" style={{ animationDelay: "0.65s" }}>
          <Link to="/symptoms" className="btn-gold text-sm tracking-[0.2em]">
            DECODE SYMPTOMS
          </Link>
          <Link to="/chat" className="btn-ghost text-sm tracking-[0.2em]">
            TALK TO OVAI
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const cards = [
    {
      to: "/symptoms",
      title: "Symptom Decoder",
      desc: "Select what you feel. Our AI weaves your signals into a clear, structured pattern analysis.",
      glyph: "◈",
    },
    {
      to: "/care",
      title: "Care Navigator",
      desc: "A guided clinical roadmap — from first symptom log to specialist care and lifestyle support.",
      glyph: "✦",
    },
    {
      to: "/chat",
      title: "AI Health Chat",
      desc: "A private conversation with OVAI. Ask anything about hormones, cycles, and your body.",
      glyph: "✧",
    },
  ] as const;

  return (
    <section className="relative z-10 px-6 pb-24 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Link
            key={c.to}
            to={c.to}
            className="luxe-card fade-up block p-8"
            style={{ animationDelay: `${0.2 + i * 0.12}s` }}
          >
            <div className="text-3xl text-teal">{c.glyph}</div>
            <h3 className="mt-6 font-serif text-2xl text-ivory">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/65">{c.desc}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-gold">
              ENTER <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: 5, suffix: "M+", label: "Women affected globally" },
    { n: 70, suffix: "%", label: "Cases undiagnosed" },
    { n: 1, suffix: " in 5", label: "Of reproductive age" },
  ];
  return (
    <section className="relative z-10 px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-5xl gap-12 border-y border-border/40 py-16 md:grid-cols-3">
        {stats.map((s, i) => (
          <CountUp key={i} {...s} />
        ))}
      </div>
    </section>
  );
}

function CountUp({ n, suffix, label }: { n: number; suffix: string; label: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(p * n));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);
  return (
    <div className="text-center">
      <div className="font-data text-5xl text-gradient-gold md:text-6xl">
        {v}
        <span className="text-teal">{suffix}</span>
      </div>
      <div className="mt-3 text-xs tracking-[0.3em] text-ivory/60">{label.toUpperCase()}</div>
    </div>
  );
}
