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
      },
      {
        source: '/access-control-solutions.html',
        destination: '/solutions/security-surveillance#access-control',
        permanent: true,
      },
      {
        source: '/gate-barrier-solutions.html',
        destination: '/solutions/security-surveillance#gate-barrier',
        permanent: true,
      },
      {
        source: '/nurse-call-solutions.html',
        destination: '/solutions/security-surveillance#nurse-call',
        permanent: true,
      },
      {
        source: '/queue-management-solutions.html',
        destination: '/solutions/security-surveillance#queue-management',
        permanent: true,
      },
      {
        source: '/disabled-toilet-alarm.html',
        destination: '/solutions/security-surveillance#disabled-alarm',
        permanent: true,
      },
      {
        source: '/home-automation-solutions.html',
        destination: '/solutions/home-automation',
        permanent: true,
      },
      {
        source: '/about-us.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/careers.html',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/access-control-installation-abu-dhabi.html',
        destination: '/solutions/security-surveillance#access-control',
        permanent: true,
      }
    ];
  },
}

export default nextConfig
