import { supabase } from '../lib/supabaseClient'

export const departamentosService = {
  /**
   * Obtiene todos los departamentos de Supabase, ordenados por número.
   * @returns {Promise<Array>} - Lista de departamentos
   */
  async obtenerDepartamentos() {
    const { data, error } = await supabase
      .from('departamentos')
      .select('*')
      .order('numero', { ascending: true })

    if (error) {
      console.error('Error al obtener departamentos de Supabase:', error)
      throw error
    }
    return data || []
  },

  /**
   * Crea un nuevo departamento en Supabase.
   * @param {Object} depto - Objeto departamento (numero, torre, propietario, telefono, activo)
   * @returns {Promise<Object>} - Departamento creado
   */
  async crearDepartamento(depto) {
    const { data, error } = await supabase
      .from('departamentos')
      .insert([depto])
      .select()

    if (error) {
      console.error('Error al crear departamento en Supabase:', error)
      throw error
    }
    return data?.[0] || null
  },

  /**
   * Actualiza un departamento en Supabase por su id_depto.
   * @param {number|string} id_depto - ID del departamento
   * @param {Object} depto - Campos a modificar
   * @returns {Promise<Object>} - Departamento actualizado
   */
  async actualizarDepartamento(id_depto, depto) {
    const { data, error } = await supabase
      .from('departamentos')
      .update(depto)
      .eq('id_depto', id_depto)
      .select()

    if (error) {
      console.error(
        `Error al actualizar departamento ${id_depto} en Supabase:`,
        error
      )
      throw error
    }
    return data?.[0] || null
  },

  /**
   * Elimina un departamento en Supabase por su id_depto.
   * @param {number|string} id_depto - ID del departamento
   * @returns {Promise<boolean>} - Éxito
   */
  async eliminarDepartamento(id_depto) {
    const { error } = await supabase
      .from('departamentos')
      .delete()
      .eq('id_depto', id_depto)

    if (error) {
      console.error(
        `Error al eliminar departamento ${id_depto} en Supabase:`,
        error
      )
      throw error
    }
    return true
  }
}
