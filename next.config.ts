import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gmedia.playstation.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "image.api.playstation.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
