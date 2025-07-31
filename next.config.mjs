/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/twitter",
        destination: "https://twitter.com/airoadmapgen",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/2rMV53UqYB",
        permanent: true,
      },
    ];
  },
  experimental: {
    typedRoutes: true,
  },
  output: "standalone",
  optimizeFonts: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
