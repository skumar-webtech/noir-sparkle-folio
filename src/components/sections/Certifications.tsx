import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
};

const certificates: Certificate[] = [
  {
    title: "Post Graduate Certification in Full Stack Software Engineering",
    issuer: "NIIT | StackRoute",
    date: "2022",
    description:
      "Comprehensive certification covering advanced modern JavaScript ecosystems, responsive design, and full-stack web application deployment.",
    pdfUrl: "src/assets/certificates/NIIT-Certificate.pdf",
    thumbnail: "src/assets/certificates/NIIT-Certificate.png",
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "HackerRank / Meta",
    date: "2026",
    description:
      "Intensive program covering React, UX principles, version control, and production-ready front-end engineering workflows.",
    pdfUrl: "src/assets/certificates/meta-cert.pdf",
    thumbnail: "src/assets/certificates/Hacker-Rank-React-Developer.png",
  },
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google / SimpleLearn",
    date: "2026",
    description:
      "In-depth training in user experience design, including wireframing, prototyping, and usability testing for web and mobile applications.",
    pdfUrl: "src/assets/certificates/google-ux-cert.pdf",
    thumbnail: "src/assets/certificates/Generative-AI.png",
  },
  {
    title: "Microsoft Azure Essentials (AZ-900)",
    issuer: "Microsoft | Great Learning",
    date: "2026",
    description:
      "Introduction to cloud concepts, Azure services, and security best practices.",
    pdfUrl: "src/assets/certificates/microsoft-azure-essentials.pdf",
    thumbnail: "src/assets/certificates/Microsoft-Azure.png",
  },
  {
    title: "AWS For Beginners: Cloud Practitioner Essentials",
    issuer: "Great Learning",
    date: "2023",
    description:"Validated expertise in designing distributed systems, fault-tolerant architectures, and cost-optimized cloud deployments on AWS.",
    pdfUrl: "src/assets/certificates/aws-cert.pdf",
    thumbnail: "src/assets/certificates/AWS-Certificate.png",
  },
  {
    title: "Remasto: Interview Preparation for Full-Stack Software Engineers",
    issuer: "Remasto",
    date: "2026",
    description:"Comprehensive interview preparation covering data structures, algorithms, system design, and behavioral questions for full-stack software engineering roles.",
    pdfUrl: "src/assets/certificates/aws-cert.pdf",
    thumbnail: "src/assets/certificates/interview-prep.png",
  },
];

function CertThumbnail({ cert }: { cert: Certificate }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/10 via-white/5 to-accent/10 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
          {cert.issuer}
        </span>
      </div>
    );
  }

  return (
    <img
      src={cert.thumbnail}
      alt={cert.title}
      onError={() => setImgError(true)}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  );
}

function CertCard({
  cert,
  onSelect,
}: {
  cert: Certificate;
  onSelect: (cert: Certificate) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(cert)}
      className="cert-card group w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-2xl transition-all duration-500 hover:border-accent/40 sm:w-[320px]"
      style={{
        backdropFilter: "blur(16px) saturate(150%)",
        boxShadow:
          "0 20px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
        <CertThumbnail cert={cert} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm">
          {cert.date}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {cert.issuer}
        </span>
        <h4 className="font-display text-lg font-light leading-snug text-white transition-colors group-hover:text-accent">
          {cert.title}
        </h4>
      </div>
    </button>
  );
}

function CertModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.4)",
        },
      );
    });
    return () => ctx.revert();
  }, [cert]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      { opacity: 0, duration: 0.25, ease: "power2.in" },
      "-=0.1",
    );
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl sm:p-8"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur-md transition-all hover:border-accent/50 hover:text-accent"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <div
        ref={panelRef}
        className="relative mx-auto flex w-full max-w-4xl flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
          <div className="relative aspect-[16/10] w-full bg-neutral-900">
            {!pdfError ? (
              <object
                data={cert.thumbnail}
                type="png"
                className="h-full w-full"
                onError={() => setPdfError(true)}
              >
                <iframe
                  src={cert.thumbnail}
                  title={cert.title}
                  className="h-full w-full border-0"
                  onError={() => setPdfError(true)}
                />
              </object>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-white/5 via-neutral-900 to-accent/5 p-8">
                <img
                  src={cert.thumbnail}
                  alt={cert.title}
                  className="max-h-[60%] max-w-full rounded-lg object-contain shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  PDF preview unavailable
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {cert.issuer} · {cert.date}
          </span>
          <h3
            id="cert-modal-title"
            className="mt-3 font-display text-2xl font-light leading-tight text-white md:text-3xl"
          >
            {cert.title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {cert.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  const rootRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [paused, setPaused] = useState(false);
  const row = [...certificates, ...certificates];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".certs-header",
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
        ".cert-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cert-carousel-wrap", start: "top 90%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="certifications"
      className="relative px-6 py-32 md:py-48"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="certs-header mb-16 md:mb-20">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs text-accent">03</span>
            <span className="h-px w-8 bg-accent" />
            <span className="track-wide text-[10px] uppercase text-white/60">
              Certifications & Achievements
            </span>
          </div>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            Credentials &{" "}
            <span className="italic text-accent">milestones</span>.
          </h2>
        </div>

        <div
          className="cert-carousel-wrap relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className={`cert-carousel-track flex w-max gap-6 will-change-transform ${paused ? "cert-carousel-paused" : ""}`}
          >
            {row.map((cert, i) => (
              <CertCard
                key={`${cert.title}-${i}`}
                cert={cert}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
