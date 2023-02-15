import "./src/env/client.mjs"
import "./src/env/server.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true
  },
  images: {
    domains: [
      "www.redditstatic.com",
      "preview.redd.it",
      "external-preview.redd.it",
      "b.thumbs.redditmedia.com",
      "a.thumbs.redditmedia.com"
    ]
  }
}

export default nextConfig
