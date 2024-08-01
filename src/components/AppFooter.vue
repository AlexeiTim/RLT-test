<script setup lang="ts">
import AppSkeleton from './AppSkeleton.vue'
import CloseIcon from './icons/CloseIcon.vue'
</script>

<template>
  <footer class="footer">
    <div class="footer__content">
      <AppSkeleton rounded="12px" width="699px" height="36px" />
      <div class="footer__close">
        <CloseIcon />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  height: 72px;
  position: relative;
  background-color: var(--bg-sub-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  &__content {
    padding: 18px;
  }

  &__close {
    padding: 6px;
    position: absolute;
    top: 8px;
    right: 8px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: var(--border-color);
    }
  }
}
</style>
