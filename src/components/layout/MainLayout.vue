<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="layout-wrapper">
    <Sidebar />
    <div class="main-wrapper">
      <Header />
      <main class="main-content">
        <!-- RouterView renderizará la vista correspondiente a la URL -->
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg-main);
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Evita desbordamientos en grid/flex */
}

.main-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
}
</style>
