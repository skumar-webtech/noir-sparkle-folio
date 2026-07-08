import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
          onDone();
        },
      });

      const letters = nameRef.current?.querySelectorAll("span") ?? [];
      gsap.set(letters, { yPercent: 110, opacity: 0 });

      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.04,
      })
        .to(
          barRef.current,
          { scaleX: 1, duration: 1.4, ease: "power2.inOut" },
          "-=0.7",
        )
        .to({}, { duration: 0.3 })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
        });
    }, rootRef);
    return () => ctx.revert();
  }, [onDone]);

  if (gone) return null;

  const name = "SAURABH KUMAR TIWARI";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="overflow-hidden">
        <h1
          ref={nameRef}
          className="font-display text-[clamp(1.8rem,6vw,4.5rem)] font-light tracking-[0.15em] text-foreground"
        >
          {name.split("").map((ch, i) => (
            <span key={i} className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
      </div>
      <div className="mt-10 h-px w-[min(60vw,420px)] overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-accent"
        />
      </div>
      <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Full Stack Developer
      </p>
    </div>
  );
}
