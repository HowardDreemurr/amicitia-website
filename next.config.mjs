/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into ./out so it can be served by GitHub Pages.
  output: "export",
  // GitHub Pages can't run the Next.js image optimizer.
  images: { unoptimized: true },
  // Serve each route as /path/index.html — friendlier for static hosts.
  trailingSlash: true,
};

export default nextConfig;
