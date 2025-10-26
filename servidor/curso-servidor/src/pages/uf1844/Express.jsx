import React from "react";
import { Link } from "react-router-dom";

export default function IntroduccionExpress() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary">
          5. ¡Bienvenido a Express! (Simplificando el back)
        </h2>
        <p className="text-secondary/70 mt-3 max-w-3xl mx-auto">
          De la API a mano con <code>node:http</code> a la velocidad y organización que ofrece Express.
          Si Node fue el motor, Express será el <strong>chasis y el volante</strong>.
        </p>
      </header>

      {/* OBJETIVO */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🎯 Objetivo de la sesión</h3>
        <p className="mt-2">
          Comprender por qué usamos Express en lugar del módulo nativo de Node.js, instalarlo con npm
          y crear nuestro primer servidor Express minimalista con rutas, JSON y middleware básico.
        </p>
      </section>

      {/* 1) ¿POR QUÉ EXPRESS? */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">1) ¿Por qué abandonar <code>node:http</code>?</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🔙 Node nativo (nuestro trabajo anterior)</h4>
            <p className="text-secondary/90 mb-2">
              Para crear rutas <code>/api/saludo</code> y <code>/api/hora</code> hacíamos:
            </p>
            <pre className="overflow-x-auto text-sm bg-gray-50 p-2 rounded">
{`if (req.url === '/api/saludo' && req.method === 'GET') { ... }`}
            </pre>
            <p className="text-secondary/90 mt-2">
              Por cada ruta nueva, un <code>if / else if</code>, gestionar cabeceras y errores… con 50 rutas
              sería poco mantenible.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🚀 Express: el “organizador” de tráfico</h4>
            <p className="text-secondary/90">
              Express es un framework minimalista que se apoya en Node y simplifica rutas, respuestas, JSON,
              errores y middleware.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-secondary/90 mt-2">
              <li>Rutas legibles: <code>app.get('/ruta', handler)</code>.</li>
              <li><code>res.json()</code> y <code>res.send()</code> sin cabeceras manuales.</li>
              <li>Middleware para logs, validación y seguridad.</li>
              <li>Estructuras más ordenadas y escalables.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2) INSTALACIÓN CON NPM (+ NODEMON) */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">2) Instalación con npm (y recarga con nodemon)</h3>
        <p className="mt-2">
          Asegúrate de tener un <code>package.json</code>. Instala Express y añade nodemon para recargar.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold mb-2">Comandos</h4>
            <pre className="overflow-x-auto text-sm bg-white p-2 rounded border">
{`npm init -y
npm install express
npm install -D nodemon`}
            </pre>
          </div>
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold mb-2"><code>package.json</code> (script de dev)</h4>
            <pre className="overflow-x-auto text-sm bg-white p-2 rounded border">
{`{
  "name": "mi-express",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": { "express": "^4.19.0" },
  "devDependencies": { "nodemon": "^3.0.0" }
}`}
            </pre>
          </div>
        </div>

        <p className="text-sm text-secondary/80 mt-2">
          💡 Si quieres usar ESM (<code>import</code>/<code>export</code>), añade <code>"type":"module"</code> y cambia los <code>require</code>
          por <code>import</code>.
        </p>
      </section>

      {/* 4) COMPARATIVA NODE vs EXPRESS */}
<section className="rounded-2xl p-6 bg-light border border-light mt-6">
  <h3 className="text-xl font-semibold text-secondary">3) Comparativa: servidor con Node puro vs Express</h3>
  <p className="mt-2">
    Observa cómo Express simplifica la creación de un servidor web en comparación con <code>node:http</code>:
  </p>

  <div className="grid md:grid-cols-2 gap-4 mt-4">
    {/* Columna izquierda: Node puro */}
    <div className="bg-white p-4 rounded-xl shadow">
      <h4 className="font-semibold mb-2">🧠 Con Node.js puro</h4>
      <pre className="overflow-x-auto text-sm">
{`import http from "node:http";

// Crear servidor manualmente
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("👋 Hola desde Node.js");
});

// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log("✅ Servidor Node en http://localhost:3000");
});`}
      </pre>
    </div>

    {/* Columna derecha: Express */}
    <div className="bg-white p-4 rounded-xl shadow">
      <h4 className="font-semibold mb-2">⚡ Con Express.js</h4>
      <pre className="overflow-x-auto text-sm">
{`const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('👋 Hola desde Express');
});

app.listen(PORT, () => {
  console.log(\`✅ Servidor Express en http://localhost:\${PORT}\`);
});`}
      </pre>
    </div>
  </div>

  <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
    <h4 className="font-semibold text-accent">🔍 Diferencias clave</h4>
    <ul className="list-disc pl-6 space-y-1 mt-2">
      <li>Express se basa en Node, pero evita escribir cabeceras y rutas manualmente.</li>
      <li>Usa métodos como <code>app.get()</code> y <code>res.send()</code> en lugar de <code>createServer()</code>.</li>
      <li>El código es más corto, legible y escalable.</li>
    </ul>
  </div>

  <div className="friendly-box mt-4">
    💡 <strong>Recuerda:</strong> Express no sustituye a Node, lo usa por debajo.
    Es como pasar de construir un motor pieza a pieza a conducir un coche listo para usar.
  </div>
