<script setup>
import { recibo, resumenPropietarios, detalleRecibos } from '../services/mockData'
import { formatCurrency, formatDate } from '../utils/formatters'
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Recibo del Mes</h1>
      <button class="btn btn-primary">Generar Nuevo</button>
    </div>
    
    <!-- 1. RESUMEN GLOBAL DEL RECIBO -->
    <div class="card-content mb-4 summary-card">
      <div class="summary-header">
        <div>
          <h2 class="text-xl fw-bold">Periodo: {{ formatDate(recibo.fecha_inicio) }} - {{ formatDate(recibo.fecha_fin) }}</h2>
          <p class="text-muted text-sm mt-1">Generado el {{ formatDate(recibo.fecha_generacion) }}</p>
        </div>
        <div class="total-badge">
          <span>Total Facturado</span>
          <strong>{{ formatCurrency(recibo.total) }}</strong>
        </div>
      </div>
      
      <div class="summary-grid mt-4">
        <div class="summary-item">
          <span class="label">Total Agua</span>
          <span class="val text-blue">{{ formatCurrency(recibo.agua) }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Alcantarillado</span>
          <span class="val">{{ formatCurrency(recibo.alcantarillado) }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Mantenimiento</span>
          <span class="val">{{ formatCurrency(recibo.mntto_redes) }}</span>
        </div>
      </div>
    </div>

    <!-- 2. RESUMEN POR DEPARTAMENTO -->
    <h3 class="section-title">Resumen por Departamento</h3>
    <div class="card-content mb-4">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Dpto</th>
              <th>Propietario</th>
              <th>Agua Total</th>
              <th>Fijo</th>
              <th>Total a Pagar</th>
              <th>Detalle (Inquilinos)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in resumenPropietarios" :key="res.id_resumen">
              <td class="fw-bold">{{ res.numero }}</td>
              <td>{{ res.propietario }}</td>
              <td>{{ formatCurrency(res.agua_total) }}</td>
              <td>{{ formatCurrency(res.fijo) }}</td>
              <td class="fw-bold text-blue">{{ formatCurrency(res.total_pagar) }}</td>
              <td class="text-sm text-muted">{{ res.detalle_ocupantes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 3. DETALLE EXACTO POR OCUPANTE -->
    <h3 class="section-title">Cálculo Detallado por Ocupante</h3>
    <div class="card-content">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Ocupante</th>
              <th>Dpto</th>
              <th>Días Ocupados</th>
              <th>Costo Agua</th>
              <th>Costo Fijo</th>
              <th>Total Ocupante</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="det in detalleRecibos" :key="det.id_detalle">
              <td class="fw-bold">{{ det.ocupante }}</td>
              <td>{{ det.id_depto === 1 ? '405' : '406' }}</td>
              <td>{{ det.dias_ocupados }} días</td>
              <td>{{ formatCurrency(det.agua) }}</td>
              <td>{{ formatCurrency(det.fijo) }}</td>
              <td class="fw-bold text-green">{{ formatCurrency(det.total) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.mb-4 { margin-bottom: 24px; }
.mt-1 { margin-top: 4px; }
.mt-4 { margin-top: 16px; }

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-main);
  margin-bottom: 12px;
}

.text-xl { font-size: 1.25rem; }
.text-sm { font-size: 0.85rem; }
.text-muted { color: var(--color-text-muted); }
.text-blue { color: var(--color-primary); }
.text-green { color: #16a34a; }
.fw-bold { font-weight: 600; }

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background-color: var(--color-primary);
  color: white;
  transition: background-color var(--transition-fast);
}
.btn:hover { background-color: var(--color-primary-hover); }

/* Card Summary */
.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 16px;
}

.total-badge {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.total-badge span { font-size: 0.8rem; color: #1e3a8a; font-weight: 600; text-transform: uppercase;}
.total-badge strong { font-size: 1.5rem; color: var(--color-primary); }

.summary-grid {
  display: flex;
  gap: 32px;
}
.summary-item {
  display: flex;
  flex-direction: column;
}
.summary-item .label { font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;}
.summary-item .val { font-size: 1.2rem; font-weight: 600; color: var(--color-text-main);}

/* Tablas */
.table-responsive { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; text-align: left; }
.table th, .table td { padding: 12px 16px; border-bottom: 1px solid var(--color-border); }
.table th { background-color: #f8fafc; color: var(--color-text-muted); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
.table tbody tr:hover { background-color: #f1f5f9; }
</style>
