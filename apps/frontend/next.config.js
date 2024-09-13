/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
        { source: "/", destination: "/index.html" }
    ];
  },
};

module.exports = nextConfig;
