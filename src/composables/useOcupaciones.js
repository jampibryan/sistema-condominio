import { ref } from 'vue'
import { ocupacionesService } from '../servicios/ocupacionesService'

export function useOcupaciones() {
  const ocupaciones = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const cargarOcupaciones = async () => {
    isLoading.value = true
    error.value = null
    try {
      ocupaciones.value = await ocupacionesService.obtenerOcupaciones()
    } catch (err) {
      error.value = 'Error al cargar las ocupaciones.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const agregarOcupacion = async (ocupacion) => {
    isLoading.value = true
    error.value = null
    try {
      const nuevaOcu = await ocupacionesService.crearOcupacion(ocupacion)
      // Insertar al inicio de la lista ya que se ordena descendente
      ocupaciones.value.unshift(nuevaOcu)
      return nuevaOcu
    } catch (err) {
      error.value = 'Error al registrar la ocupación.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const editarOcupacion = async (id_ocupacion, ocupacion) => {
    isLoading.value = true
    error.value = null
    try {
      const ocuActualizada = await ocupacionesService.actualizarOcupacion(
        id_ocupacion,
        ocupacion
      )
      const index = ocupaciones.value.findIndex(
        (o) => o.id_ocupacion === id_ocupacion
      )
      if (index !== -1) {
        ocupaciones.value[index] = ocuActualizada
      }
      return ocuActualizada
    } catch (err) {
      error.value = 'Error al actualizar la ocupación.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const borrarOcupacion = async (id_ocupacion) => {
    isLoading.value = true
    error.value = null
    try {
      await ocupacionesService.eliminarOcupacion(id_ocupacion)
      ocupaciones.value = ocupaciones.value.filter(
        (o) => o.id_ocupacion !== id_ocupacion
      )
    } catch (err) {
      error.value = 'Error al eliminar la ocupación.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    ocupaciones,
    isLoading,
    error,
    cargarOcupaciones,
    agregarOcupacion,
    editarOcupacion,
    borrarOcupacion
  }
}
