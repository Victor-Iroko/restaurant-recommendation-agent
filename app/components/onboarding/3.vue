<script setup lang="ts">
const emits = defineEmits<{
  updateStep: [step: boolean]
}>()

const onBoardingStore = useOnboardingStore()
const { personalizedRecommendations } = storeToRefs(onBoardingStore)
const dislike = ref('')

function addDislike() {
  const val = dislike.value.trim()
  if (val && !personalizedRecommendations.value.dislikes.includes(val)) {
    personalizedRecommendations.value.dislikes.push(val)
    dislike.value = ''
  }
}

function removeDislike(item: string) {
  personalizedRecommendations.value.dislikes = personalizedRecommendations.value.dislikes.filter(i => i !== item)
}
</script>

<template>
  <div class="space-y-12">
    <div>
      <h1 class="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
        Personalize Your <br> Recommendations
      </h1>
      <p class="text-secondary/70 mt-2">
        Tell us your taste to get the best food recommendations
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span class="font-semibold">What's the one dish in Ibadan you dream about?</span>
          <span class="text-sm text-neutral-500">Optional</span>
        </div>
        <span class="text-sm text-secondary/70">This helps us understand your gold stanrard for great food.</span>
        <UInput
          v-model="personalizedRecommendations.likes"
          class="block"
          placeholder="e.g. Amala with Gbegiri at Mama Ope's"
        />
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span class="font-semibold">What's on your 'no-go' list?</span>
          <span class="text-sm text-neutral-500">Optional</span>
        </div>
        <span class="text-sm text-secondary/70">Tell us about any foods or ingredients you dislike so we can avoid them</span>
        <UInput
          v-model="dislike"
          class="block"
          placeholder="Type a food or press Enter..."
          @keydown.enter.prevent="addDislike"
          @keydown.backspace="(!dislike && personalizedRecommendations.dislikes.length) ? personalizedRecommendations.dislikes.pop() : null"
        />

        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="item in personalizedRecommendations.dislikes"
            :key="item"
            color="secondary"
            variant="outline"
            size="md"
          >
            {{ item }}

            <template #trailing>
              <UIcon name="i-material-symbols:close-small" class="size-4 hover:cursor-pointer" @click="removeDislike(item)" />
            </template>
          </UBadge>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <UButton @click="emits('updateStep', true)">
        Continue
      </UButton>
    </div>
  </div>
</template>
