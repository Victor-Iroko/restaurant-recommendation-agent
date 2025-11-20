import type { AuthFormProps } from '@nuxt/ui'

export function useSocialProviders(action: 'Sign in' | 'Sign up' = 'Sign in') {
  const route = useRoute()
  // to redirect to the intended page after auth
  const callbackURL = computed(() => route.query.redirectTo?.toString() ?? '/home')

  const providers = computed(() => [
    {
      label: `${action} with Google`,
      icon: 'mdi:google',
      color: 'primary',
      variant: 'outline',
      onClick: () => {
        authClient.signIn.social({
          provider: 'google',
          fetchOptions: { headers: getCsrfHeaders() },
          callbackURL: callbackURL.value,
        })
      },
    },
  ] satisfies AuthFormProps['providers'])

  return {
    providers,
    callbackURL, // Also return callbackURL since it's used in the forms
  }
}
