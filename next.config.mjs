/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/usd1", // temporary — remove when edu site launches
      },
    ];
  },
};

export default nextConfig;




