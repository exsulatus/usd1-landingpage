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
  async redirects() {
    return [
      {
        // Redirect everything except /usd1 and static assets to the landing page
        source: "/((?!usd1|_next|images|icon\\.svg|favicon\\.ico).+)",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;




