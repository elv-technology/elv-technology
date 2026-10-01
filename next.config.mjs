// Content-Security-Policy starts in Report-Only mode: violations are logged in the browser console
// but nothing is blocked. Once a week of normal use shows no violations, rename the header key to
// 'Content-Security-Policy' to enforce it.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://utfs.io https://*.ufs.sh https://placehold.co https://images.unsplash.com https://www.googletagmanager.com https://*.google-analytics.com https://maps.gstatic.com https://*.googleapis.com",
  "font-src 'self' data:",
  "media-src 'self' blob: https://utfs.io https://*.ufs.sh",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://*.uploadthing.com https://utfs.io https://*.ufs.sh",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Keep the admin area and APIs out of search results
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
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
