import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { VideoStage } from "@/components/VideoStage";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Coding } from "@/components/sections/Coding";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saurabh Kumar Tiwari — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Saurabh Kumar Tiwari — Full Stack Developer specializing in MERN, Next.js, Angular, LLM integration, and cloud-scale web applications.",
      },
      { property: "og:title", content: "Saurabh Kumar Tiwari — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "MERN · Next.js · Angular · LLM integration · AWS & Azure. Building scalable, cinematic web experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [videosReady, setVideosReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <main className="relative" style={{ background: "#050505" }}>
      <Preloader ready={videosReady} onDone={() => setPreloaderDone(true)} />
      <SmoothScroll />
      <VideoStage onReady={() => setVideosReady(true)} />
      {preloaderDone && (
        <>
          <ScrollProgress />
          <Nav />
        </>
      )}

      {/* Stage 1: FSD video (Hero + About + Skills) */}
      <div id="stage-fsd" className="relative z-10">
        <Hero />
        <About />
        <Skills />
      </div>

      {/* Stage 2: Coding video */}
      <div id="stage-coding" className="relative z-10">
        <Coding />
      </div>

      {/* Stage 3: Projects video */}
      <div id="stage-projects" className="relative z-10">
        <Projects />
      </div>

      {/* Contact — no video, own abstract background */}
      <div className="relative z-10">
        <Contact />
      </div>
    </main>
  );
}
