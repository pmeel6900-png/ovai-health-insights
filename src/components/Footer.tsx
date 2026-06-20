export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-border/40 px-6 py-10 text-center text-xs text-ivory/50 md:px-12">
      <p className="mx-auto max-w-3xl leading-relaxed">
        <span className="font-serif tracking-[0.3em] text-gold">OVAI</span> provides
        AI-generated educational insights and is not a substitute for professional medical
        advice, diagnosis, or treatment. Always consult a qualified healthcare provider with
        questions about your health.
      </p>
      <p className="mt-4 font-data tracking-widest text-ivory/30">
        © {new Date().getFullYear()} OVAI · DECODE WHAT YOUR BODY IS SAYING
      </p>
    </footer>
  );
}
