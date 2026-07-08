import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const groups = [
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Angular 18+", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "PWA / Service Workers"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST API Design", "Firebase (Realtime DB)", "WebSockets"],
  },
  { label: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase Firestore"] },
  {
    label: "AI / LLM",
    items: ["Groq API", "Ollama", "OpenAI / ChatGPT API", "LLM integration", "RAG pipelines", "OCR extraction"],
  },
  {
    label: "DevOps / Cloud",
    items: ["AWS", "Azure", "GCP", "Vercel", "Docker", "Git", "GitHub Actions"],
  },
];

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".skill-label, .skill-chip"), {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });

      gsap.from(".skills-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });
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
              <span className="text-xs text-accent">02</span>
              <span className="h-px w-8 bg-accent" />
              <span className="track-wide text-[10px] uppercase text-white/60">
                Skills
              </span>
            </div>
            <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
              The <span className="italic text-accent">toolkit</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white/60">
            A curated stack, refined across production apps — from real-time
            systems to LLM-driven interfaces.
          </p>
        </div>

        <div className="glass-strong overflow-hidden rounded-3xl">
          <div className="divide-y divide-white/10">
            {groups.map((g) => (
              <div
                key={g.label}
                className="skill-row grid grid-cols-1 gap-6 p-8 md:grid-cols-12 md:p-10"
              >
                <div className="skill-label md:col-span-3">
                  <div className="font-display text-2xl font-light text-white md:text-3xl">
                    {g.label}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:col-span-9">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="skill-chip rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-wide text-white/90 transition hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
