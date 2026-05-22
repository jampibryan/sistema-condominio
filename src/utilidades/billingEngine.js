/**
 * Motor de cálculos de facturación y cobro proporcional (Client-Side)
 * Reemplaza por completo el backend antiguo de Google Apps Script.
 */
export const billingEngine = {
  /**
   * Parsea una fecha en formato YYYY-MM-DD a un objeto Date local
   * para evitar descalces por zona horaria (un error clásico de JavaScript).
   * @param {string} dateStr - Fecha en texto (YYYY-MM-DD)
   * @returns {Date|null} - Objeto Date local
   */
  parseLocalDate(dateStr) {
    if (!dateStr) return null
    const parts = dateStr.split('T')[0].split('-')
    if (parts.length !== 3) return null
    const [year, month, day] = parts.map(Number)
    return new Date(year, month - 1, day)
  },

  /**
   * Calcula los días de coincidencia entre el periodo del recibo y el periodo de ocupación del inquilino.
   * Incluye los límites de frontera (inclusivo).
   * @param {string} inicioReciboStr - Inicio de periodo de cobro
   * @param {string} finReciboStr - Fin de periodo de cobro
   * @param {string} ingresoInquilinoStr - Fecha de ingreso de ocupación
   * @param {string} salidaInquilinoStr - Fecha de salida de ocupación (opcional)
   * @returns {number} - Días ocupados
   */
  calcularDiasSolapamiento(
    inicioReciboStr,
    finReciboStr,
    ingresoInquilinoStr,
    salidaInquilinoStr
  ) {
    const inicioRecibo = this.parseLocalDate(inicioReciboStr)
    const finRecibo = this.parseLocalDate(finReciboStr)
    const ingresoInquilino = this.parseLocalDate(ingresoInquilinoStr)
    const salidaInquilino = salidaInquilinoStr
      ? this.parseLocalDate(salidaInquilinoStr)
      : null

    if (!inicioRecibo || !finRecibo || !ingresoInquilino) return 0

    // El inicio de la coincidencia es el máximo entre el inicio del recibo y el ingreso del inquilino
    const inicioCoincidencia = new Date(
      Math.max(inicioRecibo.getTime(), ingresoInquilino.getTime())
    )

    // El fin de la coincidencia es el mínimo entre el fin del recibo y la salida del inquilino (si existe)
    const finCoincidencia = salidaInquilino
      ? new Date(Math.min(finRecibo.getTime(), salidaInquilino.getTime()))
      : finRecibo

    if (inicioCoincidencia.getTime() > finCoincidencia.getTime()) {
      return 0 // No hay coincidencia
    }

    // Diferencia en milisegundos a días
    const diffTime = finCoincidencia.getTime() - inicioCoincidencia.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  },

  /**
   * Realiza la distribución proporcional de agua y divide los costos fijos equitativamente.
   * Devuelve los conjuntos de datos listos para ser guardados en la base de datos de Supabase.
   * @param {Object} datosRecibo - Parámetros del formulario (agua, alcantarillado, mntto_redes, etc.)
   * @param {Array} departamentos - Lista de departamentos de Supabase
   * @param {Array} ocupaciones - Lista de ocupaciones de Supabase
   * @returns {Object} - Recibo generado, detalle_recibos y resumen_propietarios
   */
  procesarDistribucion(datosRecibo, departamentos, ocupaciones) {
    const {
      fecha_inicio,
      fecha_fin,
      agua,
      alcantarillado,
      mntto_redes,
      fecha_emision
    } = datosRecibo

    const aguaTotal = Number(agua)
    const alcantarilladoTotal = Number(alcantarillado)
    const mnttoRedesTotal = Number(mntto_redes)
    const totalGeneral = aguaTotal + alcantarilladoTotal + mnttoRedesTotal

    const deptosActivos = departamentos.filter((d) => d.activo)
    const totalDeptos = deptosActivos.length || 14 // fallback de resguardo

    // Costo fijo por departamento (Alcantarillado + Mantenimiento dividido equitativamente)
    const cuotaFijaPorDepto = Number(
      ((alcantarilladoTotal + mnttoRedesTotal) / totalDeptos).toFixed(2)
    )

    // 1. Calcular días ocupados para cada inquilino en este periodo
    const desgloseInquilinos = []
    let sumaDiasTotales = 0

    ocupaciones.forEach((ocu) => {
      const dias = this.calcularDiasSolapamiento(
        fecha_inicio,
        fecha_fin,
        ocu.fecha_ingreso,
        ocu.fecha_salida
      )

      if (dias > 0) {
        desgloseInquilinos.push({
          id_depto: ocu.id_depto,
          inquilino: ocu.inquilino,
          dias_ocupados: dias
        })
        sumaDiasTotales += dias
      }
    })

    // 2. Distribuir el agua proporcionalmente
    const precioAguaPorDia =
      sumaDiasTotales > 0 ? aguaTotal / sumaDiasTotales : 0

    const detallesCalculados = desgloseInquilinos.map((inquilino) => {
      const aguaProporcional = Number(
        (inquilino.dias_ocupados * precioAguaPorDia).toFixed(2)
      )
      return {
        id_depto: inquilino.id_depto,
        ocupante: inquilino.inquilino,
        dias_ocupados: inquilino.dias_ocupados,
        agua: aguaProporcional,
        fijo: 0, // El costo fijo NO se cobra por ocupante
        total: aguaProporcional
      }
    })

    // 3. Consolidar la información para el Propietario (resumen_propietarios)
    const resumenesCalculados = deptosActivos.map((depto) => {
      // Filtrar todos los detalles de ocupantes de este departamento
      const detallesDepto = detallesCalculados.filter(
        (det) => det.id_depto === depto.id_depto
      )

      const aguaTotalDepto = Number(
        detallesDepto.reduce((sum, det) => sum + det.agua, 0).toFixed(2)
      )
      const totalPagarDepto = Number(
        (aguaTotalDepto + cuotaFijaPorDepto).toFixed(2)
      )

      // Crear string descriptivo de inquilinos
      // Ejemplo: "JOSE: 32 días = S/ 90.27"
      const descripcionOcupantes =
        detallesDepto.length > 0
          ? detallesDepto
              .map(
                (det) =>
                  `${det.ocupante}: ${det.dias_ocupados} días = S/ ${det.agua.toFixed(2)}`
              )
              .join(' / ')
          : 'Sin inquilinos activos en el periodo'

      return {
        id_depto: depto.id_depto,
        numero: depto.numero,
        torre: depto.torre,
        propietario: depto.propietario,
        agua_total: aguaTotalDepto,
        fijo: cuotaFijaPorDepto,
        total_pagar: totalPagarDepto,
        detalle_ocupantes: descripcionOcupantes
      }
    })

    return {
      reciboGenerado: {
        fecha_inicio,
        fecha_fin,
        agua: aguaTotal,
        alcantarillado: alcantarilladoTotal,
        mntto_redes: mnttoRedesTotal,
        total: totalGeneral,
        fecha_emision
      },
      detalles: detallesCalculados,
      resumenes: resumenesCalculados
    }
  }
}
