import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 👇 ЭТО ВАЖНО: чтобы отключить Turbopack и включить Webpack
  webpack: (config) => config,

  // 👇 ЭТО НОВОЕ ТРЕБОВАНИЕ NEXT 16
  turbopack: {},
}

export default withPWA(nextConfig)
