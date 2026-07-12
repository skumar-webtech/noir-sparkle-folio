import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

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

function ProjectCard({ p, index }) {
  const [loaded, setLoaded] = useState(false);
  const [warm, setWarm] = useState(false); // start iframe fetch early (intent)
  const [hovered, setHovered] = useState(false); // reveal iframe over image
  const iframeRef = useRef(null);

  // Warm up iframe as soon as the pointer approaches the card, so by the time
  // the user actually hovers the media, it's already loading (or loaded).
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
      className="proj-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-white/30"
      style={{
        backdropFilter: "blur(14px) saturate(150%)",
        boxShadow:
          "0 20px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Media container */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900"
        style={{
          backgroundImage: `url(${p.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Loading spinner — only while user is actively hovering and iframe not ready */}
        {hovered && !loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div
              className="h-10 w-10 rounded-full border-2 border-white/20 border-t-accent"
              style={{ animation: "spin 0.7s linear infinite" }}
            />
          </div>
        )}

        {/* Iframe mounts on intent (pointer-enter/focus) and stays mounted so
            re-hover is instant. It's only revealed once loaded AND hovered. */}
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

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Type badge */}
        <div className="absolute left-4 top-4 z-30 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm">
          {p.type}
        </div>

        {/* External arrow */}
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

      {/* Body */}
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

  return (
    <section
      ref={rootRef}
      id="projects"
      className="relative px-6 py-32 md:py-48"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="projects-header mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs text-accent">04</span>
            <span className="h-px w-8 bg-accent" />
            <span className="track-wide text-[10px] uppercase text-white/60">
              Projects
            </span>
          </div>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            Selected <span className="italic text-accent">work</span>.
          </h2>
        </div>

        <div className="proj-grid grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
