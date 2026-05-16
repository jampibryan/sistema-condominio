<script setup>
// Aquí más adelante añadiremos lógica para el usuario y notificaciones
</script>

<template>
  <header class="header">
    <div class="header-left">
      <!-- Botón hamburguesa (solo visible en móvil en el futuro) -->
      <button class="menu-btn" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
    
    <div class="header-right">
      <div class="user-profile">
        <div class="avatar">
          <span>A</span>
        </div>
        <div class="user-info">
          <span class="user-name">Administrador</span>
          <span class="user-role">Condominio</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 64px;
  background-color: var(--color-bg-header);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: var(--shadow-sm);
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-main);
  padding: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.avatar {
  width: 36px;
  height: 36px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text-main);
}

.user-role {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .menu-btn {
    display: flex;
  }
  .user-info {
    display: none;
  }
}
</style>
