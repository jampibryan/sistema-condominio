<script setup>
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Resumen de Mes</h1>
    
    <div class="dashboard-grid">
      <!-- Tarjetas de resumen (Ejemplos visuales) -->
      <div class="stat-card">
        <div class="stat-title">Recibos Emitidos</div>
        <div class="stat-value">0</div>
        <div class="stat-desc">Mes actual</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-title">Total Recaudado</div>
        <div class="stat-value">S/ 0.00</div>
        <div class="stat-desc">Mes actual</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-title">Departamentos Ocupados</div>
        <div class="stat-value">0 / 14</div>
        <div class="stat-desc">Ocupación actual</div>
      </div>
    </div>

    <div class="card-content mt-4">
      <h3>Bienvenido al Sistema de Condominio</h3>
      <p style="margin-top: 12px; color: var(--color-text-muted);">
        Selecciona una opción del menú lateral para comenzar.
      </p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background-color: var(--color-bg-header);
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.stat-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-main);
  margin-bottom: 8px;
}

.stat-desc {
  font-size: 0.8rem;
  color: var(--color-primary);
  font-weight: 500;
}

.mt-4 {
  margin-top: 24px;
}
</style>
