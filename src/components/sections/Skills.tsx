import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const groups = [
  {
    label: "Frontend",
    code: "FE",
    items: [
      "React.js",
      "Next.js",
      "Angular 18+",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "PWA / Service Workers",
    ],
  },
  {
    label: "Backend",
    code: "BE",
    items: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "Firebase (Realtime DB)",
      "WebSockets",
    ],
  },
  {
    label: "Databases",
    code: "DB",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase Firestore"],
  },
  {
    label: "AI / LLM",
    code: "AI",
    items: [
      "Groq API",
      "Ollama",
      "OpenAI / ChatGPT API",
      "LLM integration",
      "RAG pipelines",
      "OCR extraction",
    ],
  },
  {
    label: "DevOps / Cloud",
    code: "OPS",
    items: ["AWS", "Azure", "GCP", "Vercel", "Docker", "Git", "GitHub Actions"],
  },
];

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 90%",
          },
        },
      );

      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="skills"
      className="relative px-6 py-32 md:py-48"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="skills-header mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-accent">02</span>
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                Skills
              </span>
            </div>
            <h2 className="font-syncopate text-3xl font-normal leading-[1.05] text-white md:text-5xl">
              THE <span className="text-accent">TOOLKIT</span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-white/60">
            // A curated stack refined across production apps — real-time
            systems, LLM interfaces, cloud-scale delivery.
          </p>
        </div>

        <div className="skill-grid grid gap-4">
          {groups.map((g, i) => {
            const isOpen = open === i;
            return (
              <div
                key={g.label}
                className={`skill-card group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isOpen
                    ? "border-accent/50 glow-accent"
                    : "border-white/10 hover:border-white/25"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(5,5,5,0.75), rgba(5,5,5,0.55))",
                  backdropFilter: "blur(18px) saturate(160%)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-10 md:py-8"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`font-mono text-[10px] tracking-[0.3em] transition-colors ${
                        isOpen ? "text-accent" : "text-white/40"
                      }`}
                    >
                      [{g.code}]
                    </span>
                    <span className="font-syncopate text-lg text-white md:text-2xl">
                      {g.label.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:inline">
                      {String(g.items.length).padStart(2, "0")} tech
                    </span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                        isOpen
                          ? "rotate-45 border-accent text-accent"
                          : "border-white/20 text-white/60 group-hover:border-white/50 group-hover:text-white"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-2 px-6 pb-8 md:px-10 md:pl-[6.5rem]">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-accent/25 bg-accent/5 px-4 py-2 font-mono text-[11px] text-accent/90 transition hover:border-accent hover:bg-accent/15 hover:text-accent"
                          style={{
                            textShadow:
                              "0 0 12px oklch(0.78 0.14 78 / 0.4)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Neon underline sweep */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.78 0.14 78), transparent)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
