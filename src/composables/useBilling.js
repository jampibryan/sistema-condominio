import { ref } from 'vue'

/**
 * Composable para manejar el estado local de la facturación y cálculos temporales
 * antes de enviarlos a guardar al backend.
 */
export function useBilling() {
  const currentReceipts = ref([])
  const isCalculating = ref(false)

  const calculate = async (startDate, endDate) => {
    isCalculating.value = true
    try {
      // Aquí llamaremos al servicio que a su vez llama a Apps Script
      // const data = await appsScriptService.calculateReceipts(startDate, endDate)
      console.log('Calculando para', startDate, endDate)
    } catch (error) {
      console.error('Error al calcular:', error)
    } finally {
      isCalculating.value = false
    }
  }

  return {
    currentReceipts,
    isCalculating,
    calculate
  }
}
