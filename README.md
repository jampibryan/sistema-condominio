# 🏢 Sistema de Gestión de Condominio

## ✨ Visión General

Solución web moderna y responsiva para automatizar la distribución de pagos de agua y mantenimiento en edificios residenciales. Interfaz premium conectada en tiempo real a una base de datos relacional de **PostgreSQL** administrada a través de **Supabase**.

---

## 📐 Arquitectura del Sistema

El sistema se encuentra en proceso de migración para modernizar su infraestructura y mejorar su estabilidad, escalabilidad y rendimiento:

* **Arquitectura Objetivo (Actual):**
  `Vue.js (Frontend) → Supabase Client (SDK) → Supabase API → PostgreSQL (Base de datos)`
  
* **Arquitectura Anterior (Deprecada):**
  `Vue.js → Google Apps Script (Web API) → Google Sheets`

---

## 🚀 Estado del Proyecto y Migración

¡La migración del backend y de la base de datos se ha completado al **100% de forma exitosa**!
- **Totalmente Conectado:** Todas las vistas principales (**Dashboard**, **Departamentos**, **Ocupaciones / Inquilinos** e **Histórico de Recibos**) consumen y persisten datos en tiempo real directamente en sus respectivas tablas relacionales en **Supabase** (`PostgreSQL`):
  - `departamentos` (CRUD completo)
  - `ocupaciones` (CRUD completo de estancias)
  - `recibos` (Histórico de recibos mensuales)
  - `detalle_recibos` (Cálculo proporcional por ocupante)
  - `resumen_propietarios` (Cobros unificados por departamento)
- **Cero Dependencia de Terceros:** Se ha eliminado por completo la dependencia de Google Sheets, archivos de Apps Script (`Code.gs`), endpoints `doGet`/`doPost` y lógica en la nube de Google.
- **Motor de Facturación Local:** Toda la lógica de repartición de costos y días de solapamiento se procesa con precisión y alta velocidad en el cliente mediante `billingEngine.js`.

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|---|---|
| **Frontend** | Vue 3 (Composition API) + Vue Router |
| **Estilos** | Tailwind CSS v4 (glassmorphism, degradados, micro‑animaciones) |
| **Backend / API** | Supabase API (SDK oficial de `@supabase/supabase-js`) |
| **Base de datos** | PostgreSQL (Alojado en Supabase) |
| **Build** | Vite |
| **Deploy** | Compatible con Vercel, Netlify o cualquier host de aplicaciones moderno |
| **Repositorio** | GitHub |

---

## 🧠 Lógica de Negocio

El sistema aplica reglas automáticas para garantizar un cobro justo y transparente:

1. **💧 Agua** — Se distribuye **proporcionalmente** según los días exactos que cada inquilino ocupó el departamento dentro del periodo del recibo.
2. **🔧 Costos fijos** (Alcantarillado + Mantenimiento de Redes) — Se dividen **equitativamente** entre los 14 departamentos, sin importar la ocupación.

---

## 📂 Estructura del Proyecto

```text
src/
├── componentes/      # UI reutilizable (modales, layout, sidebar, header)
├── vistas/           # Pantallas principales (Dashboard, Recibos, Departamentos)
├── rutas/            # Configuración de Vue Router
├── lib/              # Inicialización de clientes externos (supabaseClient.js)
├── servicios/        # Capa lógica de servicios (departamentos, ocupaciones, recibos)
├── utilidades/       # Helpers globales de formato (monedas, fechas)
└── recursos/         # Imágenes, iconos y estilos CSS globales
```

---

## 📦 Variables de Entorno

Para conectarse con Supabase en desarrollo y producción, debes configurar las siguientes variables de entorno:

| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL de la API de tu proyecto de Supabase (ej: `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Clave pública anónima (*anon key*) suministrada por Supabase |

---

## 💻 Instalación y Uso Local

### Prerrequisitos
- Node.js ≥ 18
- npm ≥ 9
- Un proyecto activo en Supabase con la tabla `departamentos` creada.

### Pasos para iniciar en desarrollo

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
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
   Abre el archivo `.env` en tu editor y define las credenciales de tu proyecto de Supabase:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
   ```

4. **Ejecutar servidor local**
   ```bash
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:5173`. Si las variables no están configuradas o el servicio falla, la vista usará los datos de prueba (`mockData.js`) de forma transparente y mostrará una advertencia en la consola de desarrollador.

5. **Compilar para producción**
   ```bash
   npm run build
   ```
   Los archivos listos para producción se generarán en la carpeta `dist/`.

---

## 🚀 Despliegue en Vercel

Dado que el proyecto está desarrollado con **Vite**, el despliegue en Vercel es sumamente rápido:

1. Conecta tu repositorio de GitHub a tu cuenta de Vercel.
2. Crea un nuevo proyecto en Vercel seleccionando dicho repositorio.
3. En la sección de **Configuración de Variables de Entorno**, agrega:
   - `VITE_SUPABASE_URL` (URL de tu Supabase)
   - `VITE_SUPABASE_ANON_KEY` (Anon Key de tu Supabase)
4. Presiona **Deploy**. Vercel detectará la configuración de Vite y compilará la aplicación de forma automática.
