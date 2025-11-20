import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { openAPI } from 'better-auth/plugins'
import { prisma } from '~~/server/utils/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      onBoarded: {
        type: 'boolean',
        required: true,
        default: false,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${url}`,
      })
    },
  },
  socialProviders: {
    google: {
      // eslint-disable-next-line node/prefer-global/process
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      // eslint-disable-next-line node/prefer-global/process
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
  secondaryStorage: {
    get: async (key) => {
      return await useStorage('redis').getItem<string>(key)
    },
    set: async (key, value, ttl) => {
      await useStorage('redis').setItem(key, value, { ttl })
    },
    delete: async (key) => {
      await useStorage('redis').removeItem(key)
    },
  },
  plugins: [
    openAPI(),
  ],
})
