// You can pass 'Sign in' or 'Sign up' to customize the label
export function useSocialProviders(action: 'Sign in' | 'Sign up' = 'Sign in') {
  const route = useRoute()
  const callbackURL = computed(() => route.query.redirectTo?.toString() ?? '/home')

  const providers = computed(() => [
    {
      name: 'google',
      label: `${action} with Google`,
      icon: 'mdi:google',
      onClick: () => {
        // Assumes authClient and getCsrfHeaders are auto-imported or globally available
        authClient.signIn.social({
          provider: 'google',
          fetchOptions: { headers: getCsrfHeaders() },
          callbackURL: callbackURL.value,
        })
      },
    },
  ])

  return {
    providers,
    callbackURL, // Also return callbackURL since it's used in the forms
  }
}
