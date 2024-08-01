import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('dark')

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme
  }
}
