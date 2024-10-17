/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000"
      ],
      allowedForwardedHosts: ["localhost"]
    }
  }
}

module.exports = nextConfig
