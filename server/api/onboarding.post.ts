import z from 'zod'

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, onboardingSchema.safeParse)
  if (!result.success) {
    return sendError(event, createError({
      status: 401,
      message: z.prettifyError(result.error),
    }))
  }

  const onBoardingData = result.data

  if (event.context.user.onBoarded) {
    return sendError(event, createError({
      status: 409,
      message: 'You have already been onboarded',
    }))
  }

  try {
    await zepClient.user.add({
      userId: event.context.user.id,
      email: event.context.user.email,
      firstName: event.context.user.name.split(' ')[0],
      lastName: event.context.user.name.split(' ')[-1],
    })

    await zepClient.graph.add({
      userId: event.context.user.id,
      type: 'json',
      data: JSON.stringify(onBoardingData),
    })

    await auth.api.updateUser({
      headers: event.headers,
      body: {
        onBoarded: true,
      },
    })

    const data = await prisma.user.update({
      where: {
        id: event.context.user.id,
      },
      data: {
        onBoardedPreferences: onBoardingData,
      },
    })

    return data
  }
  catch (error) {
    if (error instanceof Error) {
      return sendError(event, createError({
        status: 501,
        message: error.message,
      }))
    }
  }
})
