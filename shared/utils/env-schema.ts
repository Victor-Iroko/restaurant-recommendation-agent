import * as z from 'zod'

export const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  REDIS_URL: z.url().nonempty(),
  DATABASE_URL: z.url().nonempty(),
  BETTER_AUTH_SECRET: z.string().nonempty(),
  BETTER_AUTH_URL: z.string().nonempty(),
  NUXT_GMAIL_USER: z.email().nonempty(),
  NUXT_GMAIL_PASS: z.string().nonempty(),
})
