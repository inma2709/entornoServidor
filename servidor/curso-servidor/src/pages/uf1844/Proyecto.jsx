import React from "react";
import { Link } from "react-router-dom";

export default function SeguridadProyecto() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-accent">
          10. Seguridad, Buenas Prácticas y Proyecto Final
        </h2>
        <p className="text-secondary/70 mt-2 max-w-3xl mx-auto">
          De API de aula a API “publicable”: secretos, validación, errores, logging, seguridad HTTP
          y despliegue. Cerramos la UF1844 con un proyecto integrador.
        </p>
      </header>

      {/* OBJETIVOS */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🎯 Objetivos de la lección</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Gestionar <strong>variables de entorno</strong> y secretos (.env) de forma segura.</li>
          <li>Añadir <strong>capas de seguridad</strong>: CORS, headers, rate limiting.</li>
          <li>Aplicar <strong>validación</strong>, <strong>manejo centralizado de errores</strong> y <strong>logging</strong>.</li>
          <li>Organizar el proyecto por capas (rutas → controladores → servicios → repositorio).</li>
          <li>Documentar, probar y <strong>desplegar</strong> la API.</li>
        </ul>
      </section>

      {/* 1) SECRETOS Y CONFIG */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">1) Manejo de secretos y configuración</h3>
        <p className="mt-2">
          Los secretos **no van al código**. Se cargan desde variables de entorno. Usa <code>dotenv</code> o (mejor)
          <code>dotenv-safe</code> para obligar a definir lo necesario.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">📄 .env.example</h4>
            <pre className="overflow-x-auto text-sm">
{`# Copia como .env y rellena
PORT=3000
NODE_ENV=development
JWT_SECRET=supersecreto_largo
CORS_ORIGIN=http://localhost:5173`}
            </pre>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">📄 src/config.js</h4>
            <pre className="overflow-x-auto text-sm">
{`require('dotenv').config();
const cfg = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
};
if (!cfg.jwtSecret) {
  throw new Error('Falta JWT_SECRET en .env');
}
module.exports = cfg;`}
            </pre>
          </div>
        </div>

        <p className="text-sm text-secondary/80 mt-2">
          💡 Añade <code>.env</code> a <code>.gitignore</code>. Sube solo <code>.env.example</code>.
        </p>
      </section>

      {/* 2) SEGURIDAD HTTP BÁSICA (helmet, cors, rate limit) */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">2) Seguridad HTTP (mínimos recomendados)</h3>
        <p className="mt-2">
          Añadimos cabeceras seguras, control de orígenes y limitamos peticiones para evitar abusos.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <h4 className="font-semibold">📦 Instala</h4>
          <pre className="overflow-x-auto text-sm bg-white p-2 rounded border">
{`npm i helmet cors express-rate-limit morgan jsonwebtoken`}
          </pre>
        </div>

        <div className="bg-light p-4 rounded-xl mt-3">
          <h4 className="font-semibold">📄 src/server.js (extracto)</h4>
          <pre className="overflow-x-auto text-sm">
{`const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cfg = require('./config');
const itemsRouter = require('./routes/items');
const app = express();

app.use(helmet());
app.use(cors({ origin: cfg.corsOrigin, credentials: true }));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Limitar 100 req / 15 min por IP
app.use('/api', rateLimit({ windowMs: 15*60*1000, max: 100 }));

app.use('/api/items', itemsRouter);

// Healthcheck y readycheck
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));
app.get('/ready',  (_req, res) => res.status(200).json({ ok: true }));

// 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada ❌' }));

// Errores
app.use((err, req, res, _next) => {
  console.error('💥', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
});

app.listen(cfg.port, () => console.log('✅ API segura en puerto', cfg.port));`}
          </pre>
        </div>
      </section>

      {/* 3) VALIDACIÓN + CONTROLADORES + ASYNC WRAPPER */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">3) Validación, controladores y envoltorio async</h3>
        <p className="mt-2">
          Valida entradas antes de tocar la BD. Usa un envoltorio para capturar excepciones
          de funciones <code>async</code> sin repetir <code>try/catch</code>.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">📄 src/utils/asyncHandler.js</h4>
            <pre className="overflow-x-auto text-sm">
{`module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};`}
            </pre>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">📄 src/controllers/items.controller.js</h4>
            <pre className="overflow-x-auto text-sm">
{`const repo = require('../repositories/items.repo');
const ah = require('../utils/asyncHandler');

exports.list = ah(async (req, res) => {
  const { q, page, limit, sort, done } = req.query;
  const result = await repo.list({ q, page, limit, sort, done });
  res.json(result);
});

exports.create = ah(async (req, res) => {
  const { name, done } = req.body;
  if (typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({ errors: ['Nombre inválido (min 3)'] });
  }
  const out = await repo.create({ name, done });
  if (out.errors) return res.status(400).json(out);
  res.status(201).json(out.item);
});`}
            </pre>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold">📄 src/routes/items.js</h4>
          <pre className="overflow-x-auto text-sm">
{`const { Router } = require('express');
const ctrl = require('../controllers/items.controller');
const router = Router();

router.get('/', ctrl.list);
router.post('/', ctrl.create);
// ... put/patch/delete similares

module.exports = router;`}
          </pre>
        </div>

        <p className="text-sm text-secondary/80 mt-2">
          💡 Si queréis reglas robustas, introducid <strong>Joi</strong> o <strong>Zod</strong> en otra práctica.
        </p>
      </section>

      {/* 4) AUTENTICACIÓN (JWT) Y AUTORIZACIÓN (roles) */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">4) Autenticación y autorización (básico)</h3>
        <p className="mt-2">
          Para endpoints protegidos, emite un <strong>JWT</strong> al iniciar sesión y verifica el token en middleware.
          (En el proyecto final, al menos 1 ruta privada).
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <h4 className="font-semibold">📄 src/middlewares/auth.js</h4>
          <pre className="overflow-x-auto text-sm">
{`const jwt = require('jsonwebtoken');
const cfg = require('../config');

exports.auth = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Falta token' });
  try {
    req.user = jwt.verify(token, cfg.jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};`}
          </pre>
        </div>

        <p className="text-sm text-secondary/80 mt-2">
          ⚠️ Esto es un esqueleto didáctico. Para producción, añade expiración, refresco, hashing de contraseñas (bcrypt), etc.
        </p>
      </section>

      {/* 5) TESTS BÁSICOS (supertest) */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">5) Pruebas de endpoints (supertest)</h3>
        <p className="mt-2">
          Antes de desplegar, asegura que tu CRUD responde lo esperado.
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold">📄 test/items.test.js (esqueleto)</h4>
          <pre className="overflow-x-auto text-sm">
{`const request = require('supertest');
const app = require('../src/app'); // exporta tu app sin .listen()

describe('Items API', () => {
  it('GET /api/items -> 200', async () => {
    const res = await request(app).get('/api/items').expect(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});`}
          </pre>
        </div>
        <p className="text-sm text-secondary/80 mt-2">
          💡 Estructura recomendada: exporta <code>app</code> desde <code>src/app.js</code> y arranca en <code>server.js</code>.
        </p>
      </section>

      {/* 6) DOCUMENTACIÓN (OpenAPI) + HEALTHCHECK + VERSIONADO */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">6) Documentación y observabilidad</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>README</strong> con requisitos, .env.example, scripts y endpoints.</li>
          <li><strong>OpenAPI (Swagger)</strong> o colección Postman exportada en <code>/docs</code>.</li>
          <li><strong>Healthcheck</strong> <code>GET /health</code> y <strong>readycheck</strong> <code>/ready</code>.</li>
          <li><strong>Versionado de API</strong>: prefijo <code>/api/v1</code> para cambios futuros.</li>
        </ul>
      </section>

      {/* 7) DESPLIEGUE */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">7) Despliegue: checklist esencial</h3>
        <ol className="list-decimal pl-6 mt-2 space-y-2">
          <li>Revisar <strong>variables de entorno</strong> y no subir <code>.env</code>.</li>
          <li>Configurar <strong>CORS</strong> para el dominio del front.</li>
          <li>Habilitar <strong>helmet</strong>, <strong>rate-limit</strong> y <strong>morgan/pino</strong>.</li>
          <li>Subir código a GitHub y desplegar en tu proveedor (Render/Railway/Vercel/Host que uséis).</li>
          <li>Comprobar <code>/health</code> y endpoints con Postman/Thunder.</li>
        </ol>
      </section>

      {/* 8) PROYECTO FINAL (BRIEF + RÚBRICA) */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">8) Proyecto Final — API pública con seguridad básica</h3>
        <p className="mt-2">
          Construye una API con entidad principal (p. ej., “tareas”, “libros”, “cursos”), con CRUD completo,
          validación, logging y despliegue.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold">🎒 Requisitos mínimos</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Rutas <code>GET/POST/PUT/PATCH/DELETE</code> (coherentes y con estados correctos).</li>
              <li>Validación de entrada (mín. longitud, tipos, etc.).</li>
              <li>Errores centralizados y 404.</li>
              <li>CORS, helmet, rate-limit, morgan.</li>
              <li>Variables en <code>.env</code> + <code>.env.example</code>.</li>
              <li>README con uso + colección Postman o OpenAPI.</li>
              <li>Endpoint <code>/health</code> y prefijo <code>/api/v1</code>.</li>
              <li>Despliegue accesible públicamente.</li>
            </ul>
          </div>
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold">🧪 Bonus (sube nota)</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Autenticación JWT (al menos 1 ruta privada).</li>
              <li>Filtro/búsqueda/paginación en listados.</li>
              <li>Tests con supertest/jest.</li>
              <li>Dockerfile simple o scripts de migración (si ya pasasteis a SQL).</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">📆 Entregables</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-secondary/90">
            <li>Repositorio Git (código + README + <code>.env.example</code> + <code>/docs</code>).</li>
            <li>URL desplegada y colecciones de pruebas.</li>
            <li>Breve vídeo (2–5 min) mostrando endpoints y seguridad.</li>
          </ul>
        </div>
      </section>

      {/* 9) PRÁCTICAS PROGRESIVAS */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">🧪 Prácticas guiadas (paso a paso)</h3>
        <ol className="list-decimal pl-6 mt-2 space-y-2">
          <li>
            Añade <strong>helmet</strong>, <strong>cors</strong> y <strong>rate-limit</strong> a tu API CRUD en memoria/JSON.
          </li>
          <li>
            Crea <code>.env</code>/<code>.env.example</code> y cambia el puerto/secret/CORS desde variables.
          </li>
          <li>
            Implementa un <strong>middleware</strong> que añada <code>X-Request-Id</code> (uuid) y loguee el tiempo de respuesta.
          </li>
          <li>
            Protege <code>POST/PUT/PATCH/DELETE</code> con <strong>JWT</strong> (middleware <code>auth</code>) y deja <code>GET</code> público.
          </li>
          <li>
            Crea un manejador <strong>404</strong> y otro de <strong>errores</strong>. Fuerza un error en una ruta de prueba y verifica el JSON de error.
          </li>
          <li>
            Documenta con OpenAPI o Postman y sube el archivo a <code>/docs</code>.
          </li>
          <li>
            Despliega. Verifica <code>/health</code>, CORS y un endpoint protegido con token.
          </li>
        </ol>
      </section>

      {/* NAVEGACIÓN */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/gestion-persistencia" className="hover:underline text-primary font-medium">
          ← Lección anterior: Gestión de Datos y Persistencia
        </Link>
        <div className="text-accent font-medium">
          ¡Módulo MF0492_3 (Servidor) completado! 🚀
        </div>
      </footer>
    </article>
  );
}
