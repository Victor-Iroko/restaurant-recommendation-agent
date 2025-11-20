import { ZepClient } from '@getzep/zep-cloud'

const API_KEY = useRuntimeConfig().zepApiKey

export const zepClient = new ZepClient({
  apiKey: API_KEY,
})
