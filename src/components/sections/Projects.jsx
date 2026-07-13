import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Search } from "lucide-react";

import { assetUrl } from "@/lib/assetUrl";
import img3d from "@/assets/projects/3d-portfolio.png.asset.json";
import imgAi from "@/assets/projects/Ai-portfolio.png.asset.json";
import imgSpace from "@/assets/projects/space-portfolio.png.asset.json";
import imgDevhub from "@/assets/projects/devhub.png.asset.json";
import imgBatman from "@/assets/projects/batman-landing.png.asset.json";
import imgMirecall from "@/assets/projects/mirecall-card-vault.png.asset.json";
import imgCuralink from "@/assets/projects/curalink-health.png.asset.json";
import imgPan from "@/assets/projects/pan-admin-dashboard.png.asset.json";
import imgRoamify from "@/assets/projects/roamify-website.png.asset.json";
import imgSk from "@/assets/projects/sk-web.png.asset.json";
import imgPulseChat from "@/assets/projects/temp/pulse-chat.png";
import imgFluid from "@/assets/projects/temp/fluid-studio.png";
import imgNike from "@/assets/projects/temp/nike-web.png";

gsap.registerPlugin(ScrollTrigger, Flip);

const projects = [
  {
    title: "3D Portfolio Website",
    category: "Portfolio Website",
    tools: ["React", "Three.js", "GSAP"],
    image: assetUrl(img3d),
    type: "3D Portfolio",
    link: "https://3d.skumar.space/",
  },
  {
    title: "AI Portfolio Website",
    category: "Portfolio Website",
    tools: ["React", "Next.js", "Tailwind CSS", "GROQ AI"],
    image: assetUrl(imgAi),
    type: "AI Portfolio",
    link: "https://canvas-of-dreams-rosy.vercel.app/",
  },
  {
    title: "Space Portfolio Website",
    category: "Portfolio Website",
    tools: ["React", "Three.js", "TypeScript", "Tailwind CSS"],
    image: assetUrl(imgSpace),
    type: "Portfolio Website",
    link: "https://skumar-space.netlify.app/",
  },
  {
    title: "Pulse Chat — Real-time Chat Application",
    category: "Real-time Chat Application",
    tools: ["React", "TypeScript", "Tailwind CSS","Socket.io", "Node.js", "Express.js"],
    image: assetUrl(imgPulseChat),
    type: "Real-time Chat Application",
    link: "https://chat.skumar.space/",
  },
  {
    title: "Fluid Studio - Fluid GASP Animation",
    category: "Fluid Animation",
    tools: ["HTML", "CSS", "JavaScript", "GSAP"],
    image: assetUrl(imgFluid),
    type: "Fluid Animation",
    link: "https://kumar-saurabh-tiwari.github.io/Fluid-Studio/",
  },
  {
    title: "Parallax Nike Theme",
    category: "Landing Page",
    tools: ["HTML", "CSS", "JavaScript", "GSAP"],
    image: assetUrl(imgNike),
    type: "Landing Page",
    link: "https://kumar-saurabh-tiwari.github.io/parallex-nike-theme/",
  },
  {
    title: "DevHub It is designed as a resource for developers.",
    category: "Developer Resource Hub",
    tools: ["React", "Next.js", "Tailwind CSS"],
    image: assetUrl(imgDevhub),
    type: "Landing Page",
    link: "https://dev-canvas-one.vercel.app/",
  },
  {
    title: "Batman Theme Landing Page",
    category: "Cinematic Experience",
    tools: ["React", "Vite", "Tailwind CSS"],
    image: assetUrl(imgBatman),
    type: "Landing Page",
    link: "https://batman-wayne.netlify.app/",
  },
  {
    title: "MI-Recall Business Card Vault",
    category: "AI Knowledge Vault",
    tools: ["React", "Node.js", "OpenAI"],
    image: assetUrl(imgMirecall),
    type: "Landing Page",
    link: "https://mi-recall-business-contact-web.vercel.app",
  },
  {
    title: "CuraLink AI Health Assistant",
    category: "AI Health Assistant",
    tools: ["React", "Node.js", "OpenAI"],
    image: assetUrl(imgCuralink),
    type: "AI Assistant",
    link: "https://curalink-ai-research.vercel.app/",
  },
  {
    title: "PAN Admin Dashboard",
    category: "Admin + Payments Platform",
    tools: ["Next.js", "MongoDB", "Stripe"],
    image: assetUrl(imgPan),
    type: "Admin Dashboard",
    link: "https://admin.panglobal.network",
  },
  {
    title: "Roamify Tickets — Travel UI",
    category: "Responsive UI",
    tools: ["React", "Responsive Design"],
    image: assetUrl(imgRoamify),
    type: "Landing Page",
    link: "https://www.roamifyllc.com",
  },
  {
    title: "SK Web Hub — Agency Landing",
    category: "Marketing Website",
    tools: ["HTML", "CSS", "JavaScript"],
    image: assetUrl(imgSk),
    type: "Landing Page",
    link: "https://sk-web-hub.vercel.app/",
  },
];

