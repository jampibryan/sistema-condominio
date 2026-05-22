import { supabase } from '../lib/supabaseClient'

export const recibosService = {
  /**
   * Obtiene todos los recibos mensuales de la tabla 'recibos' en Supabase, ordenados cronológicamente.
   * @returns {Promise<Array>} - Lista de recibos
   */
  async obtenerRecibos() {
    const { data, error } = await supabase
      .from('recibos')
      .select('*')
      .order('fecha_emision', { ascending: true })

    if (error) {
      console.error('Error al obtener recibos de Supabase:', error)
      throw error
    }
    return data || []
  },

  /**
   * Obtiene todos los detalles de recibos por ocupantes.
   * @returns {Promise<Array>} - Lista de todos los detalles históricos
   */
  async obtenerDetalles() {
    const { data, error } = await supabase.from('detalle_recibos').select('*')

    if (error) {
      console.error('Error al obtener detalle de recibos de Supabase:', error)
      throw error
    }
    return data || []
  },

  /**
   * Guarda un recibo de forma completa y atómica.
   * Primero inserta el recibo principal, recupera el ID generado y asocia todos los detalles
   * y resúmenes correspondientes antes de guardarlos.
   * @param {Object} recibo - Datos generales del recibo
   * @param {Array} detalles - Desglose proporcional por inquilino
   * @param {Array} resumenes - Consolidación final por propietario de departamento
   * @returns {Promise<Object>} - El recibo principal creado
   */
  async guardarReciboCompleto(recibo, detalles, resumenes) {
    try {
      // 1. Insertar el recibo principal
      const { data: recData, error: recError } = await supabase
        .from('recibos')
        .insert([recibo])
        .select()

      if (recError) throw recError
      const nuevoRecibo = recData[0]
      const id_recibo = nuevoRecibo.id_recibo

      // 2. Asociar el id_recibo a los detalles
      const detallesConId = detalles.map((det) => ({
        ...det,
        id_recibo
      }))

      // 3. Asociar el id_recibo a los resúmenes
      const resumenesConId = resumenes.map((res) => ({
        ...res,
        id_recibo
      }))

      // 4. Insertar detalles de forma masiva
      const { error: detError } = await supabase
        .from('detalle_recibos')
        .insert(detallesConId)

      if (detError) throw detError

      // 5. Insertar resúmenes por propietario de forma masiva
      const { error: resError } = await supabase
        .from('resumen_propietarios')
        .insert(resumenesConId)

      if (resError) throw resError

      return nuevoRecibo
    } catch (err) {
      console.error('Error al guardar recibo completo en Supabase:', err)
      throw err
    }
  },

  /**
   * Elimina un recibo y de forma segura todos sus detalles y resúmenes dependientes.
   * Previene violaciones de clave foránea incluso si ON DELETE CASCADE no está configurado.
   * @param {number|string} id_recibo - ID del recibo a eliminar
   * @returns {Promise<boolean>} - Éxito
   */
  async eliminarRecibo(id_recibo) {
    try {
      // Eliminar dependencias primero
      await supabase.from('detalle_recibos').delete().eq('id_recibo', id_recibo)
      await supabase
        .from('resumen_propietarios')
        .delete()
        .eq('id_recibo', id_recibo)

      // Eliminar el recibo principal
      const { error } = await supabase
        .from('recibos')
        .delete()
        .eq('id_recibo', id_recibo)

      if (error) throw error
      return true
    } catch (err) {
      console.error('Error al eliminar recibo de Supabase:', err)
      throw err
    }
  }
}
