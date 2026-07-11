import { useEffect } from "react";

const makeSvg = (fill: string, glow: string) =>
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <rect width='64' height='64' rx='12' fill='#050505'/>
    <text x='50%' y='54%' text-anchor='middle' dominant-baseline='middle'
      font-family='Helvetica, Arial, sans-serif' font-weight='700' font-size='34'
      fill='${fill}' style='filter: drop-shadow(0 0 6px ${glow});'>SK</text>
  </svg>`;

const toDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const FRAMES = [
  toDataUri(makeSvg("#ffffff", "rgba(0,0,0,0)")),
  toDataUri(makeSvg("#d4af37", "rgba(212,175,55,0.9)")),
];

export function AnimatedFavicon() {
  useEffect(() => {
    document
      .querySelectorAll("link[rel~='icon']")
      .forEach((el) => el.parentNode?.removeChild(el));

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = FRAMES[0];
    document.head.appendChild(link);

    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % FRAMES.length;
      link.href = FRAMES[i];
    }, 1000);

    return () => {
      window.clearInterval(id);
      link.remove();
    };
  }, []);

  return null;
}
