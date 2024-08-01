<script setup lang="ts">
const props = defineProps<{
  colors: [string, string]
  count: number
  hideCount?: boolean
  width?: string
  height?: string
}>()
</script>

<template>
  <div class="root" v-if="props.colors">
    <div
      class="cell"
      :style="{
        width: props.width || '54px',
        height: props.height || '54px'
      }"
    >
      <div
        class="cell__item-1"
        :style="{
          backgroundColor: props.colors[0]
        }"
      ></div>
      <div
        class="cell__item-2"
        :style="{
          backgroundColor: props.colors[1]
        }"
      ></div>
    </div>
    <div v-show="!props.hideCount" class="badge">
      <span draggable="false">
        {{ props.count }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.root {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 10;

  .cell {
    position: relative;
    &__item-1 {
      position: absolute;
      width: 90%;
      height: 90%;
      left: 0;
      bottom: 0;
    }
    &__item-2 {
      position: absolute;
      right: 0;
      width: 90%;
      height: 90%;
      top: 0;
      backdrop-filter: blur(16px);
    }
  }

  .badge {
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 16px;
    height: 16px;
    border-top-left-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color);
    font-size: 10px;
    color: var(--border-color);
  }
}
</style>
