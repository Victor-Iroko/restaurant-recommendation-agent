import { z } from 'zod'

export const onboardingSchema = z.object({
  // Arrays of strings for multi-selects
  dietary: z.array(z.string()),

  // Optional string for the "Other" input
  otherDietary: z.string().optional().or(z.literal('')),

  // Nullable string for budget (starts as null in store)
  budget: z.string().nullable(),

  // Array of selected flavour names
  flavours: z.array(z.string()),

  // Nested object for text inputs
  recommendations: z.object({
    likes: z.string().optional().or(z.literal('')),
    dislikes: z.array(z.string()).default([]),
  }),

  // Optional string for radio selection
  diningHabit: z.string().optional(),

  // Array for vibe selection
  idealVibe: z.array(z.string()),

  // Array of strings for visited areas
  visitedAreas: z.array(z.string()),

  // Object with specific keys for "This or That"
  // Using .optional() for properties because the user might skip questions
  thisOrThat: z.object({
    'Rainy day': z.string().optional(),
    'Weekday Lunch': z.string().optional(),
    'Friday night': z.string().optional(),
  }).optional(),
})

// Export the type to use in your backend handler
export type OnboardingPayload = z.infer<typeof onboardingSchema>
