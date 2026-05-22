import { supabase } from '../lib/supabaseClient'

export const resumenPropietariosService = {
  /**
   * Obtiene todos los resúmenes de propietarios de la tabla 'resumen_propietarios' en Supabase.
   * @returns {Promise<Array>} - Lista de todos los resúmenes históricos
   */
  async obtenerResumen() {
    const { data, error } = await supabase
      .from('resumen_propietarios')
      .select('*')

    if (error) {
      console.error(
        'Error al obtener resumen de propietarios de Supabase:',
        error
      )
      throw error
    }
    return data || []
  },

  /**
   * Obtiene los resúmenes consolidados de propietarios filtrados por un recibo específico.
   * @param {number|string} id_recibo - ID del recibo correspondiente
   * @returns {Promise<Array>} - Lista de resúmenes para el periodo
   */
  async obtenerResumenPorRecibo(id_recibo) {
    const { data, error } = await supabase
      .from('resumen_propietarios')
      .select('*')
      .eq('id_recibo', id_recibo)

    if (error) {
      console.error(
        `Error al obtener resumen de propietarios para el recibo ${id_recibo} de Supabase:`,
        error
      )
      throw error
    }
    return data || []
  }
}
