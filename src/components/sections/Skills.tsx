import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Pill = { name: string; sub?: string; glow?: boolean };

type Group = {
  label: string;
  code: string;
  tagline: string;
  pills: Pill[];
};

const groups: Group[] = [
  {
    label: "Frontend",
    code: "FE",
    tagline: "Component Architecture & PWAs",
    pills: [
      { name: "React.js", sub: "Component architecture" },
      { name: "Next.js", sub: "SSR / RSC / Edge" },
      { name: "Angular 18+", sub: "Enterprise scale" },
      { name: "TypeScript", sub: "Type-safe systems" },
      { name: "PWA", sub: "Service workers" },
      { name: "Tailwind / CSS3", sub: "Design systems" },
    ],
  },
  {
    label: "Backend",
    code: "BE",
    tagline: "Real-time sync & REST APIs",
    pills: [
      { name: "Node.js", sub: "Event-driven runtime" },
      { name: "Express.js", sub: "REST API layer" },
      { name: "WebSockets", sub: "Realtime channels" },
      { name: "Firebase RTDB", sub: "Live sync" },
      { name: "REST Design", sub: "OpenAPI / versioning" },
    ],
  },
  {
    label: "Databases",
    code: "DB",
    tagline: "Relational, document & realtime stores",
    pills: [
      { name: "MongoDB", sub: "Document store" },
      { name: "MySQL", sub: "OLTP workloads" },
      { name: "PostgreSQL", sub: "Relational + JSONB" },
      { name: "Firestore", sub: "Realtime NoSQL" },
    ],
  },
  {
    label: "AI / LLM",
    code: "AI",
    tagline: "LLM pipelines, RAG & agents",
    pills: [
      { name: "OpenAI API", sub: "GPT integrations", glow: true },
      { name: "Groq", sub: "Ultra-low latency", glow: true },
      { name: "Ollama", sub: "Local LLM runtime", glow: true },
      { name: "RAG Pipelines", sub: "Vector retrieval", glow: true },
      { name: "OCR Extraction", sub: "Doc intelligence", glow: true },
    ],
  },
  {
    label: "AI Tools",
    code: "AIT",
    tagline: "Generative AI copilots & IDE assistants",
    pills: [
      { name: "Claude", sub: "Anthropic reasoning", glow: true },
      { name: "ChatGPT", sub: "OpenAI GPT models", glow: true },
      { name: "Lovable", sub: "AI full-stack builder", glow: true },
      { name: "Gemini", sub: "Google multimodal", glow: true },
      { name: "Cursor", sub: "AI-native IDE", glow: true },
      { name: "GitHub Copilot", sub: "Inline code AI", glow: true },
      { name: "v0", sub: "UI generation", glow: true },
      { name: "Midjourney", sub: "Visual generation", glow: true },
      { name: "Perplexity", sub: "AI research", glow: true },
    ],
  },
  {
    label: "DevOps / Cloud",
    code: "OPS",
    tagline: "Ship, scale & observe",
    pills: [
      { name: "AWS (EC2)", sub: "Compute & networking" },
      { name: "Azure", sub: "Enterprise cloud" },
      { name: "Docker", sub: "Containerization" },
      { name: "GitHub Actions", sub: "CI/CD pipelines" },
      { name: "Vercel", sub: "Edge delivery" },
    ],
  },
];

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      // Pre-measure open heights to prevent layout shift jumps.
      const openHeights = panels.map((p) => {
        p.style.gridTemplateRows = "1fr";
        const h = p.getBoundingClientRect().height;
        p.style.gridTemplateRows = "0fr";
        return h;
      });

      // Initial state — all closed, all neutral.
      cards.forEach((c, i) => {
        gsap.set(c, { scale: 0.98, opacity: 0.5 });
        gsap.set(panels[i], { gridTemplateRows: "0fr" });
        c.dataset.active = "false";
      });

      const setActive = (idx: number) => {
        cards.forEach((c, i) => {
          const active = i === idx;
          if (c.dataset.active === String(active)) return;
          c.dataset.active = String(active);
          gsap.to(c, {
            scale: active ? 1.02 : 0.98,
            opacity: active ? 1 : 0.5,
            duration: 0.6,
            ease: "power3.out",
            overwrite: true,
          });
          gsap.to(panels[i], {
            gridTemplateRows: active ? "1fr" : "0fr",
            duration: 0.55,
            ease: "power3.inOut",
            overwrite: true,
          });
        });
      };

      const pin = rootRef.current!.querySelector<HTMLDivElement>(".skills-pin");
      const total = cards.length;

      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * total * 0.9}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            total - 1,
            Math.floor(self.progress * total * 0.999),
          );
          setActive(idx);
        },
      });

      return () => {
        // openHeights kept in scope; nothing else to clean.
        void openHeights;
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="skills"
      className="relative px-6 py-32 md:py-48"
    >
      <div className="skills-pin relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center">
        <div className="skills-header mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
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
            // Scroll to sequence through the stack — real-time systems, LLM
            interfaces, cloud-scale delivery.
          </p>
        </div>

        <div className="skill-grid grid gap-3">
          {groups.map((g, i) => (
            <div
              key={g.label}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-active="false"
              className="skill-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] transition-[border-color,box-shadow] duration-500 data-[active=true]:border-white/30 data-[active=true]:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_60px_-10px_oklch(0.78_0.14_78/0.15),0_20px_60px_-20px_oklch(0.78_0.14_78/0.35)]"
              style={{ backdropFilter: "blur(16px) saturate(160%)" }}
            >
              <div className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-10 md:py-6">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 group-data-[active=true]:text-accent">
                    [{g.code}]
                  </span>
                  <div className="flex flex-col">
                    <span className="font-syncopate text-lg text-white md:text-2xl">
                      {g.label.toUpperCase()}
                    </span>
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                      {g.tagline}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:inline">
                    {String(g.pills.length).padStart(2, "0")} tech
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all group-data-[active=true]:rotate-45 group-data-[active=true]:border-accent group-data-[active=true]:text-accent">
                    +
                  </span>
                </div>
              </div>

              <div
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="grid"
                style={{ gridTemplateRows: "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-2 px-6 pb-6 md:grid-cols-3 md:gap-3 md:px-10 md:pl-[6.5rem] md:pb-8">
                    {g.pills.map((p) => (
                      <div
                        key={p.name}
                        className={`group/pill flex flex-col rounded-xl border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.15] ${
                          p.glow
                            ? "border-accent/40 bg-white/[0.06] shadow-[inset_0_0_20px_-6px_oklch(0.78_0.14_78/0.4)]"
                            : "border-white/15 bg-white/[0.06]"
                        }`}
                        style={{
                          backdropFilter: "blur(8px) saturate(140%)",
                        }}
                      >
                        <span
                          className={`font-syncopate text-[11px] tracking-[0.15em] text-white md:text-xs ${
                            p.glow ? "text-accent" : ""
                          }`}
                          style={
                            p.glow
                              ? {
                                  textShadow:
                                    "0 0 14px oklch(0.78 0.14 78 / 0.6)",
                                }
                              : undefined
                          }
                        >
                          {p.name}
                        </span>
                        {p.sub && (
                          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                            {p.sub}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.78 0.14 78), transparent)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
