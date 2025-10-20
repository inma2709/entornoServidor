import React from "react";
import { Link } from "react-router-dom";

export default function CrudExpress() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary">
          8. CRUD Básico: API REST completa (en memoria)
        </h2>
        <p className="text-secondary/70 mt-2 max-w-3xl mx-auto">
          Create, Read, Update y Delete con Express. Empezamos con datos en memoria
          para centrarnos en las rutas, validación y buenas prácticas. Luego
          persistiremos en BD (UF1845).
        </p>
      </header>

      {/* OBJETIVOS + MAPA */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🎯 Objetivos</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Crear una API con endpoints REST y respuestas JSON coherentes.</li>
          <li>Aplicar <strong>validación</strong>, <strong>códigos de estado</strong> y manejo de errores.</li>
          <li>Usar <strong>query params</strong> (búsqueda, paginación, ordenación).</li>
          <li>Diferenciar <code>PUT</code> vs <code>PATCH</code> y cuándo usarlos.</li>
        </ul>
      </section>

      {/* PASO 1: ESTRUCTURA BASE + DATOS MOCK */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">1) Estructura base del servidor</h3>
        <p className="mt-2">
          Partimos de un <code>server.js</code> con <code>express.json()</code> y una
          pequeña “base de datos” en memoria (un array).
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold">📄 server.js (CommonJS)</h4>
          <pre className="overflow-x-auto text-sm">
{`const express = require('express');
const app = express();
const PORT = 3000;

// 1) Datos "en memoria"
let items = [
  { id: 1, name: 'Comprar leche', done: false },
  { id: 2, name: 'Estudiar Express', done: true },
];
let nextId = 3;

// 2) Middleware para leer JSON del body
app.use(express.json());

// 3) Salud
app.get('/api/status', (_req, res) => {
  res.json({ ok: true, count: items.length });
});

// (Endpoints CRUD irán aquí)

// 4) 404 - al final
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada ❌' });
});

// 5) Manejador de errores central
app.use((err, req, res, _next) => {
  console.error('💥 Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
});

app.listen(PORT, () => {
  console.log('✅ CRUD en http://localhost:' + PORT);
});`}
          </pre>
        </div>
      </section>

      {/* PASO 2: VALIDACIÓN Y HELPERS */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">2) Validación y helpers</h3>
        <p className="mt-2">
          Añadimos funciones auxiliares: buscar por id, validar payloads y una pequeña
          utilidad para paginar/ordenar/filtrar la colección.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <pre className="overflow-x-auto text-sm">
{`// === Helpers dentro de server.js (por simplicidad) ===

// A) Buscar item por id
function findById(id) {
  const num = Number(id);
  if (Number.isNaN(num)) return null;
  return items.find(i => i.id === num) || null;
}

// B) Validar creación/actualización (name obligatorio, done opcional boolean)
function validatePayload(body, { partial = false } = {}) {
  const errors = [];

  if (!partial || body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim().length < 3) {
      errors.push('El campo "name" es obligatorio (mín. 3 caracteres)');
    }
  }
  if (body.done !== undefined && typeof body.done !== 'boolean') {
    errors.push('El campo "done" debe ser boolean');
  }

  return errors;
}

// C) Query helpers para listar: ?q=texto&page=1&limit=10&sort=asc|desc
function queryList(collection, { q, page = 1, limit = 10, sort = 'asc' } = {}) {
  let result = [...collection];

  if (q) {
    const s = String(q).toLowerCase();
    result = result.filter(it => it.name.toLowerCase().includes(s));
  }

  // Orden por id (asc|desc)
  result.sort((a, b) => (sort === 'desc' ? b.id - a.id : a.id - b.id));

  // Paginación
  const p = Math.max(Number(page) || 1, 1);
  const l = Math.max(Number(limit) || 10, 1);
  const start = (p - 1) * l;
  const data = result.slice(start, start + l);

  return {
    page: p,
    limit: l,
    total: result.length,
    data,
  };
}`}
          </pre>
        </div>
      </section>

      {/* PASO 3: READ (LISTAR + DETALLE) CON QUERY PARAMS */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">3) READ: listar y detalle</h3>
        <p className="mt-2">
          Implementamos <code>GET /api/items</code> con búsqueda, orden y paginación; y
          <code>GET /api/items/:id</code> para detalle.
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <pre className="overflow-x-auto text-sm">
{`// GET /api/items?q=milk&page=1&limit=5&sort=desc
app.get('/api/items', (req, res) => {
  const { q, page, limit, sort } = req.query;
  const result = queryList(items, { q, page, limit, sort });
  res.json(result);
});

// GET /api/items/:id
app.get('/api/items/:id', (req, res) => {
  const item = findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Ítem no encontrado' });
  res.json(item);
});`}
          </pre>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">Prueba</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-secondary/90">
            <li><code>GET /api/items</code></li>
            <li><code>GET /api/items?q=estudiar&sort=desc</code></li>
            <li><code>GET /api/items/1</code></li>
          </ul>
        </div>
      </section>

      {/* PASO 4: CREATE (POST) CON VALIDACIÓN */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">4) CREATE: POST con validación</h3>
        <p className="mt-2">
          Validamos el cuerpo con <code>validatePayload</code>. Si falta <code>name</code> o
          es inválido, devolvemos <code>400</code>.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <pre className="overflow-x-auto text-sm">
{`// POST /api/items { "name": "Tarea nueva", "done": false }
app.post('/api/items', (req, res) => {
  const errors = validatePayload(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const newItem = {
    id: nextId++,
    name: req.body.name.trim(),
    done: req.body.done ?? false,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});`}
          </pre>
        </div>

        <p className="text-sm text-secondary/80 mt-2">
          💡 En APIs reales, la validación suele hacerse con librerías como Zod/Joi/express-validator.
        </p>
      </section>

      {/* PASO 5: UPDATE (PUT vs PATCH) */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">5) UPDATE: PUT vs PATCH</h3>
        <p className="mt-2">
          <strong>PUT</strong> reemplaza (o actualiza todos los campos obligatorios); <strong>PATCH</strong>
          actualiza parcialmente. Mostramos ambos.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">PUT (actualización completa)</h4>
            <pre className="overflow-x-auto text-sm mt-2">
{`// PUT /api/items/:id { "name": "Nuevo nombre", "done": true }
app.put('/api/items/:id', (req, res) => {
  const item = findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Ítem no encontrado' });

  const errors = validatePayload(req.body, { partial: false });
  if (errors.length) return res.status(400).json({ errors });

  item.name = req.body.name.trim();
  item.done = !!req.body.done;
  res.json(item);
});`}
            </pre>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">PATCH (actualización parcial)</h4>
            <pre className="overflow-x-auto text-sm mt-2">
{`// PATCH /api/items/:id { "done": true }
app.patch('/api/items/:id', (req, res) => {
  const item = findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Ítem no encontrado' });

  const errors = validatePayload(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ errors });

  if (req.body.name !== undefined) item.name = req.body.name.trim();
  if (req.body.done !== undefined) item.done = !!req.body.done;

  res.json(item);
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* PASO 6: DELETE */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">6) DELETE: borrar por id</h3>
        <p className="mt-2">
          Devolvemos <code>204 No Content</code> si se borra correctamente.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <pre className="overflow-x-auto text-sm">
{`// DELETE /api/items/:id
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter(i => i.id !== id);

  if (items.length === before) {
    return res.status(404).json({ error: 'Ítem no encontrado para borrar' });
  }
  res.status(204).send();
});`}
          </pre>
        </div>
      </section>

      {/* PASO 7: MIDDLEWARE LOGGER + ERRORES (extra) */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">7) Logger y manejo central de errores</h3>
        <p className="mt-2">
          Es buena práctica registrar cada petición y delegar los errores a un middleware final.
          (En producción usarías morgan/pino).
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <pre className="overflow-x-auto text-sm">
{`// Logger muy simple (colócalo antes de las rutas)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(\`📥 \${req.method} \${req.url} → \${res.statusCode} (\${ms}ms)\`);
  });
  next();
});

// Ejemplo de ruta que lanza error (para probar el handler)
app.get('/api/error', (_req, _res, next) => {
  next(new Error('Falló a propósito'));
});`}
          </pre>
        </div>
      </section>

      {/* PASO 8: RUTER MODULAR (BONUS) */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">8) Bonus: modulariza con Router</h3>
        <p className="mt-2">
          A medida que crece la API, mueve las rutas a un <code>Router</code> dedicado.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold">📄 routes/items.js</h4>
            <pre className="overflow-x-auto text-sm">
{`const { Router } = require('express');
const router = Router();

// /api/items (usa aquí las funciones y datos importados o inyectados)
router.get('/', (req, res) => { /* ... */ });
router.get('/:id', (req, res) => { /* ... */ });
router.post('/', (req, res) => { /* ... */ });
router.put('/:id', (req, res) => { /* ... */ });
router.patch('/:id', (req, res) => { /* ... */ });
router.delete('/:id', (req, res) => { /* ... */ });

module.exports = router;`}
            </pre>
          </div>
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold">📄 server.js (montaje)</h4>
            <pre className="overflow-x-auto text-sm">
{`const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);`}
            </pre>
          </div>
        </div>

        <p className="text-sm text-secondary/80 mt-2">
          💡 Más adelante separaremos capa de rutas/controladores/servicios (arquitectura por capas).
        </p>
      </section>

      {/* PRACTICA GUIADA */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">🧪 Práctica guiada (20–30 min)</h3>
        <ol className="list-decimal pl-6 mt-2 space-y-2">
          <li>
            Añade <code>GET /api/items?done=true</code> para filtrar por completados.
            (Pista: filtra por <code>it.done === true</code> tras aplicar <code>q</code>).
          </li>
          <li>
            Crea <code>PATCH /api/items/:id/toggle</code> que invierta el estado <code>done</code>.
          </li>
          <li>
            Implementa un middleware que rechace <code>name</code> con palabras prohibidas
            (p. ej. “spam”). Devuelve <code>422 Unprocessable Entity</code>.
          </li>
          <li>
            Añade cabecera <code>X-Powered-By: MF0492_3</code> en todas las respuestas (middleware).
          </li>
        </ol>
      </section>

      {/* CONEXIÓN FRONT Y CONSEJOS */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">🔗 Conexión con el Front</h3>
        <p className="mt-2">
          Tu app React puede consumir esta API con <code>fetch</code>:
        </p>
        <pre className="mt-2 p-3 bg-light rounded-xl overflow-auto text-sm">
{`// Crear
await fetch('/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Nueva tarea' })
});

// Listar
const resp = await fetch('/api/items?q=tarea&page=1&limit=5&sort=desc');
const data = await resp.json();`}
        </pre>
        <p className="text-sm text-secondary/80 mt-2">
          ⚠️ Recuerda: al ser “en memoria”, los datos se pierden al reiniciar. En UF1845
          los persistiremos en MySQL.
        </p>
      </section>

      {/* NAVEGACIÓN */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/introduccion-express" className="hover:underline text-primary font-medium">
          ← Lección anterior: Introducción a Express
        </Link>
        <Link to="/mf0492/uf1844/gestion-persistencia" className="hover:underline text-primary font-medium">
          Siguiente: Gestión de Datos y Persistencia (Conexión BD) →
        </Link>
      </footer>
    </article>
  );
}
