<script setup lang="ts">
const emits = defineEmits<{
  updateStep: [step: boolean]
}>()

const onBoardingStore = useOnboardingStore()
const { visitedAreas, selectedThisOrThat } = storeToRefs(onBoardingStore)
const { thisOrThat } = onBoardingStore

const location = ref('')
function addLocation() {
  const val = location.value.trim()
  if (val && !visitedAreas.value.includes(val)) {
    visitedAreas.value.push(val)
    location.value = ''
  }
}
function removeLocation(item: string) {
  visitedAreas.value = visitedAreas.value.filter(i => i !== item)
}
</script>

<template>
  <div class="px-4 grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
    <div class="flex flex-col gap-8">
      <div class="space-y-2">
        <h1 class="text-2xl lg:text-3xl font-black leading-tight">
          Help Us Understand Your Tastes
        </h1>

        <p class="text-sm text-neutral-500">
          Tell us a bit about your preferences to get the best recommendations
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <p class="font-black">
          Which areas do you visit the most
        </p>
        <UInput
          v-model="location"
          class="block"
          placeholder="e.g., Ring Road..."
          @keydown.enter.prevent="addLocation"
          @keydown.backspace="(!location && visitedAreas.length) ? visitedAreas.pop() : null"
        />
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="item in visitedAreas"
            :key="item"
            color="secondary"
            variant="outline"
            size="md"
          >
            {{ item }}

            <template #trailing>
              <UIcon name="i-material-symbols:close-small" class="size-4 hover:cursor-pointer" @click="removeLocation(item)" />
            </template>
          </UBadge>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <p class="font-black">
          A quick round of 'This or That'...
        </p>

        <div
          v-for="(options, category) in thisOrThat"
          :key="category"
        >
          <h3 class="text-neutral-500 font-medium mb-3">
            {{ category }}
          </h3>

          <URadioGroup
            v-model="selectedThisOrThat[category]"
            :items="options as unknown as string[]"
            indicator="hidden"
            variant="card"
            :ui="{
              wrapper: 'w-full',
              fieldset: 'grid grid-cols-2 gap-4',
            }"
          />
        </div>
      </div>

      <UButton
        class="block"
        @click="emits('updateStep', true)"
      >
        Continue
      </UButton>
    </div>

    <div>
      <NuxtImg
        src="/location-and-context.png"
        alt="Chef garnishing a food"
        class="rounded-lg w-full h-full shadow-xl shadow-primary-600/60"
      />
    </div>
  </div>
</template>
