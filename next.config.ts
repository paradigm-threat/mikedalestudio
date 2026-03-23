import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Keep prefetched static routes warm in the client router cache (snappier back/forward).
    staleTimes: {
      static: 300,
      dynamic: 60,
    },
  },
  async redirects() {
    return [
      { source: "/visual-design", destination: "/graphic-design", permanent: true },
      { source: "/visual-design/", destination: "/graphic-design", permanent: true },
    ];
  },
};

export default nextConfig;
