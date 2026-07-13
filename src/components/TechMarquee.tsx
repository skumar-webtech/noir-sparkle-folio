import {
  siAngular,
  siCloudflare,
  siDocker,
  siExpress,
  siFirebase,
  siGit,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTypescript,
} from "simple-icons";

const stack = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Angular", icon: siAngular },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress },
  { name: "TypeScript", icon: siTypescript },
  { name: "MongoDB", icon: siMongodb },
  { name: "Firebase", icon: siFirebase },
  { name: "AWS", icon: siCloudflare },
  { name: "Docker", icon: siDocker },
  { name: "Git", icon: siGit },
];

export function TechMarquee() {
  const row = [...stack, ...stack];
  return (
    <section
      aria-label="Tech stack"
      className="relative z-10 w-full overflow-hidden border-y border-white/5 bg-black/20 py-10 backdrop-blur-sm"
    >
      <div className="mb-6 flex items-center justify-center gap-3 px-6">
        <span className="h-px w-10 bg-accent" />
        <span className="track-wide text-[10px] uppercase text-white/60">
          Tech Stack
        </span>
        <span className="h-px w-10 bg-accent" />
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max gap-16 will-change-transform">
          {row.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="group flex shrink-0 items-center gap-4 px-4"
            >
              <img
                src={`data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="${s.icon.path}"/></svg>`,
                )}`}
                alt={s.name}
                loading="lazy"
                className="h-9 w-9 opacity-70 transition-all duration-500 group-hover:opacity-100"
                style={{
                  filter:
                    "drop-shadow(0 0 12px oklch(0.78 0.14 78 / 0.35))",
                }}
              />
              <span className="font-syncopate text-sm text-white/70 transition-colors duration-500 group-hover:text-white">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