function projectMatches(p, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.type.toLowerCase().includes(q) ||
    p.tools.some((t) => t.toLowerCase().includes(q))
  );
}

function ProjectCard({ p }) {
  const [loaded, setLoaded] = useState(false);
  const [warm, setWarm] = useState(false);
  const [hovered, setHovered] = useState(false);
  const iframeRef = useRef(null);

  const handleIntent = () => setWarm(true);
  const handleEnter = () => {
    setWarm(true);
    setHovered(true);
  };

  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={handleIntent}
      onFocus={handleIntent}
      onMouseEnter={handleEnter}
      className="proj-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl transition-colors duration-500 hover:border-white/30"
      style={{
        backdropFilter: "blur(14px) saturate(150%)",
        boxShadow:
          "0 20px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900"
        style={{
          backgroundImage: `url(${p.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {hovered && !loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div
              className="h-10 w-10 rounded-full border-2 border-white/20 border-t-accent"
              style={{ animation: "spin 0.7s linear infinite" }}
            />
          </div>
        )}

        {warm && (
          <iframe
            ref={iframeRef}
            src={p.link}
            title={p.title}
            loading="eager"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 z-10 h-full w-full border-0 transition-opacity duration-200"
            style={{
              opacity: hovered && loaded ? 1 : 0,
              pointerEvents: hovered && loaded ? "auto" : "none",
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute left-4 top-4 z-30 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm">
          {p.type}
        </div>

        <div className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/85 backdrop-blur-sm transition-all duration-300 group-hover:border-accent/60 group-hover:text-accent">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </div>
      </div>

      <div className="relative flex flex-col gap-3 p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {p.category}
        </span>
        <h4 className="font-display text-xl font-light leading-tight text-white md:text-2xl">
          {p.title}
        </h4>
        <div className="mt-1 flex flex-wrap gap-2">
          {p.tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-accent">
          Visit Site <span>→</span>
        </div>
      </div>
    </a>
  );
}

export function Projects() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isFirstFilter = useRef(true);

  const filteredProjects = useMemo(
    () => projects.filter((p) => projectMatches(p, searchQuery)),
    [searchQuery],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".proj-search-wrap",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".proj-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".proj-grid",
            start: "top 85%",
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!gridRef.current || isFirstFilter.current) {
      isFirstFilter.current = false;
      return;
    }

    const state = Flip.getState(".proj-card");

    Flip.from(state, {
      duration: 0.55,
      ease: "power2.inOut",
      stagger: 0.04,
      absolute: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        ),
      onLeave: (elements) =>
        gsap.to(elements, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in",
        }),
    });
  }, [filteredProjects]);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="relative px-6 py-32 md:py-48"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="projects-header mb-12 md:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs text-accent">05</span>
            <span className="h-px w-8 bg-accent" />
            <span className="track-wide text-[10px] uppercase text-white/60">
              Projects
            </span>
          </div>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            Selected <span className="italic text-accent">work</span>.
          </h2>
        </div>

        <div className="proj-search-wrap mb-10 md:mb-14">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
              aria-hidden
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, category, type, or tools…"
              aria-label="Search projects"
              className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 pl-12 text-sm text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 focus:border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:shadow-[0_0_24px_oklch(0.78_0.14_78/0.2)]"
            />
          </div>
          {searchQuery.trim() && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <div
          ref={gridRef}
          className="proj-grid grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>

        {searchQuery.trim() && filteredProjects.length === 0 && (
          <div className="proj-no-results mt-12 rounded-2xl border border-white/10 bg-white/5 px-8 py-12 text-center backdrop-blur-md">
            <p className="font-display text-xl text-white/80">
              No projects match your search.
            </p>
            <p className="mt-2 text-sm text-white/50">
              Try a different keyword — title, category, type, or tool name.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
