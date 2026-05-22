import { ref } from 'vue'
import { billingEngine } from '../utilidades/billingEngine'
import { recibosService } from '../servicios/recibosService'
import { resumenPropietariosService } from '../servicios/resumenPropietariosService'
import { departamentosService } from '../servicios/departamentosService'
import { ocupacionesService } from '../servicios/ocupacionesService'

export function useBilling() {
  const recibo = ref({})
  const resumenPropietarios = ref([])
  const detalleRecibos = ref([])
  const isCalculating = ref(false)
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Carga la información del último periodo facturado en Supabase.
   */
  const cargarUltimoReciboData = async () => {
    isLoading.value = true
    error.value = null
    try {
      const [recibos, todosDetalles] = await Promise.all([
        recibosService.obtenerRecibos(),
        recibosService.obtenerDetalles()
      ])

      if (recibos && recibos.length > 0) {
        const ultimo = recibos[recibos.length - 1]
        recibo.value = ultimo

        const idRecibo = ultimo.id_recibo

        // Cargar resúmenes y filtrar detalles asociados a este ID de recibo
        const resumenes =
          await resumenPropietariosService.obtenerResumenPorRecibo(idRecibo)
        resumenPropietarios.value = resumenes

        detalleRecibos.value = todosDetalles.filter(
          (d) => d.id_recibo === idRecibo
        )
      } else {
        recibo.value = {}
        resumenPropietarios.value = []
        detalleRecibos.value = []
      }
    } catch (err) {
      error.value = 'Error al cargar los datos del último recibo.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Calcula proporcionalmente un recibo en frontend e inserta los datos
   * de forma atómica en Supabase (recibos, detalle_recibos, resumen_propietarios).
   * @param {Object} formulario - Datos del formulario del recibo de Sedapal
   */
  const generarYGuardarRecibo = async (formulario) => {
    isCalculating.value = true
    error.value = null
    try {
      // 1. Obtener departamentos y ocupaciones activos en paralelo
      const [deptos, ocus] = await Promise.all([
        departamentosService.obtenerDepartamentos(),
        ocupacionesService.obtenerOcupaciones()
      ])

      // 2. Procesar cálculos proporcionalmente mediante el motor matemático
      const calculos = billingEngine.procesarDistribucion(
        formulario,
        deptos,
        ocus
      )

      // 3. Guardar todo en base de datos Supabase
      const nuevoRecibo = await recibosService.guardarReciboCompleto(
        calculos.reciboGenerado,
        calculos.detalles,
        calculos.resumenes
      )

      // 4. Actualizar e hidratar estado local reactivo
      recibo.value = nuevoRecibo
      await cargarUltimoReciboData()

      return nuevoRecibo
    } catch (err) {
      error.value = 'Error al generar o guardar el recibo en la base de datos.'
      console.error(err)
      throw err
    } finally {
      isCalculating.value = false
    }
  }

  return {
    recibo,
    resumenPropietarios,
    detalleRecibos,
    isCalculating,
    isLoading,
    error,
    cargarUltimoReciboData,
    generarYGuardarRecibo
  }
}
