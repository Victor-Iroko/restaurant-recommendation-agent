export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore.user

  // allowed list for non-authenticated users
  const publicRoutes = [
    '/',
    '/register',
    '/forgot-password',
  ]

  // Check if the route the user is navigating to is a public route
  const isPublicRoute = publicRoutes.includes(to.path)

  // if the person is trying to visit a non-public page and is not logged in
  // redirect to the login page (which is the home page in this case)
  if (!isPublicRoute && !isLoggedIn) {
    return navigateTo({
      path: '/',
      query: {
        redirectTo: to.path,
      },
    })
  }

  // This is a "disallow list" for authenticated (logged in) users.
  const authPages = ['/', '/register']

  // if the user is logged in and trying to access an auth page, redirect to /home
  if (authPages.includes(to.path) && isLoggedIn) {
    return navigateTo('/home')
  }
})
