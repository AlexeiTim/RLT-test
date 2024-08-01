<template>
  <button
    :class="[props.variant || 'primary', props.size || 'default']"
    :variant="props.variant || 'primary'"
    class="root"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: string
  size?: string
}>()
</script>

<style scoped lang="scss">
.root {
  cursor: pointer;
  transition: all 0.3s easy;
  outline: none;
  line-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  background-color: white;
  color: var(--text-main);
  padding: 11px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  font-family: 'SF Pro Display', sans-serif;

  &.danger {
    background-color: var(--danger-color);
    color: white;
    &:hover {
      background-color: var(--danger-hover-color);
    }
  }

  &.default {
    height: 39px;
  }
}
</style>
