export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore.user

  const publicRoutes = [
    '/',
    '/register',
  ]

  // Check if the route the user is navigating to is public
  const isPublicRoute = publicRoutes.includes(to.path)

  // If the route is NOT public AND the user is NOT logged in,
  // redirect them to the login page.
  if (!isPublicRoute && !isLoggedIn) {
    return navigateTo(`/?redirect_to=${to.fullPath}`)
  }

  // If the user IS logged in and tries to visit a public-only page
  // (like login or register), redirect them to the main app.
  const authPages = ['/', '/register']
  if (authPages.includes(to.path) && isLoggedIn) {
    return navigateTo('/home')
  }
})
