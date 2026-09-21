import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Local /public images still route through Next's optimizer (resizing,
    // AVIF/WebP negotiation) — only remote Unsplash URLs skip it per-image via
    // DuotoneImage's own `unoptimized={isRemote}`, since re-fetching those
    // server-side is what exhausts Vercel's optimization quota.
  },
};

export default nextConfig;
