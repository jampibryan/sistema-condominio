import { ref } from 'vue'
import { recibosService } from '../servicios/recibosService'

export function useRecibos() {
  const recibos = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const cargarRecibos = async () => {
    isLoading.value = true
    error.value = null
    try {
      recibos.value = await recibosService.obtenerRecibos()
    } catch (err) {
      error.value = 'Error al cargar el historial de recibos.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const borrarRecibo = async (id_recibo) => {
    isLoading.value = true
    error.value = null
    try {
      await recibosService.eliminarRecibo(id_recibo)
      recibos.value = recibos.value.filter((r) => r.id_recibo !== id_recibo)
    } catch (err) {
      error.value = 'Error al eliminar el recibo.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    recibos,
    isLoading,
    error,
    cargarRecibos,
    borrarRecibo
  }
}
