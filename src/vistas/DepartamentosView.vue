<script setup>
import { departamentos } from '../servicios/mockData'
</script>

<template>
  <div>
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Departamentos</h1>
        <p class="text-slate-500 mt-1">Gestión de unidades del condominio</p>
      </div>
      <button class="btn-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Nuevo Dpto
      </button>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Número</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Torre</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Propietario Principal</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Teléfono</th>
              <th class="py-4 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider text-center">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="depto in departamentos" :key="depto.id_depto" class="hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-6">
                <span class="font-bold text-slate-800">{{ depto.numero }}</span>
              </td>
              <td class="py-4 px-6 text-slate-600">{{ depto.torre }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    {{ depto.propietario.charAt(0) }}
                  </div>
                  <span class="font-medium text-slate-700">{{ depto.propietario }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-slate-600">{{ depto.telefono || 'Sin registro' }}</td>
              <td class="py-4 px-6 text-center">
                <span v-if="depto.activo" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Activo
                </span>
                <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 shadow-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Inactivo
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
