<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/web_image.png' },
  ],
})

useSeoMeta({
  title: 'Restaurant Recommendation Agent',
  ogTitle: 'Restaurant Recommendation Agent',
  description: 'An AI-powered agent that suggests restaurants based on user preferences.',
  ogDescription: 'An AI-powered agent that suggests restaurants based on user preferences.',
  ogImage: '/web_image.png',
  twitterTitle: 'Restaurant Recommendation Agent',
  twitterDescription: 'An AI-powered agent that suggests restaurants based on user preferences.',
  twitterImage: '/web_image.png',
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
