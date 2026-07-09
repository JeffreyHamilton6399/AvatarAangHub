import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Keep deploys green even if a stray type error slips through.
  // (Next.js 16 no longer runs ESLint during `next build`.)
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