</section>


      {/* 4) SERVIDOR EXPRESS MÍNIMO */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">4) Servidor Express mínimo</h3>
        <p className="mt-2">
          Comparado con <code>node:http</code>, Express es más directo y legible:
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold mb-2">📄 <code>server.js</code> (CommonJS)</h4>
          <pre className="overflow-x-auto text-sm">
{`const express = require('express');
const app = express();
const PORT = 3000;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola Express desde la raíz 👋');
});

// Respuesta JSON
app.get('/api/status', (req, res) => {
  res.json({ ok: true, message: 'Servidor Express funcionando OK' });
});

app.listen(PORT, () => {
  console.log(\`✅ Servidor Express en http://localhost:\${PORT}\`);
});`}
          </pre>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">Comprueba</h4>
          <ol className="list-decimal pl-6 space-y-1 mt-2">
            <li>Guarda como <code>server.js</code>.</li>
            <li>Ejecuta <code>npm run dev</code>.</li>
            <li>Abre <code>http://localhost:3000</code> y <code>/api/status</code>.</li>
          </ol>
        </div>
      </section>

      {/* 4) RUTAS MÚLTIPLES, JSON Y QUERY PARAMS 
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">4) Rutas múltiples, JSON y query params</h3>
        <p className="mt-2">
          Define múltiples rutas y usa los <strong>query params</strong> de la URL con <code>req.query</code>.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <pre className="overflow-x-auto text-sm">
{`// rutas.js (o dentro de server.js)
const express = require('express');
const app = express();

// 1) Texto/HTML
app.get('/', (req, res) => {
  res.send('Inicio 🏠');
});

// 2) JSON directo
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde Express 👋' });
});

// 3) JSON con estado
app.get('/api/usuario', (req, res) => {
  res.status(200).json({ nombre: 'Inma', rol: 'Docente' });
});

// 4) Query params: /api/suma?x=3&y=5
app.get('/api/suma', (req, res) => {
  const x = Number(req.query.x);
  const y = Number(req.query.y);
  if (Number.isNaN(x) || Number.isNaN(y)) {
    return res.status(400).json({ error: 'Parámetros inválidos: use ?x=numero&y=numero' });
  }
  res.json({ resultado: x + y });
});

// 404: al final
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada ❌' });
});

app.listen(3000, () => console.log('📡 Rutas en http://localhost:3000'));`}
          </pre>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">💡 Mini práctica</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Crea <code>/api/fecha</code> que devuelva <code>{`{ fechaISO: '...' }`}</code>.</li>
            <li>Añade <code>/api/hora</code> con la hora local.</li>
          </ul>
        </div>
      </section>

      {/* 5) MIDDLEWARE: JSON, LOGGER Y ERRORES */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">5) Middleware: JSON, logger y errores</h3>
        <p className="mt-2">
          Un <strong>middleware</strong> es una función que se ejecuta entre la petición y la respuesta.
          Se registran en orden con <code>app.use()</code>.
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <pre className="overflow-x-auto text-sm">
{`const express = require('express');
const app = express();

// a) Parseo de JSON del body (para POST/PUT)
app.use(express.json());

// b) Logger sencillo (cada petición)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(\`📥 \${req.method} \${req.url} → \${res.statusCode} (\${ms}ms)\`);
  });
  next();
});

// Ejemplo POST (usa Thunder Client o Postman)
app.post('/api/eco', (req, res) => {
  // req.body ya está disponible gracias a express.json()
  res.status(201).json({ recibido: req.body });
});

// c) Manejador de errores (último)
app.use((err, req, res, next) => {
  console.error('💥 Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => console.log('🧩 Middleware en http://localhost:3000'));`}
          </pre>
        </div>

        <p className="mt-3 text-sm text-secondary/80">
          🔍 Importante: el manejador de errores tiene 4 parámetros <code>(err, req, res, next)</code> y debe ir al final.
        </p>
      </section>

      {/* 6) COMPARATIVA BREVE */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">📊 Node vs Express (resumen)</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Node:</strong> control total, pero mucho “cableado”.</li>
            <li>Gestionas URLs, cabeceras y errores a mano.</li>
            <li>Genial para aprender base y comprender HTTP.</li>
          </ul>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Express:</strong> productivo, limpio y extensible.</li>
            <li>Rutas declarativas, <code>res.json()</code>, middleware, 404 y errores.</li>
            <li>Preferido en la mayoría de proyectos Node.</li>
          </ul>
        </div>
      </section>

      {/* 7) EJERCICIO DE APLICACIÓN 
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🧩 Ejercicio: Mi primera mini-API Express</h3>
        <ol className="list-decimal pl-6 mt-3 space-y-2">
          <li>Crea <code>server.js</code> con Express y script <code>dev</code> en <code>package.json</code>.</li>
          <li>Implementa:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li><code>/</code> → texto de bienvenida.</li>
              <li><code>/api/suma?x=3&y=5</code> → JSON con el resultado (valida entradas).</li>
              <li><code>/api/info</code> → JSON con <code>process.platform</code> y versión de Node.</li>
              <li><code>POST /api/eco</code> → devuelve <code>req.body</code> (usa <code>express.json()</code>).</li>
            </ul>
          </li>
          <li>Añade un logger (middleware) y un manejador 404.</li>
          <li>Bonus ⭐: crea un middleware de error y prueba a lanzar <code>next(new Error('fail'))</code> en una ruta.</li>
        </ol>
      </section>

      {/* RESUMEN Y NAV */}
      <section className="rounded-2xl p-6 bg-white border border-light shadow">
        <h3 className="text-xl font-semibold text-secondary">📌 En esta lección ya sabes:</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Qué problemas te ahorra Express frente a <code>node:http</code>.</li>
          <li>Instalar y arrancar un servidor Express con <code>nodemon</code>.</li>
          <li>Definir rutas GET/POST y  enviar JSON .</li>
          <li>Registrar <strong>middleware</strong></li>
        </ul>
      </section>

      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/servidor-node" className="hover:underline text-primary font-medium">
          ← Lección anterior: Servidores con Node (nativo)
        </Link>
        <Link to="/mf0492/uf1844/crud-express" className="hover:underline text-primary font-medium">
          Siguiente: CRUD básico con Express (en memoria) →
        </Link>
      </footer>
    </article>
  );
}
