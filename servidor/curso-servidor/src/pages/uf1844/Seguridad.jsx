import React from "react";
import { Link } from "react-router-dom";

export default function GestionPersistencia() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary">
          9. Gestión de Datos y Persistencia en Express
        </h2>
        <p className="text-secondary/70 mt-2 max-w-3xl mx-auto">
          Que tus datos sobrevivan a un reinicio del servidor: de “memoria” a “disco” con JSON,
          preparando la migración a SQL (UF1845).
        </p>
      </header>

      {/* OBJETIVOS Y MAPA */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🎯 Objetivos</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Entender el problema de la persistencia y sus retos.</li>
          <li>Leer y escribir datos en disco usando <code>fs/promises</code> (JSON).</li>
          <li>Crear una <strong>capa de repositorio</strong> (DAO) desacoplada del router.</li>
          <li>Manejar errores y respuestas coherentes (404, 400, 500).</li>
          <li>Dejar la app lista para migrar a <strong>MySQL</strong> cambiando solo la capa de datos.</li>
        </ul>
      </section>

      {/* ¿POR QUÉ UN PASO INTERMEDIO CON JSON? */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">1) ¿Por qué empezar con JSON en disco?</h3>
        <p className="mt-2 text-secondary/90">
          Un archivo JSON es una “mini BD” accesible sin instalar nada. Sirve para practicar:
          asincronía, manejo de errores, validación y separación de capas. Después solo cambiaremos
          la implementación para hablar con MySQL.
        </p>
        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <ul className="list-disc pl-6 space-y-1 text-secondary/90">
            <li>✅ Persistencia real (no se pierde al reiniciar).</li>
            <li>✅ Fácil de inspeccionar (abrir <code>.json</code>).</li>
            <li>⚠️ No concurrente ni transaccional (limitaciones reales de ficheros).</li>
          </ul>
        </div>
      </section>

      {/* ESTRUCTURA DE ARCHIVOS */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">2) Estructura de proyecto (sugerida)</h3>
        <pre className="mt-2 p-3 bg-light rounded-xl overflow-auto text-sm">
{`my-api/
├─ data/
│  └─ items.json               # nuestra "BD" en JSON
├─ src/
│  ├─ server.js                # arranque de Express
│  ├─ routes/
│  │   └─ items.js             # rutas CRUD
│  └─ repositories/
│      └─ items.repo.js        # capa de datos (JSON ahora, SQL después)
└─ package.json`}
        </pre>
      </section>

      {/* PASO 1: CREAR EL JSON Y REPOSITORIO */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">3) Paso 1 — Repositorio con JSON</h3>
        <p className="mt-2">
          Implementamos funciones para <strong>leer</strong> y <strong>escribir</strong> el archivo.  
          Usamos <code>fs/promises</code> y escribimos de forma “atómica” (escribir y sobrescribir el mismo fichero).
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold">📄 <code>data/items.json</code></h4>
          <pre className="overflow-x-auto text-sm">
{`{ "nextId": 3, "items": [
  { "id": 1, "name": "Comprar leche", "done": false },
  { "id": 2, "name": "Estudiar Express", "done": true }
] }`}
          </pre>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold">📄 <code>src/repositories/items.repo.js</code> (CommonJS)</h4>
          <pre className="overflow-x-auto text-sm">
{`const { readFile, writeFile, mkdir } = require('node:fs/promises');
const { dirname } = require('node:path');
const DB_PATH = './data/items.json';

async function ensureFile() {
  try {
    await mkdir(dirname(DB_PATH), { recursive: true });
    // Si no existe, creamos una BD inicial
    await readFile(DB_PATH, 'utf8');
  } catch {
    const init = { nextId: 3, items: [
      { id: 1, name: 'Comprar leche', done: false },
      { id: 2, name: 'Estudiar Express', done: true },
    ]};
    await writeFile(DB_PATH, JSON.stringify(init, null, 2), 'utf8');
  }
}

async function load() {
  await ensureFile();
  const json = await readFile(DB_PATH, 'utf8');
  return JSON.parse(json);
}

async function save(db) {
  // Escritura atómica "simple": sobrescribir el archivo (para clase es suficiente)
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

function validate(body, { partial = false } = {}) {
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

module.exports = {
  async list({ q, page = 1, limit = 10, sort = 'asc', done } = {}) {
    const db = await load();
    let result = [...db.items];

    if (q) {
      const s = String(q).toLowerCase();
      result = result.filter(it => it.name.toLowerCase().includes(s));
    }
    if (done !== undefined) {
      const flag = String(done) === 'true';
      result = result.filter(it => it.done === flag);
    }
    result.sort((a, b) => (sort === 'desc' ? b.id - a.id : a.id - b.id));

    const p = Math.max(Number(page) || 1, 1);
    const l = Math.max(Number(limit) || 10, 1);
    const start = (p - 1) * l;

    return {
      page: p,
      limit: l,
      total: result.length,
      data: result.slice(start, start + l),
    };
  },

  async getById(id) {
    const db = await load();
    const num = Number(id);
    if (Number.isNaN(num)) return null;
    return db.items.find(i => i.id === num) || null;
  },

  async create(body) {
    const db = await load();
    const errors = validate(body);
    if (errors.length) return { errors };

    const item = {
      id: db.nextId++,
      name: body.name.trim(),
      done: body.done ?? false,
    };
    db.items.push(item);
    await save(db);
    return { item };
  },

  async updatePut(id, body) {
    const db = await load();
    const num = Number(id);
    const idx = db.items.findIndex(i => i.id === num);
    if (idx === -1) return null;

    const errors = validate(body, { partial: false });
    if (errors.length) return { errors };

    db.items[idx].name = body.name.trim();
    db.items[idx].done = !!body.done;
    await save(db);
    return { item: db.items[idx] };
  },

  async updatePatch(id, body) {
    const db = await load();
    const num = Number(id);
    const idx = db.items.findIndex(i => i.id === num);
    if (idx === -1) return null;

    const errors = validate(body, { partial: true });
    if (errors.length) return { errors };

    if (body.name !== undefined) db.items[idx].name = body.name.trim();
    if (body.done !== undefined) db.items[idx].done = !!body.done;
    await save(db);
    return { item: db.items[idx] };
  },

  async remove(id) {
    const db = await load();
    const num = Number(id);
    const before = db.items.length;
    db.items = db.items.filter(i => i.id !== num);
    if (db.items.length === before) return false;
    await save(db);
    return true;
  }
};`}
          </pre>
        </div>

        <p className="text-sm text-secondary/80 mt-3">
          ⚠️ Nota: con ficheros puede haber condiciones de carrera si hay muchas escrituras simultáneas.  
          Para clase es suficiente; con SQL gestionaremos concurrencia y transacciones.
        </p>
      </section>

      {/* PASO 2: RUTAS EXPRESS QUE USAN EL REPO */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">4) Paso 2 — Rutas Express desacopladas</h3>
        <p className="mt-2">
          El router no “sabe” si los datos vienen de JSON o MySQL. Solo llama al repositorio.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <h4 className="font-semibold">📄 <code>src/routes/items.js</code></h4>
          <pre className="overflow-x-auto text-sm">
{`const { Router } = require('express');
const repo = require('../repositories/items.repo');
const router = Router();

// Listado con filtros y paginación
router.get('/', async (req, res, next) => {
  try {
    const { q, page, limit, sort, done } = req.query;
    const result = await repo.list({ q, page, limit, sort, done });
    res.json(result);
  } catch (e) { next(e); }
});

// Detalle
router.get('/:id', async (req, res, next) => {
  try {
    const item = await repo.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Ítem no encontrado' });
    res.json(item);
  } catch (e) { next(e); }
});

// Crear
router.post('/', async (req, res, next) => {
  try {
    const out = await repo.create(req.body);
    if (out?.errors) return res.status(400).json({ errors: out.errors });
    res.status(201).json(out.item);
  } catch (e) { next(e); }
});

// PUT (reemplazo)
router.put('/:id', async (req, res, next) => {
  try {
    const out = await repo.updatePut(req.params.id, req.body);
    if (!out) return res.status(404).json({ error: 'Ítem no encontrado' });
    if (out?.errors) return res.status(400).json({ errors: out.errors });
    res.json(out.item);
  } catch (e) { next(e); }
});

// PATCH (parcial)
router.patch('/:id', async (req, res, next) => {
  try {
    const out = await repo.updatePatch(req.params.id, req.body);
    if (!out) return res.status(404).json({ error: 'Ítem no encontrado' });
    if (out?.errors) return res.status(400).json({ errors: out.errors });
    res.json(out.item);
  } catch (e) { next(e); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await repo.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Ítem no encontrado' });
    res.status(204).send();
  } catch (e) { next(e); }
});

module.exports = router;`}
          </pre>
        </div>

        <div className="bg-light p-4 rounded-xl mt-3">
          <h4 className="font-semibold">📄 <code>src/server.js</code></h4>
          <pre className="overflow-x-auto text-sm">
{`const express = require('express');
const itemsRouter = require('./routes/items');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'MF0492_3');
  next();
});

// Montaje de rutas
app.use('/api/items', itemsRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada ❌' }));

// Errores
app.use((err, req, res, _next) => {
  console.error('💥', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => console.log('✅ API con persistencia JSON en http://localhost:' + PORT));`}
          </pre>
        </div>
      </section>

      {/* PRÁCTICAS PROGRESIVAS */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">🧪 Prácticas progresivas</h3>
        <ol className="list-decimal pl-6 mt-2 space-y-2">
          <li>
            <strong>Persistencia básica:</strong> implementa <code>POST/GET</code> con JSON y verifica que al reiniciar los datos siguen ahí.
          </li>
          <li>
            <strong>Validación extra:</strong> impide <code>name</code> duplicados (case-insensitive). Responde <code>409 Conflict</code>.
          </li>
          <li>
            <strong>Filtros y paginación:</strong> añade <code>?done=true</code> y prueba <code>?page=2&amp;limit=1</code>.
          </li>
          <li>
            <strong>PATCH toggle:</strong> crea <code>PATCH /api/items/:id/toggle</code> que invierte <code>done</code>.
          </li>
          <li>
            <strong>Exportación:</strong> crea <code>GET /api/items/export</code> que devuelva el JSON completo como descarga (cabecera <code>Content-Disposition</code>).
          </li>
          <li>
            <strong>(Opcional) Control de “versión”:</strong> añade un campo <code>version</code> y rechaza <code>PUT</code> si la versión del cliente no coincide (409). Introduce el concepto de <em>concurrencia optimista</em>.
          </li>
        </ol>
      </section>

      {/* PREPARANDO LA MIGRACIÓN A SQL */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">🔀 Preparar la migración a MySQL</h3>
        <p className="mt-2">
          Si el router depende solo del repositorio, migrar a SQL será crear otro archivo
          <code> items.repo.mysql.js</code> con las mismas funciones (<code>list</code>, <code>getById</code>, etc.)
          pero usando <strong>consultas parametrizadas</strong> y un <strong>pool</strong> de conexiones.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-secondary/90">
          <li>Conserva la misma <strong>interfaz</strong> del repo.</li>
          <li>Implementa <code>list</code>/<code>getById</code>/<code>create</code>/<code>updatePut</code>/<code>updatePatch</code>/<code>remove</code> en SQL.</li>
          <li>En <code>server.js</code>, cambia <code>require('../repositories/items.repo')</code> por el repo MySQL. ¡Listo!</li>
        </ul>
      </section>

      {/* NAVEGACIÓN */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/crud-express" className="hover:underline text-primary font-medium">
          ← Lección anterior: CRUD básico (en memoria)
        </Link>
        <Link to="/mf0492/uf1845" className="hover:underline text-primary font-medium">
          Siguiente UF1845: Acceso a datos (MySQL + SQL) →
        </Link>
      </footer>
    </article>
  );
}
