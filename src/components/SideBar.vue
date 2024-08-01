<script setup lang="ts">
import testIMG from '@/assets/test-img.png'
import { useTheme } from '@/composables/useTheme'
import AppSkeleton from './AppSkeleton.vue'

const { toggleTheme } = useTheme()
</script>

<template>
  <div class="sidebar">
    <img :src="testIMG" alt="test-img" />
    <div class="skeletons">
      <AppSkeleton
        @click="toggleTheme"
        class="skeletons__top"
        width="190px"
        height="26px"
        rounded="8px"
        ><p style="color: white; text-align: center; cursor: pointer">Toggle Theme</p></AppSkeleton
      >
      <div class="skeletons__sub">
        <AppSkeleton
          width="155px"
          height="10px"
          rounded="4px"
          class="skeletons__sub_item"
        ></AppSkeleton>
        <AppSkeleton width="190px" height="10px" rounded="4px" class="skeletons__sub_item" />
        <AppSkeleton width="170px" height="10px" rounded="4px" class="skeletons__sub_item" />
        <AppSkeleton width="160px" height="10px" rounded="4px" class="skeletons__sub_item" />
        <AppSkeleton width="140px" height="10px" rounded="4px" class="skeletons__sub_item" />
      </div>
      <AppSkeleton width="80px" height="10px" rounded="8px" class="skeletons__footer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  background-color: var(--bg-sub-color);
  border-color: var(--border-color);
  border-radius: 12px;
  width: 236px;
  padding: 18px 14px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skeletons {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  &__sub {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
