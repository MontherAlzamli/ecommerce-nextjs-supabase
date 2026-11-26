/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve dashboard under /ecommerce-admin subpath in production
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all HTTP domains (for development)
      },
    ],
    domains: [
      "cdn.pixabay.com",
      "encrypted-tbn0.gstatic.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "via.placeholder.com",
    ],
  },
  // The API (Express inside a Next.js API route) lives in the store app.
  async rewrites() {
    const api = process.env.API_ORIGIN;
    return api ? [{ source: '/api/v1/:path*', destination: `${api}/api/v1/:path*` }] : [];
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
