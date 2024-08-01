<template>
  <input class="root" v-model="modelValue" />
</template>

<script setup lang="ts">
const modelValue = defineModel()
</script>

<style scoped lang="scss">
.root {
  height: 40px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  outline: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  &::placeholder {
    color: var(--border-color);
  }
}
</style>
