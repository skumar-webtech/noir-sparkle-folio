import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { l: "GitHub", h: "https://github.com/Kumar-Saurabh-Tiwari" },
  { l: "LinkedIn", h: "https://www.linkedin.com/in/saurabh-tiwari11/" },
  { l: "Instagram", h: "https://www.instagram.com/skumar_webtech" },
  { l: "X", h: "https://x.com/SaurabhKumar_11" },
];

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-headline .h-word", {
        yPercent: 110,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.08,
        duration: 1.2,
        scrollTrigger: { trigger: ".contact-headline", start: "top 80%" },
      });
      gsap.from(".contact-field", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      });
      gsap.from(".social-link", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".contact-footer", start: "top 90%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:py-48"
    >
      {/* Animated abstract accents — transparent so the video shows through */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.15 75), transparent 70%)",
            animation: "float-slow 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-40 bottom-10 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.5 0.2 280), transparent 70%)",
            animation: "float-slow 18s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute left-1/3 top-1/2 h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.6 0.18 200), transparent 70%)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
      </div>


      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs text-accent">06</span>
          <span className="h-px w-8 bg-accent" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Contact
          </span>
        </div>

        <h2 className="contact-headline font-display text-5xl font-light leading-[1] tracking-tight md:text-8xl">
          {"Let's build".split(" ").map((w, i) => (
            <span key={i} className="mr-4 inline-block overflow-hidden">
              <span className="h-word inline-block">{w}</span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden">
            <span className="h-word inline-block italic text-accent">
              something.
            </span>
          </span>
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
            }}
            className="contact-form liquid-glass space-y-6 rounded-2xl p-8 text-white shadow-xl lg:col-span-7 md:p-10"
          >
            <div className="contact-field grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Name
                </span>
                <input
                  required
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-lg font-light text-foreground outline-none transition-colors focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Email
                </span>
                <input
                  type="email"
                  required
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-lg font-light text-foreground outline-none transition-colors focus:border-accent"
                />
              </label>
            </div>

            <label className="contact-field block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Subject
              </span>
              <input
                className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-lg font-light text-foreground outline-none transition-colors focus:border-accent"
              />
            </label>

            <label className="contact-field block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Message
              </span>
              <textarea
                required
                rows={4}
                className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-3 text-lg font-light text-foreground outline-none transition-colors focus:border-accent"
              />
            </label>

            <div className="contact-field pt-4">
              <button
                type="submit"
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 px-8 py-4 transition-all hover:border-accent"
              >
                <span className="text-xs uppercase tracking-[0.3em]">
                  {sent ? "Message Sent" : "Send Message"}
                </span>
                <span className="text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </form>

          <aside className="liquid-glass rounded-2xl p-8 text-white shadow-xl lg:col-span-5 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Available for
            </p>
            <p className="mt-3 font-display text-2xl font-light leading-snug md:text-3xl">
              Freelance projects, full-time roles, and thoughtful collaborations.
            </p>

            <div className="mt-10 space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Email
                </div>
                <a
                  href="mailto:hello@skumar.space"
                  className="mt-1 block font-display text-xl text-foreground hover:text-accent"
                >
                  hello@skumar.space
                </a>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Based in
                </div>
                <div className="mt-1 font-display text-xl">
                  India · Remote worldwide
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="contact-footer mt-32 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © 2026 — Saurabh Kumar Tiwari
          </div>
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <a
                key={s.l}
                href={s.h}
                className="social-link group relative text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
