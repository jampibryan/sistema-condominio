export const departamentos = [
  {
    id_depto: 1,
    numero: 405,
    torre: "TORRE 1",
    propietario: "JESUS",
    telefono: "935172287",
    activo: true
  },
  {
    id_depto: 2,
    numero: 406,
    torre: "TORRE 1",
    propietario: "ELVIA",
    telefono: "999888777",
    activo: true
  }
]

export const ocupaciones = [
  {
    id_ocupacion: 1,
    id_depto: 1,
    inquilino: "JOSE",
    fecha_ingreso: "2026-03-24",
    fecha_salida: null
  },
  {
    id_ocupacion: 2,
    id_depto: 2,
    inquilino: "MARIA",
    fecha_ingreso: "2026-03-24",
    fecha_salida: "2026-04-10"
  },
  {
    id_ocupacion: 3,
    id_depto: 2,
    inquilino: "MIGUEL",
    fecha_ingreso: "2026-04-18",
    fecha_salida: null
  }
]

export const recibo = {
  fecha_inicio: "2026-03-24",
  fecha_fin: "2026-04-24",
  agua: 160.80,
  alcantarillado: 72.36,
  mntto_redes: 44.30,
  total: 277.46,
  fecha_emision: "2026-05-10",
  fecha_generacion: "2026-05-15"
}

export const detalleRecibos = [
  {
    id_detalle: 1,
    id_recibo: 1,
    id_depto: 1,
    ocupante: "JOSE",
    dias_ocupados: 32,
    agua: 90.27,
    fijo: 0,
    total: 90.27
  },
  {
    id_detalle: 2,
    id_recibo: 1,
    id_depto: 2,
    ocupante: "MARIA",
    dias_ocupados: 18,
    agua: 50.78,
    fijo: 0,
    total: 50.78
  },
  {
    id_detalle: 3,
    id_recibo: 1,
    id_depto: 2,
    ocupante: "MIGUEL",
    dias_ocupados: 7,
    agua: 19.75,
    fijo: 0,
    total: 19.75
  }
]

export const resumenPropietarios = [
  {
    id_resumen: 1,
    id_recibo: 1,
    id_depto: 1,
    numero: 405,
    torre: "TORRE 1",
    propietario: "JESUS",
    agua_total: 90.27,
    fijo: 8.33,
    total_pagar: 98.60,
    detalle_ocupantes: "JOSE: 32 días = S/ 90.27"
  },
  {
    id_resumen: 2,
    id_recibo: 1,
    id_depto: 2,
    numero: 406,
    torre: "TORRE 1",
    propietario: "ELVIA",
    agua_total: 70.53,
    fijo: 8.33,
    total_pagar: 78.86,
    detalle_ocupantes:
      "MARIA: 18 días = S/ 50.78 / MIGUEL: 7 días = S/ 19.75"
  }
]
