// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',         // Enables static site export
  reactStrictMode: true,
  images: {
    unoptimized: true       // Disable Next.js Image Optimization
  }
};

module.exports = nextConfig;
