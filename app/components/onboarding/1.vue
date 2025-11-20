<script setup lang="ts">
const emits = defineEmits<{
  updateStep: [step: boolean]
}>()

const onBoardingStore = useOnboardingStore()
const { selectedBudget, selectedDietary, otherDietary } = storeToRefs(onBoardingStore)

// Logic
function toggleDietary(option: typeof onBoardingStore.dietaryOptions[number]) {
  if (selectedDietary.value.includes(option)) {
    selectedDietary.value = selectedDietary.value.filter(i => i !== option)

    if (option === 'Other')
      otherDietary.value = ''
  }
  else {
    selectedDietary.value.push(option)
  }
}

function selectBudget(option: typeof onBoardingStore.budgetOptions[number]) {
  if (selectedBudget.value === option) {
    selectedBudget.value = null // deselect
  }
  else {
    selectedBudget.value = option
  }
}
</script>

<template>
  <UCard>
    <!-- Page Heading -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
        Tell us about your preferences
      </h1>
      <p class="mt-2 text-base text-neutral-500">
        This helps us filter recommendations to find your perfect meal.
      </p>
    </div>

    <div class="space-y-10">
      <!-- Dietary Restrictions Section -->
      <fieldset>
        <legend class="text-xl font-bold leading-tight tracking-tight">
          Dietary Restrictions & Allergies
        </legend>
        <p class="mt-1 text-sm text-neutral-500">
          Select all that apply. This helps us filter out places you can't eat.
        </p>

        <!-- Multi-select Chips -->
        <div class="mt-4 flex flex-wrap gap-3">
          <UButton
            v-for="option in onBoardingStore.dietaryOptions"
            :key="option"
            :label="option"
            size="md"
            :ui="{ base: 'rounded-full' }"
            :variant="selectedDietary.includes(option) ? 'solid' : 'soft'"
            :color="selectedDietary.includes(option) ? 'primary' : 'neutral'"
            class="transition-all duration-200"
            @click="toggleDietary(option)"
          />
        </div>

        <div v-if="selectedDietary.includes('Other')">
          <UInput
            v-model="otherDietary"
            label="Please specify"
            placeholder="e.g., Shellfish Allergy"
            class="mt-4"
            :ui="{
              root: 'block',
            }"
          />
        </div>
      </fieldset>

      <!-- Meal Budget Section -->
      <fieldset>
        <legend class="text-xl font-bold leading-tight tracking-tight">
          Typical Meal Budget (per person)
        </legend>
        <p class="mt-1 text-sm text-neutral-500">
          What's your usual sweet spot for a meal out?
        </p>

        <!-- Single-select Grid -->
        <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <UButton
            v-for="option in onBoardingStore.budgetOptions"
            :key="option"
            :label="option"
            block
            size="lg"
            :variant="selectedBudget === option ? 'solid' : 'soft'"
            :color="selectedBudget === option ? 'primary' : 'neutral'"
            class="h-12"
            @click="selectBudget(option)"
          />
        </div>
      </fieldset>
    </div>

    <!-- Action Buttons -->
    <template #footer>
      <div class="pt-2">
        <!-- Added padding to separate from body content visual -->
        <UButton
          block
          size="xl"
          color="primary"
          class="font-semibold shadow-sm"
          trailing-icon="i-heroicons-arrow-right-20-solid"
          :ui="{
            trailingIcon: 'm-0',
          }"
          @click="emits('updateStep', true)"
        >
          Continue
        </UButton>
      </div>
    </template>
  </UCard>
</template>
