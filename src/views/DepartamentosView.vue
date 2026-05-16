<script setup>
import { departamentos } from '../services/mockData'
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Departamentos</h1>
    </div>
    
    <div class="card-content">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Torre</th>
              <th>Propietario</th>
              <th>Teléfono</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="depto in departamentos" :key="depto.id_depto">
              <td>{{ depto.id_depto }}</td>
              <td class="fw-bold">{{ depto.numero }}</td>
              <td>{{ depto.torre }}</td>
              <td>{{ depto.propietario }}</td>
              <td>{{ depto.telefono }}</td>
              <td>
                <span class="badge" :class="depto.activo ? 'badge-active' : 'badge-inactive'">
                  {{ depto.activo ? 'Activo' : 'Inactivo' }}
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
  background-color: #dcfce7;
  color: #166534;
}

.badge-inactive {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
