<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="logo-text">Condominio<br><span>Familiar</span></h2>
    </div>
    
    <nav class="sidebar-nav">
      <RouterLink to="/" class="nav-item">
        <!-- Ícono simple SVG (Home) -->
        <svg xmlns="http://www.w3.org/-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Dashboard</span>
      </RouterLink>
      
      <RouterLink to="/recibos" class="nav-item">
        <!-- Ícono simple SVG (Receipts) -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
        <span>Recibos</span>
      </RouterLink>
      
      <RouterLink to="/propietarios" class="nav-item">
        <!-- Ícono simple SVG (Users) -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Propietarios</span>
      </RouterLink>
      
      <RouterLink to="/departamentos" class="nav-item">
        <!-- Ícono simple SVG (Building) -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
        <span>Departamentos</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background-color: var(--color-bg-sidebar);
  color: var(--color-text-sidebar);
  display: flex;
  flex-direction: column;
  transition: width var(--transition-fast);
  z-index: 100;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.logo-text span {
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-text-sidebar);
}

.sidebar-nav {
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--color-text-sidebar);
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background-color: var(--color-bg-sidebar-hover);
  color: white;
}

.nav-item.router-link-active {
  background-color: var(--color-primary);
  color: white;
}

.nav-item svg {
  flex-shrink: 0;
}

/* Responsive básico para esconder en pantallas pequeñas (por ahora) */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100vh;
    transform: translateX(-100%);
  }
  /* En el futuro se añadirá clase para abrir/cerrar */
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
