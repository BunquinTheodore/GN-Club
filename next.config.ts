import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Serve images as-is instead of through Vercel's on-demand image
    // optimization endpoint (/_next/image). That endpoint has a monthly
    // source-image quota on Vercel's plan and returns 402 once exhausted,
    // which breaks every <Image> on the deployed site even though the
    // underlying files are fine. Skipping optimization trades automatic
    // resizing/format conversion for images that always load.
    unoptimized: true,
  },
};

export default nextConfig;
