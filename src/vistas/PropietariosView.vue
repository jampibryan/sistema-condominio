<script setup>
import { onMounted, computed } from 'vue'
import { useOcupaciones } from '../composables/useOcupaciones'
import { formatDate } from '../utilidades/formatters'

const { ocupaciones, isLoading, error, cargarOcupaciones } = useOcupaciones()

onMounted(cargarOcupaciones)

const vigentes = computed(() => ocupaciones.value.filter(o => !o.fecha_salida))
const finalizados = computed(() => ocupaciones.value.filter(o => o.fecha_salida))

const avatarColors = [
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-purple-400',
  'from-emerald-500 to-teal-400',
  'from-orange-500 to-amber-400',
  'from-pink-500 to-rose-400',
  'from-indigo-500 to-blue-400',
  'from-lime-500 to-green-400',
  'from-fuchsia-500 to-pink-400',
]

const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}
</script>

<template>
  <div>
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">👥 Ocupaciones</h1>
        <p class="text-slate-500 mt-1 text-sm">Registro de inquilinos y fechas de estancia</p>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">{{ vigentes.length }} vigentes</span>
        <span class="bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold">{{ finalizados.length }} finalizados</span>
      </div>
    </div>

    <!-- Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 4" :key="i" class="card p-5 animate-pulse">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-slate-200 rounded-xl"></div>
          <div class="flex-1">
            <div class="h-3 bg-slate-200 rounded w-32 mb-2"></div>
            <div class="h-2 bg-slate-100 rounded w-20"></div>
          </div>
        </div>
        <div class="h-2 bg-slate-100 rounded w-full mb-2"></div>
        <div class="h-2 bg-slate-100 rounded w-3/4"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="p-6 text-center bg-red-50 text-red-600 rounded-2xl border border-red-200">
      <p class="font-semibold text-sm">{{ error }}</p>
    </div>

    <div v-else class="space-y-8">
      <!-- VIGENTES -->
      <div v-if="vigentes.length">
        <h3 class="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Inquilinos vigentes
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(ocu, idx) in vigentes"
            :key="'v-' + idx"
            class="card p-5 border-l-4 border-l-emerald-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-gradient-to-br text-white flex items-center justify-center font-bold text-sm shadow-md"
                  :class="avatarColors[idx % avatarColors.length]"
                >
                  {{ initials(ocu.inquilino) }}
                </div>
                <div>
                  <p class="font-bold text-slate-800 text-sm">{{ ocu.inquilino }}</p>
                  <p class="text-xs text-slate-400">Dpto {{ ocu.id_depto }}</p>
                </div>
              </div>
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Vigente
              </span>
            </div>

            <div class="bg-slate-50 rounded-lg p-3 flex items-center gap-4 text-xs">
              <div class="flex items-center gap-1.5 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Ingreso: <strong class="text-slate-700">{{ formatDate(ocu.fecha_ingreso) }}</strong></span>
              </div>
              <div class="text-slate-400">→</div>
              <div class="text-slate-400 italic">Aún en el departamento</div>
            </div>
          </div>
        </div>
      </div>

      <!-- FINALIZADOS -->
      <div v-if="finalizados.length">
        <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-slate-400"></span>
          Inquilinos anteriores
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(ocu, idx) in finalizados"
            :key="'f-' + idx"
            class="card p-5 border-l-4 border-l-slate-300 opacity-75 hover:opacity-100 transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-400 to-slate-300 text-white flex items-center justify-center font-bold text-sm">
                  {{ initials(ocu.inquilino) }}
                </div>
                <div>
                  <p class="font-bold text-slate-600 text-sm">{{ ocu.inquilino }}</p>
                  <p class="text-xs text-slate-400">Dpto {{ ocu.id_depto }}</p>
                </div>
              </div>
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase">
                Finalizado
              </span>
            </div>

            <div class="bg-slate-50 rounded-lg p-3 flex items-center gap-4 text-xs">
              <div class="flex items-center gap-1.5 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>{{ formatDate(ocu.fecha_ingreso) }}</span>
              </div>
              <div class="text-slate-400">→</div>
              <div class="flex items-center gap-1.5 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>{{ formatDate(ocu.fecha_salida) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
