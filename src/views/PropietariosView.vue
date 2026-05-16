<script setup>
import { ocupaciones } from '../services/mockData'
import { formatDate } from '../utils/formatters'
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Propietarios e Inquilinos</h1>
    </div>
    
    <div class="card-content">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>ID Ocupación</th>
              <th>ID Depto</th>
              <th>Inquilino</th>
              <th>Fecha Ingreso</th>
              <th>Fecha Salida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ocup in ocupaciones" :key="ocup.id_ocupacion">
              <td>#{{ ocup.id_ocupacion }}</td>
              <td>Dpto {{ ocup.id_depto === 1 ? '405' : '406' }}</td>
              <td class="fw-bold">{{ ocup.inquilino }}</td>
              <td>{{ formatDate(ocup.fecha_ingreso) }}</td>
              <td>{{ ocup.fecha_salida ? formatDate(ocup.fecha_salida) : '-' }}</td>
              <td>
                <span class="badge" :class="!ocup.fecha_salida ? 'badge-active' : 'badge-inactive'">
                  {{ !ocup.fecha_salida ? 'Vigente' : 'Finalizado' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  margin-bottom: 24px;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.table th, .table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
}

.table th {
  background-color: #f8fafc;
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table tbody tr:hover {
  background-color: #f1f5f9;
}

.fw-bold {
  font-weight: 600;
  color: var(--color-text-main);
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.badge-active {
  background-color: #d0bdf4; /* Un morado claro, estilo sobrio */
  color: #4c1d95;
}

.badge-inactive {
  background-color: #f1f5f9;
  color: #64748b;
}
</style>
