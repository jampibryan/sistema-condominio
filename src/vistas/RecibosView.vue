<script setup>
import { ref } from 'vue'
import { recibo, resumenPropietarios, detalleRecibos } from '../servicios/mockData'
import { formatCurrency, formatDate } from '../utilidades/formatters'
import ReceiptModal from '../componentes/common/ReceiptModal.vue'

const showForm = ref(false)
const isCalculating = ref(false)
const isModalOpen = ref(false)
const selectedReceipt = ref(null)

const form = ref({
  fecha_inicio: '',
  fecha_fin: '',
  agua: null,
  alcantarillado: null,
  mntto_redes: null,
  fecha_emision: ''
})

const handleCalcular = () => {
  isCalculating.value = true
  setTimeout(() => {
    isCalculating.value = false
    showForm.value = false
  }, 1000)
}

const openReceiptModal = (ownerData) => {
  selectedReceipt.value = ownerData
  isModalOpen.value = true
}
</script>

<template>
  <div>
    <!-- Encabezado de la página -->
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 hide-on-print">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Recibo del Mes</h1>
        <p class="text-slate-500 mt-1">Generación y cálculo de cobros del condominio</p>
      </div>
      <button 
        @click="showForm = !showForm"
        class="btn-primary flex items-center gap-2"
        :class="showForm ? 'bg-gradient-to-r from-slate-600 to-slate-500 shadow-slate-500/30 ring-slate-500' : ''"
      >
        <svg v-if="!showForm" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        {{ showForm ? 'Cancelar' : 'Nuevo Recibo' }}
      </button>
    </div>

    <!-- FORMULARIO DE NUEVO RECIBO -->
    <transition name="slide-fade">
      <div v-if="showForm" class="card p-6 mb-8 border-t-4 border-t-brand-500 hide-on-print">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Parámetros del Recibo</h3>
        </div>
        
        <form @submit.prevent="handleCalcular">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Fecha Inicio</label>
              <input type="date" v-model="form.fecha_inicio" required class="input-base">
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Fecha Fin</label>
              <input type="date" v-model="form.fecha_fin" required class="input-base">
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Fecha Emisión</label>
              <input type="date" v-model="form.fecha_emision" required class="input-base">
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Monto Agua (S/)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">S/</span>
                <input type="number" step="0.01" v-model="form.agua" required class="input-base pl-8">
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Alcantarillado (S/)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">S/</span>
                <input type="number" step="0.01" v-model="form.alcantarillado" required class="input-base pl-8">
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Mntto Redes (S/)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">S/</span>
                <input type="number" step="0.01" v-model="form.mntto_redes" required class="input-base pl-8">
              </div>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" class="btn-primary flex items-center gap-2" :disabled="isCalculating">
              <svg v-if="isCalculating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              {{ isCalculating ? 'Calculando...' : 'Calcular y Generar Recibo' }}
            </button>
          </div>
        </form>
      </div>
    </transition>

    <!-- ÁREA DE RESULTADOS -->
    <transition name="fade">
      <div v-show="!showForm" class="space-y-8">
        
        <!-- 1. RESUMEN GLOBAL (Tarjeta Premium) -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
          <!-- Decoración de fondo -->
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/20 blur-3xl rounded-full"></div>
          <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full"></div>
          
          <div class="relative p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p class="text-brand-400 font-semibold tracking-wider text-sm uppercase mb-1">Periodo Actual</p>
              <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-2">
                {{ formatDate(recibo.fecha_inicio) }} - {{ formatDate(recibo.fecha_fin) }}
              </h2>
              <div class="flex items-center gap-2 text-slate-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Generado el {{ formatDate(recibo.fecha_emision) }}
              </div>
            </div>
            
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center min-w-[200px] shadow-xl">
              <p class="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-1">Total Facturado</p>
              <p class="text-4xl font-black text-white">{{ formatCurrency(recibo.total) }}</p>
            </div>
          </div>
          
          <!-- Fila de montos base -->
          <div class="relative bg-black/20 border-t border-white/10 px-8 py-4">
            <div class="grid grid-cols-3 gap-4 text-center divide-x divide-white/10">
              <div>
                <p class="text-xs text-slate-400 uppercase font-semibold">Agua Sedapal</p>
                <p class="text-lg font-bold text-white">{{ formatCurrency(recibo.agua) }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-400 uppercase font-semibold">Alcantarillado</p>
                <p class="text-lg font-bold text-white">{{ formatCurrency(recibo.alcantarillado) }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-400 uppercase font-semibold">Mantenimiento</p>
                <p class="text-lg font-bold text-white">{{ formatCurrency(recibo.mntto_redes) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. RESUMEN POR DEPARTAMENTO -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800">Resumen por Propietario</h3>
          </div>
          
          <div class="card">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-100">
                    <th class="py-4 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider">Dpto</th>
                    <th class="py-4 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider">Propietario</th>
                    <th class="py-4 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider">Agua Total</th>
                    <th class="py-4 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider">Costo Fijo</th>
                    <th class="py-4 px-6 font-bold text-sm text-slate-700 uppercase tracking-wider bg-brand-50/50">Total a Pagar</th>
                    <th class="py-4 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider">Detalle Inquilinos</th>
                    <th class="py-4 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center">Acción</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="res in resumenPropietarios" :key="res.id_resumen" class="hover:bg-slate-50/50 transition-colors group">
                    <td class="py-4 px-6 font-bold text-slate-800">{{ res.numero }}</td>
                    <td class="py-4 px-6 font-medium text-slate-700">{{ res.propietario }}</td>
                    <td class="py-4 px-6 text-slate-600">{{ formatCurrency(res.agua_total) }}</td>
                    <td class="py-4 px-6 text-slate-600">{{ formatCurrency(res.fijo) }}</td>
                    <td class="py-4 px-6 font-bold text-brand-600 bg-brand-50/30 text-lg">{{ formatCurrency(res.total_pagar) }}</td>
                    <td class="py-4 px-6 text-xs text-slate-500 leading-relaxed">{{ res.detalle_ocupantes }}</td>
                    <td class="py-4 px-6 text-center">
                      <button @click="openReceiptModal(res)" class="p-2 text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors focus:ring-2 focus:ring-brand-500 focus:outline-none" title="Ver Recibo PDF">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 3. DETALLE EXACTO -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800">Cálculo Matemático por Ocupante</h3>
          </div>
          
          <div class="card">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-100">
                    <th class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider">Ocupante</th>
                    <th class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center">Dpto</th>
                    <th class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center">Días</th>
                    <th class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right">Agua Prop.</th>
                    <th class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right">Fijo</th>
                    <th class="py-3 px-6 font-semibold text-xs text-emerald-600 uppercase tracking-wider text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="det in detalleRecibos" :key="det.id_detalle" class="hover:bg-slate-50/50 transition-colors">
                    <td class="py-3 px-6 font-medium text-slate-800">{{ det.ocupante }}</td>
                    <td class="py-3 px-6 text-center">
                      <span class="bg-slate-100 text-slate-700 py-1 px-2 rounded text-xs font-semibold border border-slate-200">
                        {{ det.id_depto === 1 ? '405' : '406' }}
                      </span>
                    </td>
                    <td class="py-3 px-6 text-center text-slate-600">
                      <span class="font-bold text-slate-800">{{ det.dias_ocupados }}</span> d
                    </td>
                    <td class="py-3 px-6 text-right text-slate-600">{{ formatCurrency(det.agua) }}</td>
                    <td class="py-3 px-6 text-right text-slate-600">{{ formatCurrency(det.fijo) }}</td>
                    <td class="py-3 px-6 text-right font-bold text-emerald-600">{{ formatCurrency(det.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Imprimible -->
    <ReceiptModal 
      :is-open="isModalOpen" 
      :receipt-data="selectedReceipt"
      @close="isModalOpen = false"
    />
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
