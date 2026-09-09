import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root — a stray lockfile in $HOME otherwise wins inference.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // The Cloudflare Workers runtime has no sharp; the optimizer there needs an
    // IMAGES binding and otherwise just passes the original through. The one
    // photo on this site is already a 128 KB WebP, so skip the optimizer
    // entirely and serve it straight from assets.
    unoptimized: true,
  },
};

export default nextConfig;
