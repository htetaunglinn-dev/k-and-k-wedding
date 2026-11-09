import type { NextConfig } from "next";

const NO_INDEX = { key: "X-Robots-Tag", value: "noindex, nofollow" };

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      { source: "/admin", headers: [NO_INDEX, { key: "Referrer-Policy", value: "no-referrer" }] },
      { source: "/api/:path*", headers: [NO_INDEX] },
    ];
  },
};

export default nextConfig;
