<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Menú lateral con Glassmorphism y degradados premium -->
  <aside class="hidden md:flex flex-col w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 shadow-2xl z-20">
    <div class="flex items-center justify-center h-20 border-b border-white/10 px-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
        <h2 class="text-xl font-bold text-white tracking-tight leading-tight">
          Condominio<br><span class="text-sm font-medium text-slate-400">Familiar</span>
        </h2>
      </div>
    </div>
    
    <nav class="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-hide">
      <!-- Dashboard -->
      <RouterLink to="/" class="nav-item group" active-class="nav-item-active">
        <div class="nav-icon-bg group-hover:bg-brand-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:text-brand-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        </div>
        <span class="font-medium">Dashboard</span>
      </RouterLink>
      
      <!-- Recibos -->
      <RouterLink to="/recibos" class="nav-item group" active-class="nav-item-active">
        <div class="nav-icon-bg group-hover:bg-emerald-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:text-emerald-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <span class="font-medium">Recibos</span>
      </RouterLink>
      
      <!-- Propietarios -->
      <RouterLink to="/propietarios" class="nav-item group" active-class="nav-item-active">
        <div class="nav-icon-bg group-hover:bg-purple-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:text-purple-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <span class="font-medium">Propietarios</span>
      </RouterLink>
      
      <!-- Departamentos -->
      <RouterLink to="/departamentos" class="nav-item group" active-class="nav-item-active">
        <div class="nav-icon-bg group-hover:bg-amber-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>
        <span class="font-medium">Departamentos</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
@reference "../../style.css";

.nav-item {
  @apply flex items-center px-3 py-2.5 text-sm rounded-xl text-slate-300 transition-all duration-200 ease-in-out hover:bg-white/5 hover:text-white;
}

.nav-icon-bg {
  @apply flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-slate-400 mr-3 transition-colors duration-200;
}

/* Estado Activo */
.nav-item-active {
  @apply bg-brand-500/10 text-white border border-brand-500/20 shadow-[inset_0_0_12px_rgba(14,165,233,0.1)];
}

.nav-item-active .nav-icon-bg {
  @apply bg-brand-500 text-white shadow-md shadow-brand-500/30;
}
</style>
