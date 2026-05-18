<script setup>
import { ref, onMounted } from 'vue'
import { fetchGet } from '../servicios/api'

const departamentos = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    departamentos.value = await fetchGet('obtenerDepartamentos')
  } catch (e) {
    error.value = "No se pudieron cargar los departamentos."
    console.error(e)
  } finally {
    isLoading.value = false
  }
})

const torreColors = {
  A: 'from-blue-500 to-cyan-400',
  B: 'from-violet-500 to-purple-400',
  C: 'from-emerald-500 to-teal-400',
}

const getTorreColor = (torre) => torreColors[torre] || 'from-slate-500 to-slate-400'

const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}
</script>

<template>
  <div>
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">🏠 Departamentos</h1>
        <p class="text-slate-500 mt-1 text-sm">Gestión de unidades del condominio</p>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <span class="bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-bold">{{ departamentos.length }} unidades</span>
      </div>
    </div>

    <!-- Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="card p-5 animate-pulse">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-slate-200 rounded-xl"></div>
          <div class="flex-1">
            <div class="h-3 bg-slate-200 rounded w-28 mb-2"></div>
            <div class="h-2 bg-slate-100 rounded w-20"></div>
          </div>
        </div>
        <div class="h-2 bg-slate-100 rounded w-full"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="p-6 text-center bg-red-50 text-red-600 rounded-2xl border border-red-200">
      <p class="font-semibold text-sm">{{ error }}</p>
    </div>

    <!-- Grid de tarjetas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(depto, idx) in departamentos"
        :key="depto.id_depto"
        class="card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div
              class="w-11 h-11 rounded-xl bg-gradient-to-br text-white flex items-center justify-center font-bold text-sm shadow-md"
              :class="getTorreColor(depto.torre)"
            >
              {{ depto.numero }}
            </div>
            <div>
              <p class="font-bold text-slate-800 text-sm">{{ depto.propietario }}</p>
              <p class="text-xs text-slate-400">Torre {{ depto.torre }}</p>
            </div>
          </div>
          <span v-if="depto.activo" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Activo
          </span>
          <span v-else class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wider">
            Inactivo
          </span>
        </div>

        <div class="flex items-center gap-2 text-xs text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
          {{ depto.telefono || 'Sin teléfono registrado' }}
        </div>
      </div>
    </div>
  </div>
</template>
