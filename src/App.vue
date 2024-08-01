<script setup lang="ts">
import ThemeProvider from './components/ThemeProvider.vue'
import AppFooter from './components/AppFooter.vue'
import SideBar from './components/SideBar.vue'
import AppBoard from './components/AppBoard.vue'
</script>

<template>
  <ThemeProvider>
    <div class="app">
      <div class="container layout">
        <main class="main">
          <SideBar />
          <AppBoard />
        </main>
        <AppFooter />
      </div>
    </div>
  </ThemeProvider>
</template>

<style scoped lang="scss">
.app {
  background-color: var(--bg-color);
  height: 100vh;
}

.main {
  display: flex;
  gap: 24px;
}
</style>
