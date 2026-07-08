import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  ready: boolean;
  onDone: () => void;
};

export function Preloader({ ready, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const startedOut = useRef(false);

  // Reveal animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = nameRef.current?.querySelectorAll("span") ?? [];
      gsap.set(letters, { yPercent: 110, opacity: 0 });
      gsap.set(barRef.current, { scaleX: 0 });

      const tl = gsap.timeline();
      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.04,
      }).to(
        barRef.current,
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        "-=0.6",
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Exit only after ready
  useEffect(() => {
    if (!ready || startedOut.current) return;
    startedOut.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
        onDone();
      },
    });
    tl.to({}, { duration: 0.25 }).to(rootRef.current, {
      yPercent: -100,
      duration: 1.1,
      ease: "expo.inOut",
    });
  }, [ready, onDone]);

  if (gone) return null;

  const name = "SAURABH KUMAR TIWARI";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#050505" }}
    >
      <div className="overflow-hidden">
        <h1
          ref={nameRef}
          className="track-wide font-display text-[clamp(1.8rem,6vw,4.5rem)] font-light text-white"
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
      <p className="track-wide mt-6 text-[10px] uppercase text-white/50">
        {ready ? "Full Stack Developer" : "Loading experience…"}
      </p>
    </div>
  );
}
