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
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
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
