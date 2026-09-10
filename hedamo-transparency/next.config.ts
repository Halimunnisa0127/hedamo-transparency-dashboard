/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    turbopack: {
      root: __dirname
    }
  }
}

export default nextConfig
