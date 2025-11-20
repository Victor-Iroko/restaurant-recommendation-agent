<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth-layout',
})

const { showError } = useNotify()
const { providers, callbackURL } = useSocialProviders('Sign in')

async function onSubmit(payload: FormSubmitEvent<LoginFormData>) {
  await authClient.signIn.email({
    email: payload.data.email,
    password: payload.data.password,
    rememberMe: payload.data.remember,
    callbackURL: callbackURL.value,
    fetchOptions: {
      headers: getCsrfHeaders(),
      onError: (response) => {
        showError('Login failed', response.error)
      },
    },
  })
}

const fields: AuthFormField[] = [
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
    name: 'remember',
    type: 'checkbox',
    label: 'Remember me',
  },
]
</script>

<template>
  <UAuthForm
    :schema="loginSchema"
    title="Find Your Next Favorite Meal"
    description="Login to get personalized recommendations."
    icon="streamline-pixel:beauty-healthy-food-dish"
    :fields="fields"
    :providers="providers"
    @submit="onSubmit"
  >
    <template #footer>
      <div class="flex justify-between">
        <ULink to="/forgot-password" class="text-primary">
          Forgot Password?
        </ULink>
        <ULink to="/register" class="text-primary">
          Don't have an account? Signup
        </ULink>
      </div>
    </template>
  </UAuthForm>
</template>
