import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoBg } from "../VideoBg";
import fsd from "@/assets/fsd-bg.mp4.asset.json";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const v = videoRef.current;
      if (v) {
        v.play().catch(() => {
          /* autoplay blocked; will scrub anyway */
        });
      }

      gsap.from(".hero-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.2,
      });
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.9,
      });

      gsap.to(".hero-content", {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <VideoBg ref={videoRef} src={fsd.url} />

      <div className="hero-content relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3 hero-meta">
          <span className="h-px w-10 bg-accent" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Portfolio · 2026
          </span>
          <span className="h-px w-10 bg-accent" />
        </div>

        <h1 className="font-display text-[clamp(2.5rem,10vw,9rem)] font-light leading-[0.9] tracking-tight text-foreground">
          <span className="block overflow-hidden">
            <span className="hero-line inline-block">Saurabh Kumar</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line inline-block italic text-accent">
              Tiwari
            </span>
          </span>
        </h1>

        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-6 hero-meta">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground md:text-sm">
            Full Stack Developer
          </p>
          <span className="h-4 w-px bg-white/20" />
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground md:text-sm">
            MERN · Next · AI
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 hero-meta">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden bg-white/10">
            <div className="h-full w-full origin-top animate-[float-slow_2s_ease-in-out_infinite] bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
