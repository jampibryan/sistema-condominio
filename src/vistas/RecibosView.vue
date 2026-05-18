<script setup>
import { ref, onMounted } from 'vue'
import { fetchGet, fetchPost, invalidateCache } from '../servicios/api'
import { formatCurrency, formatDate } from '../utilidades/formatters'
import ReceiptModal from '../componentes/common/ReceiptModal.vue'

const showForm = ref(false)
const isCalculating = ref(false)
const isLoading = ref(true)
const error = ref(null)
const successMessage = ref(null)

const recibo = ref({})
const resumenPropietarios = ref([])
const detalleRecibos = ref([])

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

const cargarDatos = async () => {
  try {
    isLoading.value = true
    error.value = null

    // Peticiones en PARALELO para máxima velocidad
    const [recibos, resumenTotal, detalleTotal] = await Promise.all([
      fetchGet('obtenerRecibos'),
      fetchGet('obtenerResumen'),
      fetchGet('obtenerDetalles')
    ])

    if (recibos && recibos.length > 0) {
      const ultimoRecibo = recibos[recibos.length - 1]
      const idRecibo = recibos.length

      recibo.value = {
        fecha_inicio: ultimoRecibo.fecha_inicio,
        fecha_fin: ultimoRecibo.fecha_fin,
        agua: ultimoRecibo.agua,
        alcantarillado: ultimoRecibo.alcantarillado,
        mntto_redes: ultimoRecibo.mntto_redes,
        total: ultimoRecibo.total,
        fecha_emision: ultimoRecibo.fecha_emision
      }

      resumenPropietarios.value = resumenTotal.filter(r => Number(r.id_recibo) === idRecibo)
      detalleRecibos.value = detalleTotal.filter(d => Number(d.id_recibo) === idRecibo)
    }
  } catch (e) {
    error.value = "Error al conectar con Google Sheets. Intenta recargar la página."
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(cargarDatos)

const handleCalcular = async () => {
  try {
    isCalculating.value = true
    error.value = null

    await fetchPost('generarRecibo', {
      fecha_inicio: form.value.fecha_inicio,
      fecha_fin: form.value.fecha_fin,
      agua: Number(form.value.agua),
      alcantarillado: Number(form.value.alcantarillado),
      mntto_redes: Number(form.value.mntto_redes),
      fecha_emision: form.value.fecha_emision
    })

    successMessage.value = "¡Recibo generado y guardado en Google Sheets!"
    showForm.value = false
    await cargarDatos()
    setTimeout(() => { successMessage.value = null }, 5000)
    form.value = { fecha_inicio: '', fecha_fin: '', agua: null, alcantarillado: null, mntto_redes: null, fecha_emision: '' }
  } catch (e) {
    error.value = "Hubo un problema al generar el recibo."
    console.error(e)
  } finally {
    isCalculating.value = false
  }
}

const openReceiptModal = (ownerData) => {
  selectedReceipt.value = ownerData
  isModalOpen.value = true
}

// Helper: obtener iniciales para avatar
const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

// Colores de avatar por índice
const avatarColors = [
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-purple-400',
  'from-emerald-500 to-teal-400',
  'from-orange-500 to-amber-400',
  'from-pink-500 to-rose-400',
  'from-indigo-500 to-blue-400',
  'from-lime-500 to-green-400',
  'from-fuchsia-500 to-pink-400',
  'from-sky-500 to-blue-400',
  'from-red-500 to-orange-400',
  'from-teal-500 to-emerald-400',
  'from-amber-500 to-yellow-400',
  'from-cyan-500 to-sky-400',
  'from-rose-500 to-red-400',
]
</script>

<template>
  <div>
    <!-- ENCABEZADO -->
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 hide-on-print">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">💧 Recibo del Mes</h1>
        <p class="text-slate-500 mt-1 text-sm">Distribución automática de costos de agua y mantenimiento</p>
      </div>
      <button
        @click="showForm = !showForm"
        class="btn-primary flex items-center gap-2 text-sm"
        :class="showForm ? 'bg-gradient-to-r from-slate-600 to-slate-500 shadow-slate-500/30' : ''"
      >
        <svg v-if="!showForm" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        {{ showForm ? 'Cancelar' : 'Nuevo Recibo' }}
      </button>
    </div>

    <!-- FORMULARIO -->
    <transition name="slide-fade">
      <div v-if="showForm" class="card p-6 mb-8 border-l-4 border-l-brand-500 hide-on-print">
        <h3 class="text-lg font-bold text-slate-800 mb-1">📝 Datos del recibo de Sedapal</h3>
        <p class="text-sm text-slate-500 mb-6">Ingresa los montos tal como aparecen en el recibo impreso de SEDAPAL.</p>

        <form @submit.prevent="handleCalcular">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Fecha Inicio</label>
              <input type="date" v-model="form.fecha_inicio" required class="input-base">
            </div>
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Fecha Fin</label>
              <input type="date" v-model="form.fecha_fin" required class="input-base">
            </div>
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Fecha Emisión</label>
              <input type="date" v-model="form.fecha_emision" required class="input-base">
            </div>
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">💧 Agua</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">S/</span>
                <input type="number" step="0.01" v-model="form.agua" required class="input-base pl-9">
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">🚰 Alcantarillado</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">S/</span>
                <input type="number" step="0.01" v-model="form.alcantarillado" required class="input-base pl-9">
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">🔧 Mntto Redes</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">S/</span>
                <input type="number" step="0.01" v-model="form.mntto_redes" required class="input-base pl-9">
              </div>
            </div>
          </div>

          <div class="mt-6 pt-5 border-t border-slate-100 flex justify-end">
            <button type="submit" class="btn-primary flex items-center gap-2" :disabled="isCalculating">
              <svg v-if="isCalculating" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
              {{ isCalculating ? 'Generando...' : '🚀 Calcular y Generar' }}
            </button>
          </div>
        </form>
      </div>
    </transition>

    <!-- CARGANDO -->
    <div v-if="isLoading" class="py-20 text-center">
      <div class="inline-flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center animate-pulse shadow-lg shadow-brand-500/30">
          <svg class="h-6 w-6 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
        </div>
        <p class="text-slate-500 font-medium text-sm">Conectando con Google Sheets...</p>
      </div>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="p-6 text-center bg-red-50 text-red-600 rounded-2xl mt-4 border border-red-200">
      <p class="font-semibold text-sm">{{ error }}</p>
    </div>

    <!-- RESULTADOS -->
    <transition v-else name="fade">
      <div v-show="!showForm" class="space-y-8">

        <!-- Mensaje de éxito -->
        <div v-if="successMessage" class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl flex items-center gap-3 text-sm font-semibold">
          ✅ {{ successMessage }}
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- TARJETA HERO: Resumen Global del periodo    -->
        <!-- ═══════════════════════════════════════════ -->
        <div v-if="recibo.fecha_inicio" class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
          <div class="absolute -right-16 -top-16 w-56 h-56 bg-brand-500/20 blur-3xl rounded-full"></div>
          <div class="absolute -left-16 -bottom-16 w-56 h-56 bg-violet-500/15 blur-3xl rounded-full"></div>
          <div class="absolute right-1/3 top-0 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full"></div>

          <div class="relative p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p class="text-brand-400 font-bold tracking-wider text-xs uppercase mb-2">📅 Periodo facturado</p>
              <h2 class="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {{ formatDate(recibo.fecha_inicio) }} — {{ formatDate(recibo.fecha_fin) }}
              </h2>
              <p class="text-slate-400 text-xs mt-2 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Generado el {{ formatDate(recibo.fecha_emision) }}
              </p>
            </div>
            <div class="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 text-center min-w-[180px] shadow-xl">
              <p class="text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1">Total facturado</p>
              <p class="text-3xl font-black text-white">{{ formatCurrency(recibo.total) }}</p>
            </div>
          </div>

          <!-- Desglose de montos con explicación -->
          <div class="relative bg-black/20 border-t border-white/10 px-8 py-5">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="group">
                <p class="text-[10px] text-cyan-300/80 uppercase font-bold tracking-wider mb-0.5">💧 Agua</p>
                <p class="text-lg font-bold text-white">{{ formatCurrency(recibo.agua) }}</p>
                <p class="text-[10px] text-slate-500 mt-0.5 hidden group-hover:block transition-all">Se reparte por días de ocupación</p>
              </div>
              <div class="border-x border-white/10 group">
                <p class="text-[10px] text-violet-300/80 uppercase font-bold tracking-wider mb-0.5">🚰 Alcantarillado</p>
                <p class="text-lg font-bold text-white">{{ formatCurrency(recibo.alcantarillado) }}</p>
                <p class="text-[10px] text-slate-500 mt-0.5 hidden group-hover:block transition-all">Se divide entre los 14 dptos</p>
              </div>
              <div class="group">
                <p class="text-[10px] text-emerald-300/80 uppercase font-bold tracking-wider mb-0.5">🔧 Mantenimiento</p>
                <p class="text-lg font-bold text-white">{{ formatCurrency(recibo.mntto_redes) }}</p>
                <p class="text-[10px] text-slate-500 mt-0.5 hidden group-hover:block transition-all">Se divide entre los 14 dptos</p>
              </div>
            </div>
          </div>

          <!-- Explicación didáctica -->
          <div class="relative bg-brand-500/5 border-t border-white/5 px-8 py-3">
            <p class="text-[11px] text-slate-400 text-center">
              ℹ️ <strong class="text-slate-300">¿Cómo se calcula?</strong> El agua se reparte según los <strong class="text-cyan-400">días que cada inquilino ocupó</strong> el departamento. El alcantarillado y mantenimiento son <strong class="text-violet-400">costos fijos iguales</strong> para todos.
            </p>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- TARJETAS POR PROPIETARIO (una por cada uno) -->
        <!-- ═══════════════════════════════════════════ -->
        <div v-if="resumenPropietarios.length">
          <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            🏠 Cobro por Departamento
            <span class="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-semibold">{{ resumenPropietarios.length }} dptos</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(res, idx) in resumenPropietarios"
              :key="res.id_resumen"
              class="card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group border-l-4"
              :class="[
                idx % 4 === 0 ? 'border-l-blue-400' :
                idx % 4 === 1 ? 'border-l-violet-400' :
                idx % 4 === 2 ? 'border-l-emerald-400' : 'border-l-amber-400'
              ]"
              @click="openReceiptModal(res)"
            >
              <!-- Encabezado: Avatar + Nombre -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-gradient-to-br text-white flex items-center justify-center font-bold text-sm shadow-md"
                    :class="avatarColors[idx % avatarColors.length]"
                  >
                    {{ initials(res.propietario) }}
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 text-sm leading-tight">{{ res.propietario }}</p>
                    <p class="text-xs text-slate-400">Dpto {{ res.numero }} · Torre {{ res.torre }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total</p>
                  <p class="text-xl font-black text-brand-600">{{ formatCurrency(res.total_pagar) }}</p>
                </div>
              </div>

              <!-- Desglose visual con barras -->
              <div class="space-y-2 mb-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 flex items-center gap-1">💧 Agua (proporcional)</span>
                  <span class="font-bold text-slate-700">{{ formatCurrency(res.agua_total) }}</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                    :style="{ width: res.total_pagar > 0 ? ((res.agua_total / res.total_pagar) * 100) + '%' : '0%' }"></div>
                </div>

                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 flex items-center gap-1">🔧 Cuota fija (alc. + mntto.)</span>
                  <span class="font-bold text-slate-700">{{ formatCurrency(res.fijo) }}</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-700"
                    :style="{ width: res.total_pagar > 0 ? ((res.fijo / res.total_pagar) * 100) + '%' : '0%' }"></div>
                </div>
              </div>

              <!-- Detalle de inquilinos -->
              <div class="bg-slate-50 rounded-lg p-2.5 text-[11px] text-slate-500 leading-relaxed">
                <span class="font-semibold text-slate-600">Inquilinos:</span> {{ res.detalle_ocupantes }}
              </div>

              <!-- Acción -->
              <div class="mt-3 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span class="text-xs text-brand-500 font-semibold">Click para ver recibo imprimible →</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- TABLA DETALLADA POR OCUPANTE                -->
        <!-- ═══════════════════════════════════════════ -->
        <div v-if="detalleRecibos.length">
          <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            📊 Detalle matemático por ocupante
            <span class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{{ detalleRecibos.length }} registros</span>
          </h3>

          <div class="card overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <th class="py-3 px-5 font-bold text-xs text-slate-500 uppercase tracking-wider">Ocupante</th>
                    <th class="py-3 px-5 font-bold text-xs text-slate-500 uppercase tracking-wider text-center">Dpto</th>
                    <th class="py-3 px-5 font-bold text-xs text-slate-500 uppercase tracking-wider text-center">Días</th>
                    <th class="py-3 px-5 font-bold text-xs text-slate-500 uppercase tracking-wider text-right">Agua</th>
                    <th class="py-3 px-5 font-bold text-xs text-slate-500 uppercase tracking-wider text-right">Fijo</th>
                    <th class="py-3 px-5 font-bold text-xs text-emerald-600 uppercase tracking-wider text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="det in detalleRecibos" :key="det.id_detalle" class="hover:bg-brand-50/30 transition-colors">
                    <td class="py-3 px-5 font-semibold text-slate-800">{{ det.ocupante }}</td>
                    <td class="py-3 px-5 text-center">
                      <span class="bg-slate-100 text-slate-700 py-0.5 px-2.5 rounded-lg text-xs font-bold border border-slate-200">
                        {{ det.id_depto }}
                      </span>
                    </td>
                    <td class="py-3 px-5 text-center">
                      <span class="font-extrabold text-brand-600">{{ det.dias_ocupados }}</span>
                      <span class="text-slate-400 text-xs"> días</span>
                    </td>
                    <td class="py-3 px-5 text-right text-slate-600">{{ formatCurrency(det.agua) }}</td>
                    <td class="py-3 px-5 text-right text-slate-600">{{ formatCurrency(det.fijo) }}</td>
                    <td class="py-3 px-5 text-right font-bold text-emerald-600">{{ formatCurrency(det.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal -->
    <ReceiptModal
      :is-open="isModalOpen"
      :receipt-data="selectedReceipt"
      :global-receipt="recibo"
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
