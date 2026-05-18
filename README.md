# 🏢 Sistema de Gestión de Condominio

## ✨ Visión General

Solución web moderna y responsiva para automatizar la distribución de pagos de agua y mantenimiento en edificios residenciales. Interfaz premium conectada en tiempo real a Google Sheets como base de datos.

---

## 🚀 Estado del Proyecto

- [x] Arquitectura base en Vue 3 (Composition API)
- [x] Diseño UI/UX premium con Tailwind CSS v4
- [x] Conexión en tiempo real con Google Apps Script (API REST)
- [x] Caché inteligente en memoria (5 min) para carga rápida
- [x] Dashboard con métricas reales del condominio
- [x] Generación de recibos con cálculo automático de distribución
- [x] Recibo imprimible por propietario (PDF)
- [x] Control de ocupación con historial de inquilinos
- [x] Gestión visual de departamentos por torre

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|---|---|
| **Frontend** | Vue 3 (Composition API) + Vue Router |
| **Estilos** | Tailwind CSS v4 (glassmorphism, degradados, micro‑animaciones) |
| **Backend** | Google Apps Script (expuesto como Web API) |
| **Base de datos** | Google Sheets |
| **Build** | Vite |
| **Deploy** | Compatible con Vercel, Netlify o cualquier host estático |

---

## 🧠 Lógica de Negocio

El sistema aplica reglas automáticas para garantizar un cobro justo:

1. **💧 Agua** — Se distribuye **proporcionalmente** según los días que cada inquilino ocupó el departamento dentro del periodo del recibo.
2. **🔧 Costos fijos** (Alcantarillado + Mantenimiento de Redes) — Se dividen **equitativamente** entre los 14 departamentos, sin importar la ocupación.

---

## 📂 Estructura del Proyecto

```text
src/
├── componentes/      # UI reutilizable (modales, layout, sidebar, header)
├── vistas/           # Pantallas: Dashboard, Recibos, Departamentos, Ocupaciones
├── rutas/            # Configuración del router
├── servicios/        # API wrapper con caché (fetchGet, fetchPost)
├── utilidades/       # Helpers de formato (monedas, fechas)
└── recursos/         # Imágenes y estilos globales
```

---

## ✨ Características Principales

- **Dashboard interactivo** — Métricas en tiempo real: recibos emitidos, último monto facturado, ocupantes activos.
- **Recibos con tarjetas por propietario** — Cada departamento tiene su tarjeta con barra de proporción (agua vs. cuota fija) y explicación didáctica.
- **Recibo imprimible** — Modal optimizado para impresión física o PDF.
- **Control de ocupación** — Vista separada entre inquilinos vigentes y finalizados, con avatares y fechas claras.
- **Departamentos** — Grid de tarjetas con colores por torre y estado activo/inactivo.
- **Carga ultra-rápida** — Caché inteligente + peticiones paralelas (`Promise.all`).

---

## 📦 Instalación y Uso Local

### Prerrequisitos
- Node.js ≥ 18
- npm ≥ 9
- Cuenta de Google con acceso a Google Sheets y Google Apps Script

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jampibryan/sistema-condominio.git
   cd sistema-condominio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita `.env` y coloca la URL pública de tu Google Apps Script Web App en la variable `VITE_API_URL`.

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   Disponible en `http://localhost:5173`.

5. **Compilar para producción**
   ```bash
   npm run build
   ```
   Los archivos estáticos quedan en el directorio `dist/`.

---

## 🔧 Configuración del Backend

1. Crear un proyecto en **Google Apps Script** vinculado a tu hoja de cálculo.
2. Implementar las funciones `doGet` y `doPost` para exponer los datos como API REST.
3. Publicar como **Web App** con acceso público.
4. Copiar la URL generada y pegarla en el archivo `.env` del frontend.

> ⚠️ Nunca subas el archivo `.env` a repositorios públicos. Agrega `.env` a tu `.gitignore`.

---

## 🤝 Contribuciones

1. Fork del repositorio
2. Crea una rama descriptiva (`git checkout -b feature/nueva-funcionalidad`)
3. Implementa y prueba tus cambios
4. Envía un Pull Request con una descripción clara

---

## 📄 Licencia

Proyecto bajo licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

Desarrollado para una gestión de condominios más **eficiente**, **transparente** y **moderna**.
