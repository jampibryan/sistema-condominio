<script setup>
</script>

<template>
  <div>
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Panel de Control</h1>
        <p class="text-slate-500 mt-1">Resumen del estado actual del condominio.</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Tarjeta 1 -->
      <div class="card p-6 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-brand-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Recibos Emitidos</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-extrabold text-slate-900">0</span>
            <span class="text-sm font-medium text-emerald-500">+0%</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">En el mes actual</p>
        </div>
      </div>
      
      <!-- Tarjeta 2 -->
      <div class="card p-6 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Recaudado</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-extrabold text-slate-900">S/ 0.00</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Ingresos del mes</p>
        </div>
      </div>
      
      <!-- Tarjeta 3 -->
      <div class="card p-6 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Ocupación</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-extrabold text-slate-900">0</span>
            <span class="text-lg font-semibold text-slate-400">/ 14</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Departamentos habitados</p>
        </div>
      </div>
    </div>

    <!-- Bienvenida flotante -->
    <div class="glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-800 mb-2">Bienvenido al Sistema</h2>
        <p class="text-slate-500 max-w-lg">Todo está listo. Selecciona "Recibos" en el menú izquierdo para generar los cobros del mes actual.</p>
      </div>
      <div class="mt-6 md:mt-0">
        <button class="btn-primary">Ver Recibos Recientes</button>
      </div>
    </div>
  </div>
</template>
