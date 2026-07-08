import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoBg } from "../VideoBg";
import projectsBg from "@/assets/projects-bg.mp4.asset.json";

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

      gsap.utils.toArray<HTMLElement>(".proj-cat").forEach((cat) => {
        gsap.from(cat.querySelectorAll(".proj-card, .proj-cat-label"), {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: cat, start: "top 82%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="relative overflow-hidden px-6 py-32 md:py-48"
    >
      <VideoBg
        ref={videoRef}
        src={projectsBg.url}
        overlay="from-background via-background/75 to-background"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex items-end justify-between gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs text-accent">04</span>
              <span className="h-px w-8 bg-accent" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Projects
              </span>
            </div>
            <h2 className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
              Selected <span className="italic text-accent">work</span>.
            </h2>
          </div>
        </div>

        <div className="space-y-24">
          {categories.map((cat) => (
            <div key={cat.label} className="proj-cat">
              <div className="proj-cat-label mb-8 flex items-baseline justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-2xl font-light md:text-3xl">
                  {cat.label}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  0{cat.items.length}
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {cat.items.map((p) => (
                  <a
                    key={p.t}
                    href="#"
                    className="proj-card group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-700 hover:border-accent/50"
                  >
                    <div
                      className="absolute inset-0 opacity-70 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(135deg, oklch(0.2 0.02 260), oklch(0.12 0.01 260)), radial-gradient(circle at 30% 30%, oklch(0.75 0.15 75 / 0.3), transparent 60%)`,
                        backgroundBlendMode: "screen",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        {p.tag}
                      </span>
                      <h4 className="mt-3 font-display text-2xl font-light leading-tight md:text-3xl">
                        {p.t}
                      </h4>
                      <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100">
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
