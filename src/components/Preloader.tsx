import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  ready: boolean;
  progress: number; // 0-100 (asset load)
  onDone: () => void;
};

const BOOT_PHRASES = [
  "Initializing environment...",
  "Connecting to servers...",
  "Waking up AI agents...",
  "Compiling liquid glass...",
  "Loading assets...",
];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}

// Scramble an element's text toward its target string.
function scrambleTo(el: HTMLElement, target: string, duration = 1.2) {
  const obj = { p: 0 };
  const startChars = target.split("").map(() =>
    SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
  );
  return gsap.to(obj, {
    p: 1,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const revealCount = Math.floor(obj.p * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < revealCount) {
          out += target[i];
        } else if (target[i] === " ") {
          out += " ";
        } else {
          out +=
            SCRAMBLE_CHARS[
              (Math.floor(Math.random() * SCRAMBLE_CHARS.length) + i) %
                SCRAMBLE_CHARS.length
            ];
        }
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = target;
    },
  });
}

export function Preloader({ ready, progress, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const startedOut = useRef(false);
  const displayedProgress = useRef(0);
  const mountedAt = useRef(Date.now());

  // Entrance: scramble greeting + name
  useEffect(() => {
    const ctx = gsap.context(() => {
      const greeting = getGreeting();
      const name = "SAURABH KUMAR TIWARI";

      if (greetingRef.current) {
        greetingRef.current.textContent = "";
        gsap.set(greetingRef.current, { opacity: 0, y: 10 });
        gsap.to(greetingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
          onStart: () => {
            if (greetingRef.current)
              scrambleTo(greetingRef.current, greeting, 0.9);
          },
        });
      }

      if (nameRef.current) {
        nameRef.current.textContent = "";
        gsap.set(nameRef.current, { opacity: 0, y: 20 });
        gsap.to(nameRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.55,
          onStart: () => {
            if (nameRef.current) scrambleTo(nameRef.current, name, 1.3);
          },
        });
      }

      gsap.from(".pre-meta", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.9,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Cycle boot phrases every 500ms
  useEffect(() => {
    let i = 0;
    const el = phraseRef.current;
    if (!el) return;
    el.textContent = BOOT_PHRASES[0];
    const id = window.setInterval(() => {
      i = (i + 1) % BOOT_PHRASES.length;
      gsap.to(el, {
        opacity: 0,
        y: -6,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = BOOT_PHRASES[i];
          gsap.fromTo(
            el,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
          );
        },
      });
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  // Smooth progress bar tween — combines real progress + a minimum time floor
  useEffect(() => {
    const MIN_MS = 2500;
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - mountedAt.current;
      const timeFloor = Math.min(100, (elapsed / MIN_MS) * 100);
      const target = ready ? 100 : Math.min(progress, 92);
      const goal = Math.max(target, timeFloor * (ready ? 1 : 0.95));
      displayedProgress.current += (goal - displayedProgress.current) * 0.12;
      const v = Math.min(100, displayedProgress.current);
      if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      if (percentRef.current)
        percentRef.current.textContent = String(Math.round(v)).padStart(3, "0");
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, progress]);

  // Exit when ready + min duration elapsed
  useEffect(() => {
    if (!ready || startedOut.current) return;
    const elapsed = Date.now() - mountedAt.current;
    const wait = Math.max(0, 2500 - elapsed);
    const t = window.setTimeout(() => {
      if (startedOut.current) return;
      startedOut.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
          onDone();
        },
      });
      tl.to(".pre-fade", {
        opacity: 0,
        y: -8,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.03,
      }).to(
        rootRef.current,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "-=0.1",
      );
    }, wait);
    return () => window.clearTimeout(t);
  }, [ready, onDone]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ background: "#050505" }}
    >
      <div className="pre-fade pre-meta absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        [ Booting Portfolio ]
      </div>
      <div className="pre-fade pre-meta absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        v.2026
      </div>

      <div className="pre-fade flex w-full max-w-[92vw] flex-col items-center text-center">
        <div
          ref={greetingRef}
          className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent sm:text-xs"
        />

        <h1
          ref={nameRef}
          className="font-syncopate mt-5 whitespace-nowrap font-normal text-white"
          style={{ fontSize: "clamp(1rem, 5.2vw, 3.25rem)" }}
        />

        <div className="pre-meta mt-10 h-[2px] w-[min(80vw,560px)] overflow-hidden rounded-full bg-white/8">
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full bg-accent"
            style={{
              transform: "scaleX(0)",
              boxShadow:
                "0 0 12px oklch(0.78 0.14 78 / 0.9), 0 0 28px oklch(0.78 0.14 78 / 0.5)",
            }}
          />
        </div>

        <div className="pre-meta mt-4 flex w-[min(80vw,560px)] items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
          <div ref={phraseRef} className="text-white/70" />
          <span ref={percentRef} className="text-accent">
            000%
          </span>
        </div>
      </div>
    </div>
  );
}
