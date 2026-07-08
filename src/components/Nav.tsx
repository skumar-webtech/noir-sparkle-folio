import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[55] transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-6 ${
          scrolled ? "mx-4 rounded-full px-5 py-2.5 md:mx-6" : ""
        }`}
        style={
          scrolled
            ? {
                background: "rgba(5, 5, 5, 0.6)",
                backdropFilter: "blur(10px) saturate(160%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }
            : undefined
        }
      >
        <a
          href="#top"
          className="track-wide font-display text-sm text-white"
        >
          SKT<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="track-wide group relative text-xs uppercase text-white/60 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="track-wide hidden rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase text-white transition-all hover:border-accent hover:text-accent md:inline-block"
        >
          Let's Talk
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-white transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div
          className="mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
          style={{
            background: "rgba(5, 5, 5, 0.75)",
            backdropFilter: "blur(10px) saturate(160%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="track-wide rounded-lg px-3 py-3 text-xs uppercase text-white/70 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
