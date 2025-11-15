<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth-layout',
})

const { showError } = useNotify()
const emailSent = ref(false)
const submittedEmail = ref('')

async function onSubmit(payload: FormSubmitEvent<ForgotPasswordFormData>) {
  submittedEmail.value = payload.data.email

  await authClient.requestPasswordReset({
    email: payload.data.email,
    redirectTo: '/reset-password',
    fetchOptions: {
      headers: getCsrfHeaders(),
      onResponse: () => {
        emailSent.value = true
      },
      onError: (response) => {
        showError('Password Reset Failed', response.error)
        emailSent.value = true
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
]
</script>

<template>
  <div v-if="emailSent" class="text-center space-y-4">
    <UIcon name="streamline-pixel:mail-send-letter" class="text-5xl" />
    <h2 class="text-2xl font-bold">
      Check your email
    </h2>
    <p class="text-gray-600 dark:text-gray-300">
      If an account exists for <span class="font-semibold">{{ submittedEmail }}</span>, you will
      receive an email with instructions on how to reset your password.
    </p>
    <UButton to="/login" label="Back to Login" variant="link" />
  </div>

  <UAuthForm
    v-else
    :schema="forgotPasswordSchema"
    title="Forgot Password?"
    description="Enter your email to get a reset link."
    icon="streamline-pixel:lock-reset"
    :fields="fields"
    :providers="[]"
    submit-label="Send Reset Link"
    @submit="onSubmit"
  >
    <template #footer>
      <div class="text-center">
        <ULink to="/" class="text-primary-700">
          Remembered your password? Login
        </ULink>
      </div>
    </template>
  </UAuthForm>
</template>
