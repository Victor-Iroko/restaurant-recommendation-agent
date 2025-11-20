<script setup lang="ts">
const emits = defineEmits<{
  updateStep: [step: boolean]
}>()

const onBoardingStore = useOnboardingStore()
const { selectedFlavours } = storeToRefs(onBoardingStore)

const MAX_SELECTIONS = 3

function toggleFlavour(flavour: typeof onBoardingStore.flavourOptions[number]['name']) {
  const index = selectedFlavours.value.findIndex(f => f === flavour)

  if (index > -1) {
    // Remove if already selected
    selectedFlavours.value.splice(index, 1)
  }
  else if (selectedFlavours.value.length < MAX_SELECTIONS) {
    // Add if under limit
    selectedFlavours.value.push(flavour)
  }
}

function isSelected(flavour: typeof onBoardingStore.flavourOptions[number]['name']) {
  return selectedFlavours.value.includes(flavour)
}
</script>

<template>
  <div class="px-4">
    <div class="mb-8">
      <h1 class="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
        What are your go to flavours?
      </h1>
      <p class="mt-2 text-base">
        Select up to {{ MAX_SELECTIONS }} options. <span class="font-black">{{ selectedFlavours.length }} of {{ onBoardingStore.flavourOptions.length }} selected.</span>
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="(flavour) in onBoardingStore.flavourOptions"
        :key="flavour.name"
        class="relative rounded-2xl overflow-clip transition"
        :class="{
          'ring ring-primary scale-[0.98]': isSelected(flavour.name),
          'hover:scale-[1.02]': selectedFlavours.length < MAX_SELECTIONS,
          'blur-xs cursor-not-allowed': (!isSelected(flavour.name)) && (selectedFlavours.length >= MAX_SELECTIONS),
        }"
        @click="toggleFlavour(flavour.name)"
      >
        <NuxtImg
          :src="flavour.src"
          :alt="flavour.name"
          class="w-full brightness-75"
        />

        <span class="absolute bottom-3 left-4">{{ flavour.name }}</span>

        <UIcon
          v-if="isSelected(flavour.name)"
          name="i-material-symbols:check-circle"
          class="absolute top-3 right-4 text-primary size-5"
        />
      </button>
    </div>

    <div class="max-w-md mx-auto mt-6">
      <UButton
        block
        class="font-semibold shadow-sm"
        @click="emits('updateStep', true)"
      >
        Continue
      </UButton>
    </div>
  </div>
</template>
