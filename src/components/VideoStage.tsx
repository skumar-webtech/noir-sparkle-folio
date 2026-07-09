import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fsd from "@/assets/fsd-bg.mp4.asset.json";
import coding from "@/assets/coding-bg.mp4.asset.json";
import projects from "@/assets/projects-bg.mp4.asset.json";

gsap.registerPlugin(ScrollTrigger);

type Stage = {
  key: "fsd" | "coding" | "projects";
  src: string;
  triggerId: string;
};

const stages: Stage[] = [
  { key: "fsd", src: fsd.url, triggerId: "stage-fsd" },
  { key: "coding", src: coding.url, triggerId: "stage-coding" },
  { key: "projects", src: projects.url, triggerId: "stage-projects" },
];

type Props = { onReady: () => void };

export function VideoStage({ onReady }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [loaded, setLoaded] = useState(0);

  // Preload all three videos before signalling ready to prevent flashing.
  useEffect(() => {
    let done = 0;
    const total = stages.length;
    const onOne = () => {
      done += 1;
      setLoaded(done);
      if (done >= total) onReady();
    };

    const cleanups: Array<() => void> = [];
    stages.forEach((s) => {
      const v = videoRefs.current[s.key];
      if (!v) return;
      if (v.readyState >= 3) {
        onOne();
      } else {
        const h = () => onOne();
        v.addEventListener("canplaythrough", h, { once: true });
        // Safety fallback in case canplaythrough never fires.
        const t = window.setTimeout(h, 4000);
        cleanups.push(() => {
          v.removeEventListener("canplaythrough", h);
          window.clearTimeout(t);
        });
        v.load();
      }
    });

    return () => cleanups.forEach((c) => c());
  }, [onReady]);

  // Wire scroll scrubbing + opacity crossfades.
  useEffect(() => {
    if (loaded < stages.length) return;

    const ctx = gsap.context(() => {
      stages.forEach((s) => {
        const v = videoRefs.current[s.key];
        const trigger = document.getElementById(s.triggerId);
        if (!v || !trigger) return;
        v.pause();

        // Scrub playback with scroll through the whole stage.
        ScrollTrigger.create({
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            if (!v.duration || !Number.isFinite(v.duration)) return;
            const t = v.duration * self.progress;
            // Only assign when meaningfully different — reduces jitter.
            if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
          },
        });

        // Crossfade — visible only while the stage overlaps the viewport.
        gsap.set(v.parentElement, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () =>
            gsap.to(v.parentElement, {
              autoAlpha: 1,
              duration: 0.9,
              ease: "power2.out",
              overwrite: true,
            }),
          onEnterBack: () =>
            gsap.to(v.parentElement, {
              autoAlpha: 1,
              duration: 0.9,
              ease: "power2.out",
              overwrite: true,
            }),
          onLeave: () =>
            gsap.to(v.parentElement, {
              autoAlpha: 0,
              duration: 0.9,
              ease: "power2.out",
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(v.parentElement, {
              autoAlpha: 0,
              duration: 0.9,
              ease: "power2.out",
              overwrite: true,
            }),
        });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "#050505" }}
    >
      {stages.map((s) => (
        <div
          key={s.key}
          className="absolute inset-0"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <video
            ref={(el) => {
              videoRefs.current[s.key] = el;
            }}
            src={s.src}
            muted
            playsInline
            preload="auto"
            // Some browsers refuse to buffer without a play() attempt.
            // Explicitly pause after; scrubbing handles the frames.
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.7) 55%, rgba(5,5,5,0.92) 100%), linear-gradient(180deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.4) 40%, rgba(5,5,5,0.75) 100%)",
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 grain" />
    </div>
  );
}
