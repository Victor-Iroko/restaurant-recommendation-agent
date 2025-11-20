<script>
definePageMeta({
  middleware: () => {
    const authStore = useAuthStore()
    if (authStore.user.onBoarded === false) {
      return navigateTo('/onboarding')
    }
  },
})
</script>

<template>
  <div>
    Welcome to the Home Page
  </div>
</template>
