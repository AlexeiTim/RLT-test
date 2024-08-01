<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  align?: 'start' | 'end' | 'center'
  justify?: 'start' | 'end' | 'space-between' | 'center'
  direction?: 'row' | 'column' | 'row-reverse'
  gap?: string
}>()

const styles = computed(() => ({
  alignItems: props.align || 'start',
  justifyContent: props.justify || 'start',
  flexDirection: props.direction || 'row',
  gap: props.gap || 0
}))
</script>

<template>
  <div :style="styles" class="root">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.root {
  display: flex;
  width: 100%;
}
</style>
