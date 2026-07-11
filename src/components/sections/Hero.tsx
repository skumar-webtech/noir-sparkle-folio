import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  "Architecting Scalable Systems",
  "Integrating AI Solutions",
  "Crafting Premium Web Experiences",
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.set(letters, { y: 50, opacity: 0 });
      gsap.set(".hero-meta", { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.05,
      }).to(
        ".hero-meta",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.6",
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

  // Typewriter loop
  useEffect(() => {
    const full = PHRASES[phraseIdx];
    if (!deleting && typed === full) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
      return;
    }
    const t = setTimeout(
      () => {
        setTyped((prev) =>
          deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1),
        );
      },
      deleting ? 35 : 60,
    );
    return () => clearTimeout(t);
  }, [typed, deleting, phraseIdx]);

  const first = "SAURABH KUMAR";
  const last = "TIWARI";

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Gradient blend into next section */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="hero-content relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* Glassmorphism pill */}
        <div className="mb-8 flex justify-center hero-meta">
          <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md">
            <span className="track-wide relative z-10 text-[10px] uppercase text-white/80 md:text-xs">
              Full Stack Developer · MERN • Next • AI
            </span>
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-[shimmer_3s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        <h1 className="font-syncopate font-normal leading-[1.05] text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem]">
          <span className="block overflow-hidden">
            <span className="inline-block whitespace-nowrap">
              {first.split("").map((ch, i) => (
                <span
                  key={`f-${i}`}
                  className="hero-letter inline-block will-change-transform"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </span>
          <span className="block overflow-hidden text-accent">
            <span className="inline-block whitespace-nowrap">
              {last.split("").map((ch, i) => (
                <span
                  key={`l-${i}`}
                  className="hero-letter inline-block will-change-transform"
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <div className="mt-8 flex min-h-[1.8em] items-center justify-center hero-meta">
          <p className="track-wide text-sm uppercase text-white/75 md:text-base">
            <span>{typed}</span>
            <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent align-middle" />
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 hero-meta">
        <div className="flex flex-col items-center gap-3">
          <span className="track-wide text-[10px] uppercase text-white/60">
            Scroll
          </span>
          <div className="relative h-16 w-px overflow-hidden bg-white/10">
            <span className="absolute left-0 top-0 h-1/3 w-full animate-[scroll-line_2s_ease-in-out_infinite] bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
