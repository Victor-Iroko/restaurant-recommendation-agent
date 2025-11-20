import type { H3Event } from 'h3'
import type { User } from '../types/h3'
import { createError, defineEventHandler } from 'h3'

export interface AuthenticatedEvent extends H3Event {
  context: H3Event['context'] & {
    user: User
  }
}

export function defineAuthenticatedEventHandler<T>(handler: (event: AuthenticatedEvent) => Promise<T> | T) {
  return defineEventHandler(async (event) => {
    const session = await auth.api.getSession({
      headers: event.headers,
    })
    if (!session?.user) {
      return sendError(event, createError({
        status: 401,
        statusMessage: 'Unauthorized',
      }))
    }
    event.context.user = session.user
    return handler(event as AuthenticatedEvent)
  })
}
