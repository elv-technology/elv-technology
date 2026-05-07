/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  async headers() {
    return [
      {
        // Cache all static media files aggressively
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/public-address-solutions.html',
        destination: '/solutions/audio-visual#public-address-bgm',
        permanent: true,
      },
      {
        source: '/public-address-solutions.htmll',
        destination: '/solutions/audio-visual#public-address-bgm',
        permanent: true,
      },
      {
        source: '/smatv-solutions.html',
        destination: '/solutions/network-communications#iptv-smatv',
        permanent: true,
      },
      {
        source: '/security-surveillance-solutions.html',
        destination: '/solutions/security-surveillance',
        permanent: true,
      },
      {
        source: '/audio-visual-solutions.html',
        destination: '/solutions/audio-visual',
        permanent: true,
      }
    ];
  },
}

export default nextConfig

