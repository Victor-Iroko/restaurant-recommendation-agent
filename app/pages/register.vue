<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth-layout',
})

const { showError, showSuccess } = useNotify()
const { providers, callbackURL } = useSocialProviders('Sign up')

async function onSubmit(payload: FormSubmitEvent<RegisterFormData>) {
  // Use the signUp method from your authClient
  await authClient.signUp.email({
    email: payload.data.email,
    password: payload.data.password,
    name: payload.data.name,
    callbackURL: callbackURL.value,
    fetchOptions: {
      headers: getCsrfHeaders(),
      onResponse: () => {
        showSuccess('Account Created', 'Please check your email to verify your account.')
        navigateTo('/')
      },
      onError: (response) => {
        showError('Registration Failed', response.error)
      },
    },
  })
}

const fields: AuthFormField[] = [
  {
    type: 'text',
    name: 'name',
    label: 'Full Name',
    required: true,
    placeholder: 'Enter your name',
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    placeholder: 'Enter your email',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    placeholder: 'Enter your password',
  },
  {
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm Password',
    required: true,
    placeholder: 'Confirm your password',
  },
]
</script>

<template>
  <UAuthForm
    :schema="registerSchema"
    title="Create Your Account"
    description="Get started with personalized recommendations."
    icon="streamline-pixel:beauty-healthy-food-dish"
    :fields="fields"
    :providers="providers"
    @submit="onSubmit"
  >
    <template #footer>
      <div class="text-center">
        <ULink to="/" class="text-primary-700">
          Already have an account? Login
        </ULink>
      </div>
    </template>
  </UAuthForm>
</template>
