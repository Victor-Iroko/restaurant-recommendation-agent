export function getCsrfHeaders() {
  const { csrf } = useCsrf()
  const headers = new Headers()
  headers.append('csrf-token', csrf)
  return headers
}
