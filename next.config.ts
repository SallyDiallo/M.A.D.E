import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/decision",
        destination: "http://localhost:5000/api/decision",
      },
    ];
  },
};

export default nextConfig;
