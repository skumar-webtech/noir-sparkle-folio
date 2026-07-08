import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
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
      {
        property: "og:title",
        content: "Saurabh Kumar Tiwari — Full Stack Developer",
      },
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
  const [ready, setReady] = useState(false);

  return (
    <main className="relative bg-background text-foreground">
      <Preloader onDone={() => setReady(true)} />
      {ready && <Nav />}
      <Hero />
      <About />
      <Skills />
      <Coding />
      <Projects />
      <Contact />
    </main>
  );
}
