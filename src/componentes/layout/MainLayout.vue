<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-slate-50">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 w-0 overflow-hidden">
      <Header />
      
      <!-- Scrollable Main Content -->
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-8 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
          <!-- Transición sutil entre vistas -->
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
