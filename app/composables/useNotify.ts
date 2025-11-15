export function useNotify() {
  const toast = useToast()

  const showError = (title: string, error: Error | { message: string }) => {
    toast.add({
      title,
      description: error.message || 'An unknown error occurred.',
      color: 'error',
    })
  }

  const showSuccess = (title: string, description: string) => {
    toast.add({
      title,
      description,
      color: 'success',
    })
  }

  return {
    showError,
    showSuccess,
  }
}
