const API_URL = import.meta.env.VITE_API_URL;

// ──────────────────────────────────────────────────
// CACHÉ EN MEMORIA — evita re-llamar a Google Sheets
// cada vez que el usuario navega entre vistas
// ──────────────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

/** Borra toda la caché (útil tras un POST) */
export function invalidateCache() {
  cache.clear();
}

// ──────────────────────────────────────────────────
// Normalizar claves a minúsculas
// ──────────────────────────────────────────────────
function normalize(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(item =>
    Object.fromEntries(
      Object.entries(item).map(([k, v]) => [k.toString().toLowerCase(), v])
    )
  );
}

// ──────────────────────────────────────────────────
// GET
// ──────────────────────────────────────────────────
export async function fetchGet(action) {
  // 1. Intentar caché
  const cached = getCached(action);
  if (cached) return cached;

  // 2. Llamar a Google Apps Script
  const url = `${API_URL}?accion=${action}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Error del servidor');

  const data = normalize(json.data);
  setCache(action, data);
  return data;
}

// ──────────────────────────────────────────────────
// POST
// ──────────────────────────────────────────────────
export async function fetchPost(action, payload) {
  const body = JSON.stringify({ accion: action, datos: payload });
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Error del servidor');

  // Invalidar la caché tras cualquier escritura
  invalidateCache();
  return json;
}
