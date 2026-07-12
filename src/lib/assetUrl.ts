// Lovable CDN assets are served under /__l5e/... only on *.lovable.app domains.
// When running locally (bun dev) or hosted elsewhere (Vercel), that path 404s.
// This helper rewrites relative CDN URLs to an absolute Lovable-hosted URL so
// videos and images load in every environment.
const CDN_HOST = "https://noir-sparkle-folio.lovable.app";

export function assetUrl(input: string | { url: string }): string {
  const url = typeof input === "string" ? input : input.url;
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/__l5e/")) return CDN_HOST + url;
  return url;
}
