<script setup>
import Modal from './Modal.vue'
import { formatCurrency, formatDate } from '../../utilidades/formatters'
import { recibo } from '../../servicios/mockData'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  receiptData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const handlePrint = () => {
  window.print()
}
</script>

<template>
  <Modal 
    :is-open="isOpen" 
    title="Comprobante de Pago" 
    max-width="max-w-md"
    @close="emit('close')"
  >
    <!-- Contenedor Imprimible (Diseño Ticket/Recibo) -->
    <div class="print-container bg-white p-8">
      
      <!-- Cabecera del Recibo -->
      <div class="text-center border-b-2 border-dashed border-slate-300 pb-6 mb-6">
        <div class="mx-auto w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </div>
        <h2 class="text-2xl font-black text-slate-900 tracking-tight uppercase">Condominio Familiar</h2>
        <p class="text-sm text-slate-500 font-medium mt-1">Gestión de Mantenimiento</p>
      </div>

      <!-- Datos del Cliente -->
      <div class="space-y-3 mb-8">
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-500">Periodo Facturado:</span>
          <span class="font-bold text-slate-800">{{ formatDate(recibo.fecha_inicio) }} - {{ formatDate(recibo.fecha_fin) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-500">Fecha Emisión:</span>
          <span class="font-bold text-slate-800">{{ formatDate(recibo.fecha_emision) }}</span>
        </div>
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 mt-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Propietario</span>
            <span class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Unidad</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-black text-slate-900 text-lg">{{ receiptData?.propietario }}</span>
            <span class="font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">{{ receiptData?.numero }} ({{ receiptData?.torre }})</span>
          </div>
        </div>
      </div>

      <!-- Desglose de Costos -->
      <div class="mb-8 relative">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Conceptos</h4>
        
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-slate-600 font-medium">Consumo de Agua</span>
            <span class="text-slate-900 font-bold">{{ formatCurrency(receiptData?.agua_total) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600 font-medium">Cuota Mantenimiento Fija</span>
            <span class="text-slate-900 font-bold">{{ formatCurrency(receiptData?.fijo) }}</span>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t-2 border-slate-800 flex justify-between items-center">
          <span class="text-lg font-black text-slate-900 uppercase">Total a Pagar</span>
          <span class="text-3xl font-black text-brand-600">{{ formatCurrency(receiptData?.total_pagar) }}</span>
        </div>
      </div>

      <!-- Anexo Transparencia -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 class="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Desglose de inquilinos
        </h4>
        <p class="text-xs text-slate-600 leading-relaxed font-mono">{{ receiptData?.detalle_ocupantes }}</p>
      </div>
      
      <div class="mt-8 text-center">
        <p class="text-xs text-slate-400 font-medium">Por favor, realizar el pago a la brevedad.</p>
      </div>
    </div>

    <!-- Footer Modal -->
    <template #footer>
      <button class="btn-secondary" @click="emit('close')">Cancelar</button>
      <button class="btn-primary flex items-center gap-2" @click="handlePrint">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Imprimir PDF
      </button>
    </template>
  </Modal>
</template>

<style scoped>
@media print {
  .print-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 40px;
    background: white;
    z-index: 9999;
  }
  
  /* Forzar colores en impresión para que no salgan grises pálidos */
  .bg-slate-50 { background-color: #f8fafc !important; -webkit-print-color-adjust: exact; }
  .text-brand-600 { color: #000 !important; }
}
</style>
