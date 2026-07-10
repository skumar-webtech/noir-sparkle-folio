import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.set(letters, { yPercent: 120, opacity: 0 });
      gsap.set(".hero-meta", { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.035,
      })
        .to(
          ".hero-meta",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.7",
        );

      gsap.to(".hero-content", {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const first = "SAURABH KUMAR";
  const last = "TIWARI";

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex h-screen items-center justify-center"
    >
      <div className="hero-content relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3 hero-meta">
          <span className="h-px w-10 bg-accent" />
          <span className="track-wide text-[10px] uppercase text-white/60">
            Portfolio · 2026
          </span>
          <span className="h-px w-10 bg-accent" />
        </div>

        <h1 className="font-syncopate text-[clamp(1.1rem,6.2vw,6rem)] font-normal leading-[1.05] text-white">
          <span className="block overflow-hidden whitespace-nowrap">
            {first.split("").map((ch, i) => (
              <span
                key={`f-${i}`}
                className="hero-letter inline-block will-change-transform"
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden whitespace-nowrap text-accent">
            {last.split("").map((ch, i) => (
              <span
                key={`l-${i}`}
                className="hero-letter inline-block will-change-transform"
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-6 hero-meta">
          <p className="track-wide text-xs uppercase text-white/70 md:text-sm">
            Full Stack Developer
          </p>
          <span className="hidden h-4 w-px bg-white/20 md:block" />
          <p className="track-wide text-xs uppercase text-white/70 md:text-sm">
            MERN · Next · AI
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 hero-meta">
        <div className="flex flex-col items-center gap-3">
          <span className="track-wide text-[10px] uppercase text-white/60">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden bg-white/15">
            <div className="h-full w-full origin-top animate-[float-slow_2s_ease-in-out_infinite] bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
