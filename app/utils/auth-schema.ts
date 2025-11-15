import z from 'zod'

// --- Login ---
export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  remember: z.boolean().optional(),
})
export type LoginFormData = z.infer<typeof loginSchema>

// --- Register ---
export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Show error on the confirmPassword field
  })
export type RegisterFormData = z.infer<typeof registerSchema>

// --- Forgot Password ---
export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
})
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

// --- Reset Password ---
export const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
