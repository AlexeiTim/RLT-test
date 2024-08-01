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
.root {
  background: var(--main-gradient);
}
</style>
