import { Link } from "react-router-dom";

export default function ServidorNode() {
  return (
    <section className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary">
          6. Servidores Web con Node.js 🌐
        </h2>
        <p className="text-secondary/70 mt-3 max-w-2xl mx-auto">
          Pasamos de ejecutar pequeños scripts locales a crear un servidor que
          escucha peticiones HTTP reales y devuelve respuestas dinámicas.  
          Este es el primer paso para entender cómo funciona Express.
        </p>
      </header>

      {/* BLOQUE INTRODUCTORIO */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">
          🚀 ¿Qué es un servidor?
        </h3>
        <p className="mt-2">
          Un <strong>servidor</strong> es un programa que está “escuchando” un
          puerto (por ejemplo el 3000) y responde a las peticiones de los
          clientes (navegador, Postman, o tu aplicación React).
        </p>

        <div className="bg-light mt-3 p-4 rounded-xl border border-light">
          <p className="text-sm">
            🧩 En Node.js podemos crear servidores usando el módulo nativo{" "}
            <code>http</code>.  
            Esto nos permite gestionar peticiones (request) y respuestas
            (response) sin instalar nada extra.
          </p>
        </div>
      </section>

      {/* PASO 1: CREAR SERVIDOR BÁSICO */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">
          1️⃣ Crear un servidor básico
        </h3>
        <p className="mt-2">
          Creamos un fichero <code>servidor.js</code> que utilice el módulo{" "}
          <code>http</code> y escuche en el puerto 3000.
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <pre className="overflow-x-auto text-sm">
{`// servidor.js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.end('Servidor Node activo 🚀');
});

server.listen(3000, () => {
  console.log('✅ Servidor escuchando en http://localhost:3000');
});`}
          </pre>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">Comprueba</h4>
          <ol className="list-decimal pl-6 text-secondary/90 space-y-1 mt-2">
            <li>Guarda el archivo como <code>servidor.js</code></li>
            <li>Abre la terminal y ejecuta <code>node servidor.js</code></li>
            <li>Visita <code>http://localhost:3000</code> → deberías ver el mensaje ✅</li>
          </ol>
        </div>
      </section>

      {/* PASO 2: ENRUTAMIENTO MANUAL */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">
          2️⃣ Enrutamiento manual
        </h3>
        <p className="mt-2">
          Podemos detectar la ruta que el usuario solicita con{" "}
          <code>req.url</code> y responder diferente.  
          Esto se llama <strong>enrutamiento</strong>.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <pre className="overflow-x-auto text-sm">
{`// rutas.js
const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Inicio 🏠');
  } else if (req.url === '/contacto') {
    res.end('Contacto 📞');
  } else if (req.url === '/about') {
    res.end('Sobre nosotros 🧑‍💻');
  } else {
    res.writeHead(404);
    res.end('Ruta no encontrada ❌');
  }
});

server.listen(3000, () => {
  console.log('🛣️ Servidor con rutas en http://localhost:3000');
});`}
          </pre>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">💡 Mini práctica</h4>
          <p className="mt-2">
            Añade una ruta <code>/api/hora</code> que devuelva la hora actual.
          </p>
          <pre className="bg-white rounded-xl mt-2 p-3 text-sm overflow-auto">
{`else if (req.url === '/api/hora') {
  const hora = new Date().toLocaleTimeString();
  res.end(\`⏰ Hora actual: \${hora}\`);
}`}
          </pre>
        </div>
      </section>

      {/* PASO 3: HEADERS Y STATUS CODES */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">
          3️⃣ Cabeceras y códigos de estado
        </h3>
        <p className="mt-2">
          Los <strong>headers</strong> definen el tipo de respuesta
          (texto, JSON, HTML).  
          Los <strong>status codes</strong> indican el resultado: 200 (OK),
          404 (no encontrado), 500 (error del servidor)...
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <pre className="overflow-x-auto text-sm">
{`// headers.js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.url === '/api/saludo') {
    res.writeHead(200);
    res.end(JSON.stringify({ mensaje: 'Hola desde Node 👋' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Ruta no encontrada ❌' }));
  }
});

server.listen(3000, () => {
  console.log('📡 Servidor con headers en http://localhost:3000');
});`}
          </pre>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">💡 Mini práctica</h4>
          <p className="mt-2">
            Crea la ruta <code>/api/usuario</code> que devuelva un JSON con nombre y rol:
          </p>
          <pre className="bg-white rounded-xl mt-2 p-3 text-sm overflow-auto">
{`else if (req.url === '/api/usuario') {
  res.writeHead(200);
  res.end(JSON.stringify({ nombre: 'Luis', rol: 'Cocinero' }));
}`}
          </pre>
        </div>
      </section>

      {/* PASO 4: STREAMING Y ERRORES */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">
          4️⃣ Streaming y gestión de errores
        </h3>
        <p className="mt-2">
          Node puede enviar partes de una respuesta de manera progresiva (streaming).
          Esto es útil para grandes volúmenes de datos o mensajes en tiempo real.
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <pre className="overflow-x-auto text-sm">
{`// stream.js
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  try {
    if (req.url === '/stream') {
      res.write('Parte 1...\n');
      setTimeout(() => res.write('Parte 2...\n'), 1000);
      setTimeout(() => res.end('Fin del stream ✅'), 2000);
    } else {
      res.writeHead(404);
      res.end('Ruta no encontrada ❌');
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end('Error interno del servidor 🚨');
  }
});

server.listen(3000, () => {
  console.log('📶 Streaming activo en http://localhost:3000/stream');
});`}
          </pre>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">💡 Mini práctica</h4>
          <p className="mt-2">
            Crea un endpoint <code>/api/datos</code> que envíe tres partes de texto
            con un retardo de 1 segundo entre cada una.
          </p>
        </div>
      </section>

      {/* RESUMEN FINAL */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">📘 Hoy has aprendido</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Qué es un servidor y qué papel cumple en una aplicación web.</li>
          <li>Cómo crear un servidor básico en Node.js con el módulo <code>http</code>.</li>
          <li>Cómo enrutar peticiones manualmente según la URL.</li>
          <li>Qué son los <strong>headers</strong> y <strong>status codes</strong>.</li>
          <li>Cómo enviar contenido por partes (streaming).</li>
          <li>Cómo capturar errores y evitar caídas del servidor.</li>
        </ul>
      </section>

      {/* EJERCICIO DE APLICACIÓN */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">
          🧩 Ejercicio de aplicación (Checkpoint)
        </h3>
        <p className="mt-2">
          Crea un servidor que responda a tres rutas:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            <code>/</code> → Devuelve <em>"Bienvenido al servidor de Node.js 🚀"</em>
          </li>
          <li>
            <code>/api/fecha</code> → Devuelve la fecha actual en formato JSON.
          </li>
          <li>
            <code>/api/random</code> → Devuelve un número aleatorio del 1 al 100.
          </li>
        </ul>
        
      </section>

      {/* CTA FINAL */}
      <div className="text-center">
        <Link
          to="/mf0492/uf1844"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl shadow-brand hover:opacity-90"
        >
          Siguiente: Introducción a Express →
        </Link>
      </div>
    </section>
  );
}
