<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchGet } from '../servicios/api'
import { formatCurrency } from '../utilidades/formatters'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true)
const recibos = ref([])
const departamentos = ref([])
const ocupaciones = ref([])

onMounted(async () => {
  try {
    const [r, d, o] = await Promise.all([
      fetchGet('obtenerRecibos'),
      fetchGet('obtenerDepartamentos'),
      fetchGet('obtenerOcupaciones')
    ])
    recibos.value = r || []
    departamentos.value = d || []
    ocupaciones.value = o || []
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
})

const totalRecibos = computed(() => recibos.value.length)
const ultimoRecibo = computed(() => recibos.value.length ? recibos.value[recibos.value.length - 1] : null)
const totalDptos = computed(() => departamentos.value.length)
const ocupantesActivos = computed(() => ocupaciones.value.filter(o => !o.fecha_salida).length)
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">👋 Panel de Control</h1>
      <p class="text-slate-500 mt-1 text-sm">Resumen general del condominio en tiempo real</p>
    </div>

    <!-- Skeleton loader -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      <div v-for="i in 3" :key="i" class="card p-6 animate-pulse">
        <div class="h-3 bg-slate-200 rounded w-24 mb-4"></div>
        <div class="h-8 bg-slate-200 rounded w-20 mb-2"></div>
        <div class="h-2 bg-slate-100 rounded w-32"></div>
      </div>
    </div>

    <div v-else class="space-y-6">
      <!-- TARJETAS MÉTRICAS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Recibos Emitidos -->
        <div class="card p-6 relative overflow-hidden group border-l-4 border-l-blue-400 hover:shadow-lg transition-all duration-300">
          <div class="absolute -right-8 -top-8 w-28 h-28 bg-blue-100 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Recibos Emitidos</h3>
            </div>
            <span class="text-4xl font-black text-slate-900">{{ totalRecibos }}</span>
            <p class="text-xs text-slate-400 mt-1">Periodos facturados en total</p>
          </div>
        </div>

        <!-- Último Total -->
        <div class="card p-6 relative overflow-hidden group border-l-4 border-l-emerald-400 hover:shadow-lg transition-all duration-300">
          <div class="absolute -right-8 -top-8 w-28 h-28 bg-emerald-100 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Último Recibo</h3>
            </div>
            <span class="text-4xl font-black text-slate-900">{{ ultimoRecibo ? formatCurrency(ultimoRecibo.total) : 'S/ 0.00' }}</span>
            <p class="text-xs text-slate-400 mt-1">Monto total del último periodo</p>
          </div>
        </div>

        <!-- Ocupación -->
        <div class="card p-6 relative overflow-hidden group border-l-4 border-l-violet-400 hover:shadow-lg transition-all duration-300">
          <div class="absolute -right-8 -top-8 w-28 h-28 bg-violet-100 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center shadow-md shadow-violet-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              </div>
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Ocupantes</h3>
            </div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-4xl font-black text-slate-900">{{ ocupantesActivos }}</span>
              <span class="text-lg font-bold text-slate-300">/ {{ totalDptos }}</span>
            </div>
            <p class="text-xs text-slate-400 mt-1">Inquilinos activos actualmente</p>
          </div>
        </div>
      </div>

      <!-- BARRA DE ACCIONES RÁPIDAS -->
      <div class="card p-6 bg-gradient-to-r from-slate-50 to-blue-50/50">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-800">¡Bienvenido al Sistema!</h2>
              <p class="text-sm text-slate-500">Selecciona una opción para comenzar a gestionar el condominio.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button @click="router.push('/recibos')" class="btn-primary text-sm">📄 Generar Recibo</button>
            <button @click="router.push('/departamentos')" class="btn-secondary text-sm">🏠 Ver Dptos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
