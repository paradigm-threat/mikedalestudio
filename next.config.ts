import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/visual-design", destination: "/graphic-design", permanent: true },
      { source: "/visual-design/", destination: "/graphic-design", permanent: true },
    ];
  },
};

export default nextConfig;
