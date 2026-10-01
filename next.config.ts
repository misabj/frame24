import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/radovi", destination: "/work", permanent: true },
      { source: "/kontakt", destination: "/contact", permanent: true },
      { source: "/admin/prijava", destination: "/admin/login", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vumbnail.com",
      },
    ],
  },
};

export default nextConfig;
