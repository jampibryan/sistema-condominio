/**
 * Utilidades generales para formateo de datos
 */

/**
 * Formatea un número como moneda local (Soles por ejemplo)
 * @param {number} amount - El monto a formatear
 * @returns {string} - El monto formateado
 */
export const formatCurrency = (amount) => {
  if (amount == null || isNaN(amount)) return 'S/ 0.00'
  
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount)
}

/**
 * Formatea una fecha a un string legible
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada (ej. DD/MM/YYYY)
 */
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('es-PE')
}
