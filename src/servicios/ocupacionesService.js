import { supabase } from '../lib/supabaseClient'

export const ocupacionesService = {
  /**
   * Obtiene todas las ocupaciones registradas en Supabase, ordenadas por fecha de ingreso descendente.
   * @returns {Promise<Array>} - Lista de ocupaciones
   */
  async obtenerOcupaciones() {
    const { data, error } = await supabase
      .from('ocupaciones')
      .select('*')
      .order('fecha_ingreso', { ascending: false })

    if (error) {
      console.error('Error al obtener ocupaciones de Supabase:', error)
      throw error
    }
    return data || []
  },

  /**
   * Registra una nueva ocupación en Supabase.
   * @param {Object} ocupacion - Objeto ocupación (id_depto, inquilino, fecha_ingreso, fecha_salida)
   * @returns {Promise<Object>} - Ocupación creada
   */
  async crearOcupacion(ocupacion) {
    const { data, error } = await supabase
      .from('ocupaciones')
      .insert([ocupacion])
      .select()

    if (error) {
      console.error('Error al crear ocupación en Supabase:', error)
      throw error
    }
    return data?.[0] || null
  },

  /**
   * Actualiza una ocupación en Supabase.
   * @param {number|string} id_ocupacion - ID del registro de ocupación
   * @param {Object} ocupacion - Campos a modificar
   * @returns {Promise<Object>} - Ocupación actualizada
   */
  async actualizarOcupacion(id_ocupacion, ocupacion) {
    const { data, error } = await supabase
      .from('ocupaciones')
      .update(ocupacion)
      .eq('id_ocupacion', id_ocupacion)
      .select()

    if (error) {
      console.error(
        `Error al actualizar ocupación ${id_ocupacion} en Supabase:`,
        error
      )
      throw error
    }
    return data?.[0] || null
  },

  /**
   * Elimina una ocupación en Supabase.
   * @param {number|string} id_ocupacion - ID de la ocupación
   * @returns {Promise<boolean>} - Éxito
   */
  async eliminarOcupacion(id_ocupacion) {
    const { error } = await supabase
      .from('ocupaciones')
      .delete()
      .eq('id_ocupacion', id_ocupacion)

    if (error) {
      console.error(
        `Error al eliminar ocupación ${id_ocupacion} en Supabase:`,
        error
      )
      throw error
    }
    return true
  }
}
