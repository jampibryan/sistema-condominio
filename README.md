# 🏢 Sistema de Gestión de Condominio

¡Bienvenido al **Sistema de Gestión de Condominio**! Una solución web moderna, rápida y profesional diseñada para automatizar la distribución de pagos de agua y mantenimiento en edificios residenciales.

Este sistema elimina los cálculos manuales y errores humanos, centralizando toda la información en una interfaz intuitiva conectada directamente con Google Sheets.

---

## 🚀 Estado del Proyecto: Fase 1 (Frontend Premium)
Actualmente, el sistema se encuentra al **100% de su desarrollo visual e interactivo**. Hemos construido una base sólida, escalable y con una experiencia de usuario de alto nivel.

- [x] Arquitectura base en Vue 3.
- [x] Rediseño UI/UX Premium con Tailwind CSS v4.
- [x] Lógica de negocio implementada (Mock Data).
- [x] Generación de recibos imprimibles.
- [ ] **Siguiente Paso:** Conexión en tiempo real con el backend de Google Apps Script.

---

## 🧠 Lógica de Negocio (Distribución de Costos)
El sistema aplica reglas automáticas para garantizar un cobro justo a cada departamento:

1.  **Distribución de Agua:** El costo del recibo de Sedapal se distribuye **proporcionalmente** según los días que cada inquilino ocupó el departamento dentro del rango de fechas del recibo.
2.  **Costos Fijos Comunitarios:** El Alcantarillado y el Mantenimiento de Redes son costos fijos que se dividen equitativamente entre los **14 departamentos**, sin importar los días de ocupación.

---

## 🛠️ Stack Tecnológico
- **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Diseño premium y responsivo).
- **Enrutado:** [Vue Router](https://router.vuejs.org/).
- **Backend:** [Google Apps Script](https://developers.google.com/apps-script) (GAS).
- **Base de Datos:** [Google Sheets](https://www.google.com/sheets/about/).

---

## 📂 Estructura del Proyecto
Hemos organizado el proyecto con una arquitectura limpia y totalmente en español para facilitar su mantenimiento:

```text
src/
├── componentes/   # Elementos reutilizables (Botones, Modales, Layout)
├── vistas/        # Pantallas principales (Dashboard, Recibos, etc.)
├── rutas/         # Configuración de navegación de la App
├── servicios/     # Lógica de datos y conexión con Apps Script
├── utilidades/    # Funciones de formato (Moneda, Fechas)
└── recursos/      # Imágenes y estilos globales
```

---

## ✨ Características Principales
- **Dashboard Administrativo:** Resumen visual del estado actual del condominio.
- **Gestión de Recibos:** Formulario para ingresar parámetros mensuales y generar cálculos instantáneos.
- **Recibo Individual Imprimible:** Generación de un ticket de pago profesional para cada propietario, optimizado para impresión física o PDF.
- **Control de Ocupación:** Registro histórico de inquilinos con fechas de ingreso y salida.
- **Diseño Glassmorphism:** Interfaz moderna con efectos de transparencia, gradientes y micro-animaciones.

---

## 💻 Instalación y Uso Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/jampibryan/sistema-condominio.git
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar en modo desarrollo:**
    ```bash
    npm run dev
    ```
4.  **Compilar para producción:**
    ```bash
    npm run build
    ```

---

Desarrollado con ❤️ para una gestión eficiente y transparente.
