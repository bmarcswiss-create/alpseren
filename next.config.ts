import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "alpseren.ch" }],
        destination: "https://www.alpseren.ch/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
