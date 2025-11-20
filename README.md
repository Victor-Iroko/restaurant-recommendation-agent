# Aim
I'm building a restaurant recommendation system using llms that will give personalized  and contextual (location, time, weather, etc.) recommendations to users. I'm limiting the scope to just restaurants in Ibadan, Nigeria.

### Onboarding questions
### 1. The "Must-Haves" (Dietary & Dealbreakers)

These are crucial filtering questions. Getting these wrong ruins trust.

* **Q: Do you have any dietary restrictions or allergies we must know about?**
    * **Type:** Multiple-select (with "Other" field)
    * **Options:**
        * Halal
        * Vegetarian
        * Vegan
        * Nut Allergy
        * Lactose Intolerant
        * Gluten-Free
        * Other (text field)
    * **Developer's Note:** This is a hard filter. The LLM's prompt must be engineered to *always* exclude places that don't meet these requirements.

* **Q: On average, what's your typical budget for a meal out (per person)?**
    * **Type:** Single-select
    * **Options:** (Using Naira ranges for Ibadan)
        * **₦** (Wallet-Friendly: Under ₦3,000)
        * **₦₦** (Casual: ₦3,000 - ₦7,000)
        * **₦₦₦** (Treat-Yourself: ₦7,000 - ₦15,000)
        * **₦₦₦₦** (Fine Dining: ₦15,000+)
    * **Developer's Note:** This sets a "default" price point. The user can always ask for other options, but the LLM will bias its initial suggestions toward this range.

### 2. The "Flavor Profile" (Cuisine & Food Preferences)

This section builds the core taste profile.

* **Q: What are your go-to flavors? Pick your top 3!**
    * **Type:** "Select Top 3" or "Drag-to-Rank"
    * **Options:**
        * **Local Classics** (e.g., Amala, Pounded Yam, Ofada)
        * **Spicy & Savory** (e.g., Peppersoup, Asun)
        * **Rice Dishes** (e.g., Jollof, Fried Rice, Biryani)
        * **Grills & BBQ** (e.g., Shawarma, Suya, Grilled Fish)
        * **Continental** (e.g., Pasta, Burgers, Sandwiches)
        * **Pizza**
        * **Asian** (e.g., Chinese, Stir-fry)
        * **Pastries & Cafes** (e.g., Coffee, Cakes, Meatpies)
    * **Developer's Note:** This is high-signal data. The LLM can create a weighted list of preferred food tags based on these selections.

* **Q: To help us learn your taste, what's your all-time favorite dish to eat in Ibadan?**
    * **Type:** Open-text field (Optional)
    * **Developer's Note:** This is a *fantastic* prompt for an LLM. A user writing "The special grilled fish at [Restaurant Name]" gives you a *ton* of implicit data (likes fish, grills, a specific restaurant, maybe a social vibe) that can be embedded and used for future similarity searches.

* **Q: Are there any foods you *absolutely* dislike?**
    * **Type:** Open-text field / Tag input (Optional)
    * **Options:** (e.g., "Okra", "Snails", "Too much pepper")
    * **Developer's Note:** This is the *negative* filter. Just as important as what they like. "Don't recommend places known for their okra soup."

### 3. The "Vibe Check" (Ambiance & Social Context)

This is about the *experience*, which is just as important as the food.

* **Q: What's the main reason you usually go out to eat?**
    * **Type:** Single-select
    * **Options:**
        * Quick Weekday Lunch
        * Casual Dinner with Friends
        * Family Outing (with kids)
        * Romantic Date
        * Business/Work Meetings
        * Celebrating a Special Occasion
    * **Developer's Note:** This helps the LLM understand the user's *primary use case*.

* **Q: Pick your ideal atmosphere (Choose up to 2):**
    * **Type:** Multiple-select
    * **Options:**
        * **Lively & Loud** (e.g., Sports bar, music, busy)
        * **Quiet & Cozy** (e.g., Good for conversation, relaxing)
        * **Upscale & Polished** (e.g., "Dress to impress")
        * **Casual & "Come as you are"** (e.g., Buka, fast-casual)
        * **Great Views or Outdoor Seating**
        * **"Instagrammable"** (e.g., Beautiful decor)

