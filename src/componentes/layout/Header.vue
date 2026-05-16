<script setup>
</script>

<template>
  <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
    <div class="flex items-center">
      <!-- Buscador sutil (visual) -->
      <div class="relative hidden sm:block">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Buscar..." class="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none w-64 transition-all" />
      </div>
    </div>
    
    <div class="flex items-center gap-6">
      <!-- Botón de Notificaciones con indicador rojo -->
      <button class="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <!-- Perfil de Usuario Premium -->
      <div class="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group">
        <div class="flex flex-col items-end">
          <span class="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">Administrador</span>
          <span class="text-xs text-slate-500">Condominio</span>
        </div>
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-brand-500 text-white font-bold flex items-center justify-center shadow-md shadow-brand-500/20 ring-2 ring-white">
          A
        </div>
      </div>
    </div>
  </header>
</template>
