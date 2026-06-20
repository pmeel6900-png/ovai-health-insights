export function Ambient() {
  const dust = Array.from({ length: 24 });
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="orb-1 pulse-glow absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(10,191,188,0.25), transparent 70%)" }}
        />
        <div
          className="orb-2 pulse-glow absolute bottom-[-150px] right-[-100px] h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%)" }}
        />
        <div
          className="orb-1 pulse-glow absolute top-1/3 right-1/4 h-[260px] w-[260px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(10,191,188,0.12), transparent 70%)" }}
        />
      </div>
      <div className="dust">
        {dust.map((_, i) => {
          const left = (i * 37) % 100;
          const top = (i * 53) % 100;
          const delay = (i * 0.7) % 10;
          const dur = 18 + (i % 7) * 3;
          const gold = i % 3 === 0;
          return (
            <span
              key={i}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                background: gold ? "#C9A84C" : "#0ABFBC",
                animationDelay: `${delay}s`,
                animationDuration: `${dur}s`,
                opacity: gold ? 0.35 : 0.4,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
