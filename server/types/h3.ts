import type { User } from 'better-auth/types'

declare module 'h3' {
  interface H3EventContext {
    user?: User
  }
}
