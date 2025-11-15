import z from 'zod'

export default defineNitroPlugin(() => {
  // eslint-disable-next-line node/prefer-global/process
  const parsedEnv = envSchema.safeParse(process.env)

  if (!parsedEnv.success) {
    const message = z.prettifyError(parsedEnv.error)

    if (import.meta.dev) {
      console.error(message)
    }
    else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid environmental variables',
        message,
      })
    }
  }
})
