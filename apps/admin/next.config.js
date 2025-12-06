/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '169.254.83.107',
    ],
  },
};

export default nextConfig;
