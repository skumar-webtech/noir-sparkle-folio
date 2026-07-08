import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoBg } from "../VideoBg";
import coding from "@/assets/coding-bg.mp4.asset.json";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    n: "01",
    t: "Full-Stack Architecture",
    d: "End-to-end system design across MERN, Next.js and Angular — from schema to deployment.",
  },
  {
    n: "02",
    t: "Real-Time Systems",
    d: "WebSockets, Firebase sync, and multi-turn chat memory for live, collaborative experiences.",
  },
  {
    n: "03",
    t: "LLM Integration",
    d: "OpenAI, Groq and Ollama wired into product flows — RAG pipelines, OCR, and streaming.",
  },
  {
    n: "04",
    t: "Cloud & DevOps",
    d: "AWS & Azure deployments, Docker, GitHub Actions and CI/CD pipelines that ship reliably.",
  },
  {
    n: "05",
    t: "PWA & Performance",
    d: "Service workers, offline-first B2B tools, and hard-earned Lighthouse scores.",
  },
  {
    n: "06",
    t: "Security & RBAC",
    d: "Role-based access, token flows, and hardened APIs for membership platforms at scale.",
  },
];

export function Coding() {
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

      gsap.from(".cap-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".cap-grid", start: "top 80%" },
      });

      gsap.from(".coding-headline .h-word", {
        yPercent: 110,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.08,
        duration: 1,
        scrollTrigger: { trigger: ".coding-headline", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden px-6 py-32 md:py-48"
    >
      <VideoBg
        ref={videoRef}
        src={coding.url}
        overlay="from-background/85 via-background/70 to-background"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs text-accent">03</span>
          <span className="h-px w-8 bg-accent" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Coding & Experience
          </span>
        </div>

        <h2 className="coding-headline font-display text-4xl font-light leading-[1] tracking-tight md:text-7xl">
          {"Where craft".split(" ").map((w, i) => (
            <span key={i} className="mr-4 inline-block overflow-hidden">
              <span className="h-word inline-block">{w}</span>
            </span>
          ))}
          <br />
          {"meets systems.".split(" ").map((w, i) => (
            <span key={i} className="mr-4 inline-block overflow-hidden">
              <span className="h-word inline-block italic text-accent">{w}</span>
            </span>
          ))}
        </h2>

        <div className="cap-grid mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div
              key={c.n}
              className="cap-card glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:border-accent/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <div className="relative">
                <div className="mb-6 font-mono text-xs text-accent">{c.n}</div>
                <h3 className="font-display text-2xl font-light leading-tight">
                  {c.t}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {c.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
