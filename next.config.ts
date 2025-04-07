import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',  // Unsplash images
      'player.vimeo.com'      // Vimeo videos
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
