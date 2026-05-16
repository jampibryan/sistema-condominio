<script setup>
import { ocupaciones } from '../servicios/mockData'
import { formatDate } from '../utilidades/formatters'
</script>

<template>
  <div>
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Ocupaciones</h1>
        <p class="text-slate-500 mt-1">Registro de inquilinos y fechas de estancia</p>
      </div>
      <button class="btn-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Registrar Ocupante
      </button>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Inquilino</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-center">Dpto</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Ingreso</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Salida</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-center">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="ocu in ocupaciones" :key="ocu.id_ocupacion" class="hover:bg-slate-50/50 transition-colors">
              <td class="py-4 px-6">
                <span class="font-medium text-slate-800">{{ ocu.inquilino }}</span>
              </td>
              <td class="py-4 px-6 text-center">
                <span class="bg-slate-100 text-slate-700 py-1 px-3 rounded-lg text-sm font-semibold border border-slate-200">
                  {{ ocu.id_depto === 1 ? '405' : '406' }}
                </span>
              </td>
              <td class="py-4 px-6 text-slate-600">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {{ formatDate(ocu.fecha_ingreso) }}
                </div>
              </td>
              <td class="py-4 px-6 text-slate-600">
                <div v-if="ocu.fecha_salida" class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {{ formatDate(ocu.fecha_salida) }}
                </div>
                <span v-else class="text-slate-400 italic">--</span>
              </td>
              <td class="py-4 px-6 text-center">
                <span v-if="!ocu.fecha_salida" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                  Vigente
                </span>
                <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  Finalizado
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
