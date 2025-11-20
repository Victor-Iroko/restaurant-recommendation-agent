<script setup lang="ts">
// You can add layout-specific logic here if needed
</script>

<template>
  <div class="bg-[url(/restaurant_background.png)] bg-cover bg-center min-h-screen flex items-center justify-center p-4">
    <UPageCard
      class="w-full max-w-md backdrop-blur-sm"
      :ui="{
        root: 'bg-[#f8f6f6]/75 dark:bg-[#221510]/75',
      }"
    >
      <slot />
    </UPageCard>
  </div>
</template>
