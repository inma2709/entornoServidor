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

       {/* PASO 1: SERVIDOR EXPRESS BÁSICO */}
<section className="rounded-2xl p-6 bg-white border border-light shadow">
  <h3 className="text-xl font-semibold text-primary">1) Servidor Express básico (ES Modules)</h3>
  <p className="mt-2">
    En este primer paso configuramos un pequeño servidor con <code>Express</code> usando la sintaxis moderna <strong>import/export</strong>.
    Creamos un conjunto de rutas sencillas y una estructura CRUD básica para practicar.
  </p>

  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl mt-3 text-sm text-blue-900">
    <strong>💡 Recuerda:</strong> Para usar <code>import</code> necesitas añadir en tu <code>package.json</code>:
    <pre className="bg-white p-2 mt-2 rounded-lg text-xs overflow-x-auto">
{`"type": "module"`}
    </pre>
  </div>

  <div className="bg-white p-4 rounded-xl shadow mt-4">
    <h4 className="font-semibold mb-2">📄 server.js (ES Modules)</h4>
    <pre className="overflow-x-auto text-sm">
{`// (1) Cargar Express y crear la app
import express from "express";
const app = express();
const PORT = 3000;

// (2) Datos "en memoria" (mock)
let items = [
  { id: 1, name: "Comprar leche", done: false },
  { id: 2, name: "Estudiar Express", done: true },
];
let nextId = 3;

// (3) Middleware: leer JSON del body
app.use(express.json());

// (4) Ruta de salud: saber si la API está viva
app.get("/api/status", (_req, res) => {
  res.json({ ok: true, count: items.length });
});

// (5) READ: listar todos los ítems
app.get("/api/items", (req, res) => {
  res.json({ total: items.length, data: items });
});

// (6) READ: detalle por ID
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Ítem no encontrado" });
  res.json(item);
});

// (7) CREATE: crear nuevo ítem
app.post("/api/items", (req, res) => {
  const { name, done = false } = req.body;
  if (typeof name !== "string" || name.trim().length < 3) {
    return res.status(400).json({ error: "El campo 'name' es obligatorio" });
  }
  const newItem = { id: nextId++, name: name.trim(), done: Boolean(done) };
  items.push(newItem);
  res.status(201).json(newItem);
});

// (8) DELETE: borrar por id
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter(i => i.id !== id);
  if (items.length === before) {
    return res.status(404).json({ error: "Ítem no encontrado para borrar" });
  }
  res.status(204).send();
});

// (9) 404: rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada ❌" });
});

// (10) Manejador global de errores
app.use((err, req, res, _next) => {
  console.error("💥 Error:", err);
  res.status(500).json({ error: err.message || "Error interno del servidor" });
});

// (11) Iniciar servidor
app.listen(PORT, () => {
  console.log("✅ Servidor escuchando en http://localhost:" + PORT);
});`}
    </pre>
  </div>

  {/* Cuadro explicativo */}
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl mt-4 text-sm text-yellow-900">
    <h4 className="font-semibold mb-2">🧠 Explicación paso a paso:</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong>(1)</strong> Importamos Express y creamos la aplicación con <code>express()</code>.</li>
      <li><strong>(2)</strong> Definimos datos “en memoria” para simular una base de datos.</li>
      <li><strong>(3)</strong> Activamos el middleware <code>express.json()</code> para poder leer el cuerpo de las peticiones.</li>
      <li><strong>(4)</strong> Creamos una ruta de salud que devuelve el número de elementos.</li>
      <li><strong>(5)-(6)</strong> Implementamos rutas <code>GET</code> para listar y consultar ítems.</li>
      <li><strong>(7)</strong> Creamos una ruta <code>POST</code> para añadir un nuevo ítem con validación básica.</li>
      <li><strong>(8)</strong> Definimos <code>DELETE</code> para eliminar ítems por su <code>id</code>.</li>
      <li><strong>(9)</strong> Añadimos una respuesta 404 por si la ruta no existe.</li>
      <li><strong>(10)</strong> Creamos un manejador de errores que captura fallos globales.</li>
      <li><strong>(11)</strong> Finalmente, iniciamos el servidor en el puerto 3000.</li>
    </ul>
  </div>
</section>

{/* PASO 2: PRUEBAS Y OBSERVACIONES */}
<section className="rounded-2xl p-6 bg-light border border-light mt-6 shadow">
  <h3 className="text-xl font-semibold text-secondary">2) Prueba tu servidor</h3>
  <p className="mt-2">
    Abre la terminal y ejecuta <code>npm run start</code> (o <code>npm run dev</code> si usas nodemon).
    Luego prueba las rutas desde el navegador o con herramientas como <strong>Postman</strong> o <strong>curl</strong>.
  </p>

  <div className="bg-light p-4 rounded-xl mt-3">
    <h4 className="font-semibold text-accent">🔍 Ejemplos de prueba:</h4>
    <ul className="list-disc pl-6 mt-2 space-y-1 text-secondary/90">
      <li><code>GET http://localhost:3000/api/status</code> → comprueba si la API responde.</li>
      <li><code>GET http://localhost:3000/api/items</code> → lista todos los ítems.</li>
      <li><code>POST http://localhost:3000/api/items</code> con cuerpo JSON <code>{"{ 'name': 'Nueva tarea' }"}</code>.</li>
      <li><code>DELETE http://localhost:3000/api/items/1</code> → elimina el ítem con id 1.</li>
    </ul>
  </div>

  <div className="bg-green-50 border-l-4 border-green-500 text-green-900 text-sm p-4 rounded-xl mt-4">
    <strong>✅ Conclusión:</strong> Ya tienes un servidor Express totalmente funcional.
    En las siguientes secciones podrás añadir validaciones, paginación y modularizar las rutas.
  </div>
</section>

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
