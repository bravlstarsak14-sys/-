import withPWAInit from '@ducanh2912/next-pwa'

/** @type {import('next').NextConfig} */
const baseConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // отключаем Turbopack
  webpack: (config) => config,

  // важно: пустой объект, чтобы Next не ругался
  turbopack: {},
}

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

export default withPWA(baseConfig)
