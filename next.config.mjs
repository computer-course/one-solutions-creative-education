// Set GITHUB_PAGES=true to build a fully static site (for GitHub Pages or any static host).
// In that mode there is no server, so the built-in /api/contact route is left out and the
// contact form posts to NEXT_PUBLIC_CONTACT_ENDPOINT instead.
const staticExport = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Server-only files end in .api.ts and are skipped in the static build
  pageExtensions: staticExport ? ["tsx", "ts"] : ["tsx", "ts", "api.ts"],
  ...(staticExport
    ? { output: "export", trailingSlash: true, basePath, images: { unoptimized: true } }
    : {
        basePath,
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
                { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
              ],
            },
          ];
        },
      }),
};
export default nextConfig;
