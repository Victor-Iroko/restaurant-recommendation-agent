// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-security',
    '@nuxtjs/seo',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    gmailUser: '',
    gmailPass: '',
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    storage: {
      cache: {
        driver: 'redis',
        // eslint-disable-next-line node/prefer-global/process
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
  security: {
    csrf: true,
  },
})
