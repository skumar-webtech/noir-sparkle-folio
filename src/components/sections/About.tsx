import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const paragraph =
  "Results-driven Full Stack Developer with 3+ years of professional experience designing and delivering scalable web applications using the MERN stack, Angular, and Next.js. Built production-grade B2B PWAs, membership community platforms, and real-time chat applications. Experienced in LLM integration (OpenAI, Groq, Ollama), multi-turn chat memory, Firebase real-time sync, AWS and Microsoft Azure deployments, Docker, CI/CD pipelines, and Role-Based Access Control (RBAC).";

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-eyebrow", {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });

      gsap.to(".about-word", {
        opacity: 1,
        y: 0,
        ease: "none",
        stagger: 0.02,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.from(".about-stat", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { k: "3+", v: "Years Experience" },
    { k: "20+", v: "Projects Shipped" },
    { k: "10+", v: "Technologies" },
    { k: "∞", v: "Cups of Coffee" },
  ];

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative bg-background px-6 py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="about-eyebrow sticky top-32">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs text-accent">01</span>
              <span className="h-px w-8 bg-accent" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                About
              </span>
            </div>
            <h2 className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
              A developer who builds{" "}
              <span className="italic text-accent">with intent.</span>
            </h2>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="about-text font-display text-2xl font-light leading-[1.5] tracking-tight text-balance md:text-4xl">
            {paragraph.split(" ").map((w, i) => (
              <span
                key={i}
                className="about-word inline-block opacity-20 translate-y-2 pr-[0.25em]"
                style={{ willChange: "opacity, transform" }}
              >
                {w}
              </span>
            ))}
          </p>

          <div className="about-stats mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.v} className="about-stat">
                <div className="font-display text-4xl font-light text-accent md:text-5xl">
                  {s.k}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
