<script setup lang="ts">
const emits = defineEmits<{
  updateStep: [step: boolean]
}>()

const onBoardingStore = useOnboardingStore()
const { diningHabits, idealVibe } = onBoardingStore
const { selectedDiningHabit, selectedIdealVibe } = storeToRefs(onBoardingStore)

const MAX_IDEAL_VIBES_LIMIT = 2
function toggleVibe(vibe: (typeof idealVibe)[number]) {
  const isSelected = selectedIdealVibe.value.includes(vibe)

  if (isSelected) {
    selectedIdealVibe.value = selectedIdealVibe.value.filter(v => v !== vibe)
  }
  else {
    // Enforce max-2 limit
    if (selectedIdealVibe.value.length < MAX_IDEAL_VIBES_LIMIT) {
      selectedIdealVibe.value.push(vibe)
    }
  }
}
</script>

<template>
  <div class="px-4 flex flex-col gap-5">
    <h1 class="text-sm text-neutral-500">
      Your preferences
    </h1>

    <div class="space-y-1">
      <h2 class="text-3xl sm:text-4xl font-black">
        What are your dining habits?
      </h2>

      <p class="text-neutral-500/70">
        Help us find the perfect spot for any occasion.
      </p>
    </div>

    <div>
      <p class="font-black">
        What's the usual occasion?
      </p>
      <p class="text-sm text-neutral-700/70 dark:text-neutral-300/50">
        Select one
      </p>
    </div>

    <URadioGroup
      v-model="selectedDiningHabit"
      :items="diningHabits"
      indicator="end"
      variant="card"
      :ui="{
        fieldset: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
      }"
    >
      <template #label="{ item }">
        <div class="flex items-center gap-3">
          <UIcon
            v-if="item.icon"
            :name="item.icon"
            class="size-5 text-primary"
          />

          <span class="font-medium">{{ item.label }}</span>
        </div>
      </template>
    </URadioGroup>

    <div>
      <p class="font-black">
        Describe your Ideal Vibe
      </p>
      <p class="text-sm text-neutral-700/70 dark:text-neutral-300/50">
        Select up to two.
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <UButton
        v-for="option in idealVibe"
        :key="option"
        :label="option"
        size="md"
        :ui="{ base: 'rounded-full' }"
        :variant="selectedIdealVibe.includes(option) ? 'solid' : 'soft'"
        :color="selectedIdealVibe.includes(option) ? 'secondary' : 'neutral'"
        class="transition-all duration-200"
        :disabled="(selectedIdealVibe.length >= MAX_IDEAL_VIBES_LIMIT) && !(selectedIdealVibe.includes(option))"
        @click="toggleVibe(option)"
      />
    </div>

    <UButton
      class="block"
      @click="emits('updateStep', true)"
    >
      Continue
    </UButton>
  </div>
</template>
