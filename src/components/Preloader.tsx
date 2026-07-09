import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  ready: boolean;
  progress: number; // 0-100 (asset load)
  onDone: () => void;
};

export function Preloader({ ready, progress, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const [display, setDisplay] = useState(0);
  const startedOut = useRef(false);

  // Reveal + infinite scanning line
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = nameRef.current?.querySelectorAll("span") ?? [];
      gsap.set(letters, { yPercent: 110, opacity: 0 });

      gsap.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        stagger: 0.035,
        delay: 0.1,
      });

      gsap.fromTo(
        scanRef.current,
        { xPercent: -100 },
        {
          xPercent: 100,
          duration: 1.4,
          ease: "power2.inOut",
          repeat: -1,
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Tween the displayed percentage toward the real progress
  useEffect(() => {
    const obj = { v: display };
    const tw = gsap.to(obj, {
      v: Math.max(display, progress),
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(obj.v)),
    });
    return () => {
      tw.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

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
    tl.to({}, { duration: 0.35 }).to(rootRef.current, {
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
      <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        [ Booting Portfolio ]
      </div>
      <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        v.2026
      </div>

      <div className="overflow-hidden px-6">
        <h1
          ref={nameRef}
          className="font-syncopate text-[clamp(1.2rem,4.6vw,3rem)] font-normal text-white"
        >
          {name.split("").map((ch, i) => (
            <span key={i} className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
      </div>

      <div className="mt-12 h-px w-[min(70vw,520px)] overflow-hidden bg-white/10">
        <div
          ref={scanRef}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>

      <div className="mt-8 flex w-[min(70vw,520px)] items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
        <span>Loading assets</span>
        <span ref={numRef} className="text-accent">
          {String(display).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
}
