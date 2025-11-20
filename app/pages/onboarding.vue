<script setup lang="ts">
import onBoarding1 from '~/components/onboarding/1.vue'
import onBoarding2 from '~/components/onboarding/2.vue'
import onBoarding3 from '~/components/onboarding/3.vue'
import onBoarding4 from '~/components/onboarding/4.vue'
import onBoarding5 from '~/components/onboarding/5.vue'

definePageMeta({
  middleware: () => {
    const authStore = useAuthStore()
    if (authStore.user?.onBoarded === true) {
      return navigateTo('/home')
    }
  },
})

const step = ref(1)

const onboardingComponents = [
  onBoarding1,
  onBoarding2,
  onBoarding3,
  onBoarding4,
  onBoarding5,
]

const totalSteps = onboardingComponents.length

const currentComponent = computed(() => {
  return onboardingComponents[step.value - 1]
})

const { $csrfFetch } = useNuxtApp()
const onboardingStore = useOnboardingStore()
const { showError, showSuccess } = useNotify()
async function nextStep() {
  if (step.value < totalSteps) {
    step.value++
  }
  else {
    const payload: OnboardingPayload = {
      dietary: onboardingStore.selectedDietary,
      otherDietary: onboardingStore.otherDietary,
      budget: onboardingStore.selectedBudget,
      flavours: onboardingStore.selectedFlavours,
      recommendations: onboardingStore.personalizedRecommendations,
      diningHabit: onboardingStore.selectedDiningHabit,
      idealVibe: onboardingStore.selectedIdealVibe,
      visitedAreas: onboardingStore.visitedAreas,
      thisOrThat: onboardingStore.selectedThisOrThat,
    }

    try {
      await $csrfFetch('/api/onboarding', {
        method: 'POST',
        body: payload,
      })

      onboardingStore.reset()

      showSuccess('Sucessfully onboarded!', 'You have been successfully onboarded')

      await navigateTo('/home', { external: true })
    }
    catch (error) {
      if (error instanceof Error) {
        showError(
          'An Error has occured while submitting the onboarding preferences',
          error,
        )
      }
    }
  }
}

function previousStep() {
  if (step.value > 1) {
    step.value--
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f8f6f6] dark:bg-[#221510] flex items-center justify-center">
    <UContainer
      class="max-w-2xl" :class="{
        'max-w-4xl': step === 2,
        'max-w-5xl': step === 5,
      }"
    >
      <div class="mb-8 px-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm">Step {{ step }} of {{ totalSteps }}</span>
          <div class="flex items-center">
            <UColorModeButton />
            <UButton
              variant="link"
              :padded="false"
              color="primary"
              class="text-sm"
              @click="previousStep"
            >
              Previous
            </UButton>
            <UButton
              variant="link"
              :padded="false"
              color="primary"
              class="text-sm"
              @click="nextStep"
            >
              Skip for now
            </UButton>
          </div>
        </div>
        <UProgress v-model="step" :max="totalSteps" size="sm" />
      </div>
      <component
        :is="currentComponent"
        @update-step="nextStep"
      />
      <!-- <NuxtPage @update-step="skip" /> -->
    </UContainer>
  </div>
</template>
