import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nutrabiotics.info",
      },
      {
        protocol: "https",
        hostname: "bucket-nutrabiotics-multimedia.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
