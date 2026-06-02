import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this repo. Without this, Next infers the root
  // from the nearest lockfile and picks up a stray one in the parent folder.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
