/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
