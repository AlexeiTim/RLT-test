<template>
  <div class="root" :style="styles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rounded?: string
  width?: string
  height?: string
}>()

const styles = computed(() => ({
  borderRadius: props.rounded || '12px',
  width: props.width || '100px',
  height: props.height || '20px'
}))
</script>

<style scoped lang="scss">
@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.root {
  background: var(--main-gradient);
  background-size: 400% 100%;
  animation: skeleton-loading 4s infinite linear;
}
</style>
