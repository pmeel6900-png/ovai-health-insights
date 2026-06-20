import { Link } from "@tanstack/react-router";

export function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/symptoms", label: "Symptoms" },
    { to: "/care", label: "Care" },
    { to: "/chat", label: "Chat" },
  ] as const;

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12">
      <Link to="/" className="font-serif text-2xl tracking-[0.25em] text-ivory">
        <span className="text-gradient-gold">OV</span>
        <span className="text-teal">AI</span>
      </Link>
      <div className="flex items-center gap-2 md:gap-6">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-sm tracking-wide text-ivory/70 transition-colors hover:text-teal [&.active]:text-teal"
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
