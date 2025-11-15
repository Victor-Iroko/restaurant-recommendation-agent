<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth-layout',
})

const route = useRoute()
const { showError, showSuccess } = useNotify()
const token = route.query.token as string | undefined

async function onSubmit(payload: FormSubmitEvent<ResetPasswordFormData>) {
  if (!token) {
    showError('Invalid Link', { message: 'The password reset link is missing or invalid.' })
    return
  }

  await authClient.resetPassword({
    token,
    newPassword: payload.data.password,
    fetchOptions: {
      headers: getCsrfHeaders(),
      onResponse: () => {
        showSuccess('Password Reset Successful', 'You can now log in with your new password.')
        navigateTo('/')
      },
      onError: (response) => {
        showError('Password Reset Failed', response.error)
      },
    },
  })
}

const fields: AuthFormField[] = [
  {
    type: 'password',
    name: 'password',
    label: 'New Password',
    required: true,
    placeholder: 'Enter your new password',
  },
  {
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm New Password',
    required: true,
    placeholder: 'Confirm your new password',
  },
]
</script>

<template>
  <div v-if="!token" class="text-center space-y-4">
    <UIcon name="streamline-pixel:link-broken" class="text-5xl text-red-500" />
    <h2 class="text-2xl font-bold">
      Invalid Link
    </h2>
    <p class="text-gray-600 dark:text-gray-300">
      This password reset link is invalid or has expired. Please return to the
      'Forgot Password' page to request a new link.
    </p>
    <UButton to="/forgot-password" label="Go to Forgot Password" variant="link" />
  </div>

  <UAuthForm
    v-else
    :schema="resetPasswordSchema"
    title="Set Your New Password"
    description="Enter and confirm your new password below."
    icon="streamline-pixel:lock-shield"
    :fields="fields"
    :providers="[]"
    submit-label="Reset Password"
    @submit="onSubmit"
  >
    <template #footer>
      <div class="text-center">
        <ULink to="/" class="text-primary-700">
          Back to Login
        </ULink>
      </div>
    </template>
  </UAuthForm>
</template>
