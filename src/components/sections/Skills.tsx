import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoBg } from "../VideoBg";
import fsd from "@/assets/fsd-bg.mp4.asset.json";

gsap.registerPlugin(ScrollTrigger);

const groups = [
  {
    label: "Frontend",
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
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase Firestore"],
  },
  {
    label: "AI / LLM",
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
    items: ["AWS", "Azure", "GCP", "Vercel", "Docker", "Git", "GitHub Actions"],
  },
];

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const v = videoRef.current;
      if (v) {
        v.pause();
        const onMeta = () => {
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              if (v.duration) v.currentTime = v.duration * self.progress;
            },
          });
        };
        if (v.readyState >= 1) onMeta();
        else v.addEventListener("loadedmetadata", onMeta, { once: true });
      }

      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".skill-label, .skill-chip"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="skills"
      className="relative overflow-hidden px-6 py-32 md:py-48"
    >
      <VideoBg
        ref={videoRef}
        src={fsd.url}
        overlay="from-background via-background/85 to-background"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex items-end justify-between gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs text-accent">02</span>
              <span className="h-px w-8 bg-accent" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Skills
              </span>
            </div>
            <h2 className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
              The <span className="italic text-accent">toolkit</span>.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            A curated stack, refined across production apps — from real-time
            systems to LLM-driven interfaces.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {groups.map((g) => (
            <div
              key={g.label}
              className="skill-row grid grid-cols-1 gap-6 py-8 md:grid-cols-12 md:py-10"
            >
              <div className="skill-label md:col-span-3">
                <div className="font-display text-2xl font-light md:text-3xl">
                  {g.label}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-9">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="skill-chip glass rounded-full px-4 py-2 text-xs tracking-wide text-foreground/90 transition hover:border-accent hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
