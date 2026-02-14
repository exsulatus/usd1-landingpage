/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/usd1",
        permanent: false, // temporary — remove when edu site launches
      },
    ];
  },
};

export default nextConfig;




