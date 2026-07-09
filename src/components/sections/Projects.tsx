import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    label: "3D Projects",
    items: [
      { t: "Immersive Product Configurator", tag: "Three.js · WebGL" },
      { t: "Interactive Brand Universe", tag: "React Three Fiber" },
    ],
  },
  {
    label: "Landing Pages",
    items: [
      { t: "SaaS Launch Suite", tag: "Next.js · GSAP" },
      { t: "Agency Portfolio", tag: "Framer Motion" },
    ],
  },
  {
    label: "Animated Websites",
    items: [
      { t: "Scroll-Driven Editorial", tag: "GSAP ScrollTrigger" },
      { t: "Kinetic Type Playground", tag: "Motion One" },
    ],
  },
  {
    label: "Ecommerce Websites",
    items: [
      { t: "Fashion PWA Storefront", tag: "Next.js · Stripe" },
      { t: "B2B Wholesale Portal", tag: "MERN · RBAC" },
    ],
  },
];

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".proj-cat").forEach((cat) => {
        gsap.fromTo(
          cat.querySelectorAll(".proj-card, .proj-cat-label"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: cat, start: "top 90%" },
          },
        );
      });

      gsap.fromTo(
        ".projects-header",
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
      id="projects"
      className="relative px-6 py-32 md:py-48"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="projects-header mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs text-accent">04</span>
            <span className="h-px w-8 bg-accent" />
            <span className="track-wide text-[10px] uppercase text-white/60">
              Projects
            </span>
          </div>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            Selected <span className="italic text-accent">work</span>.
          </h2>
        </div>

        <div className="space-y-24">
          {categories.map((cat) => (
            <div key={cat.label} className="proj-cat">
              <div className="proj-cat-label mb-8 flex items-baseline justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-2xl font-light text-white md:text-3xl">
                  {cat.label}
                </h3>
                <span className="font-mono text-xs text-white/50">
                  0{cat.items.length}
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {cat.items.map((p) => (
                  <a
                    key={p.t}
                    href="#"
                    className="proj-card group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.015] hover:border-accent/60 hover:glow-accent"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(5,5,5,0.75), rgba(5,5,5,0.55))",
                      backdropFilter: "blur(18px) saturate(160%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-70 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 30%, oklch(0.78 0.14 78 / 0.28), transparent 60%), linear-gradient(135deg, oklch(0.14 0.03 260), oklch(0.05 0 0))`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        {p.tag}
                      </span>
                      <h4 className="mt-3 font-syncopate text-lg font-normal leading-tight text-white md:text-xl">
                        {p.t.toUpperCase()}
                      </h4>
                      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100">
                        View Case <span>→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
