

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    turbopack: {
      root: __dirname // ensures Turbopack uses this project folder
    }
  }
}

export default nextConfig
