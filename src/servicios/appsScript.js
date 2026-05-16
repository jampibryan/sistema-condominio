/**
 * Este servicio manejará todas las llamadas al backend (Google Apps Script).
 * Cuando estemos en entorno de desarrollo local, podemos usar datos mockeados.
 * Cuando se compile para producción, usará `google.script.run`.
 */

export const appsScriptService = {
  /**
   * Ejemplo de función para obtener departamentos
   */
  async getDepartments() {
    // Aquí implementaremos la lógica de google.script.run o fetch
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500)
    })
  },

  /**
   * Ejemplo de función para calcular recibos
   */
  async calculateReceipts(startDate, endDate) {
    // Llamada al backend de GAS
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 500)
    })
  }
}
