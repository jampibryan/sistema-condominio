import { ref } from 'vue'
import { departamentosService } from '../servicios/departamentosService'

export function useDepartamentos() {
  const departamentos = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const cargarDepartamentos = async () => {
    isLoading.value = true
    error.value = null
    try {
      departamentos.value = await departamentosService.obtenerDepartamentos()
    } catch (err) {
      error.value = 'Error al cargar los departamentos.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const agregarDepto = async (depto) => {
    isLoading.value = true
    error.value = null
    try {
      const nuevoDepto = await departamentosService.crearDepartamento(depto)
      departamentos.value.push(nuevoDepto)
      // Ordenar por número después de agregar
      departamentos.value.sort((a, b) => Number(a.numero) - Number(b.numero))
      return nuevoDepto
    } catch (err) {
      error.value = 'Error al agregar el departamento.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const editarDepto = async (id_depto, depto) => {
    isLoading.value = true
    error.value = null
    try {
      const deptoActualizado = await departamentosService.actualizarDepartamento(
        id_depto,
        depto
      )
      const index = departamentos.value.findIndex(
        (d) => d.id_depto === id_depto
      )
      if (index !== -1) {
        departamentos.value[index] = deptoActualizado
      }
      return deptoActualizado
    } catch (err) {
      error.value = 'Error al actualizar el departamento.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const borrarDepto = async (id_depto) => {
    isLoading.value = true
    error.value = null
    try {
      await departamentosService.eliminarDepartamento(id_depto)
      departamentos.value = departamentos.value.filter(
        (d) => d.id_depto !== id_depto
      )
    } catch (err) {
      error.value = 'Error al eliminar el departamento.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    departamentos,
    isLoading,
    error,
    cargarDepartamentos,
    agregarDepto,
    editarDepto,
    borrarDepto
  }
}
