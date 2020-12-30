const withImages = require('next-images')
const withOffline = require('next-offline')
const withPWA = require('next-pwa')

const nextConfigWithPWA = withPWA({
  pwa: {
    dest: 'public'
  },
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    FILM_KEY: process.env.FILM_KEY,
    FILM_POSTER: process.env.FILM_POSTER,
    FILM_URL: process.env.FILM_URL,
    GOOGLE_ADSENSE: process.env.GOOGLE_ADSENSE,
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
  },
})

const nextConfigWithOffline = withOffline({ ...nextConfigWithPWA })

module.exports = withImages({
  esModule: true,
  ...nextConfigWithOffline
})
