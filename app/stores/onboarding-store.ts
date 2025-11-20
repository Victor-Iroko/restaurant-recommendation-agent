import type { RadioGroupProps } from '@nuxt/ui'

export const useOnboardingStore = defineStore('onboarding', () => {
  const dietaryOptions = [
    'Halal',
    'Vegetarian',
    'Vegan',
    'Nut Allergy',
    'Lactose Intolerant',
    'Gluten-Free',
    'Other',
  ] as const

  const budgetOptions = [
    'Under ₦3,000',
    '₦3,000 - ₦7,000',
    '₦7,000 - ₦15,000',
    '₦15,000+',
  ] as const

  const flavourOptions = [
    { name: 'Local Classics', src: '/flavours/local-classics.png' },
    { name: 'Spicy & Savoury', src: '/flavours/spices.png' },
    { name: 'Rice Dishes', src: '/flavours/rice.png' },
    { name: 'Grills & Barbecue', src: '/flavours/bbq.png' },
    { name: 'Continental', src: '/flavours/continental.png' },
    { name: 'Pizza', src: '/flavours/pizza.png' },
    { name: 'Asian', src: '/flavours/asian.png' },
    { name: 'Pastries & Cafe', src: '/flavours/pastries.png' },
  ] as const satisfies { name: string, src: string }[]

  const diningHabits = [
    { label: 'Quick Weekday Lunch', value: 'Quick Weekday Lunch', icon: 'i-mdi:hamburger' },
    { label: 'Casual Dinner', value: 'Casual Dinner', icon: 'i-material-symbols-light:dinner-dining-outline' },
    { label: 'Family Outing', value: 'Family Outing', icon: 'i-material-symbols:family-restroom' },
    { label: 'Romantic Date', value: 'Romantic Date', icon: 'i-material-symbols:favorite-rounded' },
    { label: 'Business', value: 'Business', icon: 'i-material-symbols:business-center-rounded' },
    { label: 'Special Occasion', value: 'Special Occasion', icon: 'i-material-symbols:celebration' },
  ] as const satisfies RadioGroupProps['items']

  const idealVibe = [
    'Lively and Loud',
    'Quiet and Cozy',
    'Upscale and Polished',
    'Casual',
    'Great views',
    'Instragrammable',
  ] as const

  const thisOrThat = {
    'Rainy day': ['Order in', 'Cozy Spot'],
    'Weekday Lunch': ['Sharwarma', 'Sit-down rice'],
    'Friday night': ['Lively lounge', 'Quiet dinner'],
  } as const

  type ThisOrThat = typeof thisOrThat

  type SelectedThisOrThat = {
    -readonly [K in keyof ThisOrThat]: ThisOrThat[K][number]
  }

  const selectedDietary = ref<(typeof dietaryOptions)[number][]>([])
  const otherDietary = ref('')
  const selectedBudget = ref<typeof budgetOptions[number] | null>(null)
  const selectedFlavours = ref<(typeof flavourOptions)[number]['name'][]>([])
  const personalizedRecommendations = ref<{ likes: string, dislikes: string[] }>({
    likes: '',
    dislikes: [],
  })
  const selectedDiningHabit = ref<(typeof diningHabits)[number]['label'] | undefined>(undefined)
  const selectedIdealVibe = ref<(typeof idealVibe)[number][]>([])
  const visitedAreas = ref<string[]>([])
  const selectedThisOrThat = ref<Partial<SelectedThisOrThat>>({})

  function reset() {
    selectedDietary.value = []
    otherDietary.value = ''
    selectedBudget.value = null
    selectedFlavours.value = []
    personalizedRecommendations.value = { likes: '', dislikes: [] }
    selectedDiningHabit.value = undefined
    selectedIdealVibe.value = []
    visitedAreas.value = []
    selectedThisOrThat.value = {}
  }

  return {
    dietaryOptions,
    budgetOptions,
    selectedDietary,
    otherDietary,
    selectedBudget,
    flavourOptions,
    selectedFlavours,
    personalizedRecommendations,
    diningHabits,
    selectedDiningHabit,
    idealVibe,
    selectedIdealVibe,
    thisOrThat,
    visitedAreas,
    selectedThisOrThat,
    reset,
  }
}, {
  persist: true,
})