### 4. The "Context-Builders" (Location & Time)

These questions help anchor the *contextual* part of your app.

* **Q: To help us find spots *near you*, what areas in Ibadan do you visit most?**
    * **Type:** Multiple-select (with search)
    * **Options:** (List major Ibadan neighborhoods)
        * Bodija
        * Ring Road
        * Jericho / Iyaganku
        * UI / Agbówò
        * Challenge
        * Dugbe
        * Mokola
        * [Other]
    * **Developer's Note:** This establishes "home" and "work" zones. When the user asks "something near me," the LLM can prioritize these areas if precise location data isn't available or if the user is at home.

* **Q: Let's do a quick "This or That" to understand your context:**
    * **Type:** Series of binary choices
    * **Questions:**
        * **On a rainy day:** Order In **OR** Cozy spot with hot soup?
        * **Weekday lunch:** Quick Shawarma **OR** Sit-down rice dish?
        * **Friday night:** Lively lounge with friends **OR** A quiet, nice dinner?
    * **Developer's Note:** This is *gold* for your LLM. You are explicitly training it on the user's preferences *given a context* (weather, time of week). You can save these as key-value pairs: `{'weather': 'rain', 'preference': 'cozy_soup'}`.

---

### 💡 Onboarding Best Practices

1.  **Make it Skippable:** Always have a "Skip for now" button. A user might be hungry *right now* and just want a recommendation. Forcing onboarding is the #1 cause of drop-off.
2.  **Show Progress:** Use a progress bar (e.g., "Step 1 of 4"). It makes the process feel finite and manageable.
3.  **Explain the "Why":** Add a small sub-text: "Answering these 5 questions helps us find your perfect spot, every time." This tells the user *why* they are doing this, increasing completion rates.
4.  **Use Visuals:** Instead of just text, use icons or images for the vibe/cuisine questions (e.g., an icon of a burger, a plate of amala, a "quiet" icon). It makes it faster and more engaging.

Would you like to brainstorm how you might structure this data (e.g., in a JSON object) to be most effective when a user makes their first request to the LLM?

```JSON
{
  "userId": "user_12345_abcde",
  "metadata": {
    "onboardingCompleted": true,
    "profileCreatedAt": "2025-11-17T10:30:00Z",
    "profileLastUpdated": "2025-11-17T10:35:00Z"
  },
  // --- Section 1: Hard Filters ---
  // These are non-negotiable rules for the LLM.
  "filters": {
    "dietary": ["HALAL", "NUT_ALLERGY"],
    "budget": "BUDGET_CASUAL", // User's default (₦3k-₦7k)
    "dislikedFoods": ["Okra", "Snails", "Excessively peppery"]
  },
  // --- Section 2: Soft Preferences ---
  // These are for biasing and weighting. The LLM should try to match these.
  "preferences": {
    "favoriteCuisines": [
      "GRILLS_BBQ", // Top choice
      "LOCAL_CLASSICS", // Second choice
      "CONTINENTAL" // Third choice
    ],
    "favoriteDishExample": "I really love the grilled fish and spicy plantain at Latitude.",
    "primaryUseCases": ["CASUAL_FRIENDS", "FAMILY_OUTING"],
    "ambiance": ["LIVELY", "OUTDOOR_SEATING"]
  },
  // --- Section 3: Contextual Triggers ---
  // These are special rules to apply *only* when the context matches.
  "contextualTriggers": {
    "preferredNeighborhoods": ["BODIJA", "JERICHO", "UI"],
    "scenarios": [
      {
        "condition": "WEATHER_RAIN",
        "preference": "COZY_SPOT"
      },
      {
        "condition": "TIME_WEEKDAY_LUNCH",
        "preference": "QUICK_SHAWARMA"
      },
      {
        "condition": "TIME_FRIDAY_NIGHT",
        "preference": "LIVELY_LOUNGE"
      }
    ]
  }
}
```
