/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'placehold.co'],
  },
}

module.exports = nextConfig