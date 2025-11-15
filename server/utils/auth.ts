import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '~~/server/utils/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
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
      return await useStorage('cache').getItem<string>(key)
    },
    set: async (key, value, ttl) => {
      await useStorage('cache').setItem(key, value, { maxAge: ttl })
    },
    delete: async (key) => {
      await useStorage('cache').removeItem(key)
    },
  },
})
