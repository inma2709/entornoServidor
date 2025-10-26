import React, { useState } from "react";
import { Link } from "react-router-dom";

/** Mini componente Quiz local (auto-contenido para esta lección) */
function MiniQuiz({ question, options, answerIndex, explain }) {
  const [picked, setPicked] = useState(null);
  const done = picked !== null;
  const correct = picked === answerIndex;

  return (
    <div className={`rounded-2xl p-4 shadow border ${done ? (correct ? "bg-accent/30 border-accent" : "bg-warning/20 border-warning") : "bg-white border-light"}`}>
      <p className="font-medium">{question}</p>
      <ul className="mt-3 grid gap-2">
        {options.map((opt, i) => (
          <li key={i}>
            <button
              onClick={() => setPicked(i)}
              disabled={done}
              className="w-full text-left px-3 py-2 rounded-lg border hover:bg-light"
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
      {done && (
        <div className="mt-3 text-sm">
          <p className={`font-semibold ${correct ? "text-green-700" : "text-amber-800"}`}>
            {correct ? "✅ ¡Correcto!" : "❌ No del todo…"}
          </p>
          <p className="mt-1">{explain}</p>
        </div>
      )}
    </div>
  );
}

export default function NodeFundamentals() {
  return (
    <section className="space-y-10">
      {/* Hero */}
      <header className="rounded-2xl p-6 bg-gradient-to-r from-accent to-primary text-white shadow-brand">
        <h1 className="text-2xl md:text-3xl font-semibold">
          🎯 Resumen Visual — Todo lo visto en Node.js
        </h1>
        <p className="mt-2 max-w-3xl">
          De un vistazo: desde configurar package.json hasta crear un servidor completo que conecte con el frontend. 
          Esta es tu hoja de ruta antes de Express.
        </p>
      </header>

      {/* RUTA DE APRENDIZAJE - PASO A PASO */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-2xl font-semibold text-center text-secondary mb-6">
          🗺️ Ruta de Aprendizaje Completada
        </h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          {/* Paso 1 */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">1️⃣</div>
            <h4 className="font-semibold text-green-800">Package.json</h4>
            <p className="text-sm text-green-700 mt-1">Tipo "module" activado</p>
          </div>
          
          {/* Paso 2 */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">2️⃣</div>
            <h4 className="font-semibold text-blue-800">Módulos</h4>
            <p className="text-sm text-blue-700 mt-1">fs y http explorados</p>
          </div>
          
          {/* Paso 3 */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">3️⃣</div>
            <h4 className="font-semibold text-purple-800">Asincronía</h4>
            <p className="text-sm text-purple-700 mt-1">Promesas y async/await</p>
          </div>
          
          {/* Paso 4 */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">4️⃣</div>
            <h4 className="font-semibold text-orange-800">Servidor HTTP</h4>
            <p className="text-sm text-orange-700 mt-1">fetch, CORS, JSON, body</p>
          </div>
        </div>
      </section>

      {/* PASO 1: CONFIGURACIÓN INICIAL */}
      <section className="rounded-2xl p-6 bg-green-50 border-2 border-green-200">
        <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2">
          1️⃣ Configuración Inicial: Package.json
        </h3>
        <p className="mt-2 text-green-700">
          Todo empieza aquí: configurar el proyecto para usar módulos ES6.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">📦 package.json básico</h4>
            <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto"><code>{`{
  "name": "mi-servidor-node",
  "type": "module",
  "scripts": {
    "dev": "node --watch servidor.js",
    "start": "node servidor.js"
  }
}`}</code></pre>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🔑 Puntos clave</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><code>"type": "module"</code> → Activa import/export</li>
              <li><code>--watch</code> → Recarga automática en desarrollo</li>
              <li>Sin "type": "module" → usar require/module.exports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PASO 2: MÓDULOS */}
      <section className="rounded-2xl p-6 bg-blue-50 border-2 border-blue-200">
        <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
          2️⃣ Módulos Explorados: fs y http
        </h3>
        <p className="mt-2 text-blue-700">
          Los dos módulos fundamentales que hemos practicado.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">📁 Módulo fs (File System)</h4>
            <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto"><code>{`import fs from 'node:fs/promises';

// Leer archivo
const contenido = await fs.readFile('archivo.txt', 'utf8');

// Escribir archivo
await fs.writeFile('nuevo.txt', 'Hola mundo');`}</code></pre>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🌐 Módulo http (Servidor)</h4>
            <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto"><code>{`import http from 'node:http';

const servidor = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ mensaje: 'Hola' }));
});

servidor.listen(3000);`}</code></pre>
          </div>
        </div>
      </section>

      {/* PASO 3: ASINCRONÍA */}
      <section className="rounded-2xl p-6 bg-purple-50 border-2 border-purple-200">
        <h3 className="text-xl font-semibold text-purple-800 flex items-center gap-2">
          3️⃣ Asincronía: Promesas y async/await
        </h3>
        <p className="mt-2 text-purple-700">
          El corazón de Node: ejecutar operaciones sin bloquear el servidor.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">⚡ Concepto</h4>
            <p className="text-sm">
              Node no espera a que terminen las operaciones lentas (archivos, red). 
              Sigue ejecutando y responde cuando están listas.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">📝 Promesas</h4>
            <pre className="text-sm bg-gray-50 p-2 rounded overflow-x-auto"><code>{`const promesa = new Promise((resolve, reject) => {
  setTimeout(() => resolve('¡Listo!'), 1000);
});

promesa.then(resultado => console.log(resultado));`}</code></pre>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🎯 async/await</h4>
            <pre className="text-sm bg-gray-50 p-2 rounded overflow-x-auto"><code>{`async function miFuncion() {
  try {
    const resultado = await promesa;
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* PASO 4: SERVIDOR COMPLETO */}
      <section className="rounded-2xl p-6 bg-orange-50 border-2 border-orange-200">
        <h3 className="text-xl font-semibold text-orange-800 flex items-center gap-2">
          4️⃣ Servidor HTTP Completo: La suma de todo
        </h3>
        <p className="mt-2 text-orange-700">
          Ahora sabemos crear un servidor que maneja fetch, CORS, JSON y body parsing.
        </p>

        {/* CORS Universal */}
        <div className="bg-white p-4 rounded-xl shadow mt-4">
          <h4 className="font-semibold mb-2">🌍 CORS Universal (Declaración)</h4>
          <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto"><code>{`// Siempre al inicio del createServer
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

// Manejar preflight OPTIONS
if (req.method === 'OPTIONS') {
  res.writeHead(200);
  return res.end();
}`}</code></pre>
        </div>

        {/* Conversión JSON */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🔄 Conversión de Datos JSON</h4>
            <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto"><code>{`// Objeto → String (enviar al cliente)
const objeto = { nombre: 'Juan', edad: 25 };
const textoJSON = JSON.stringify(objeto);
res.end(textoJSON);

// String → Objeto (recibir del cliente)
const textoRecibido = '{"nombre":"Ana"}';
const objetoParsed = JSON.parse(textoRecibido);`}</code></pre>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">📡 Fetch desde el Frontend</h4>
            <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto"><code>{`// GET
const response = await fetch('http://localhost:3000/api/datos');
const datos = await response.json();

// POST
await fetch('http://localhost:3000/api/enviar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Luis' })
});`}</code></pre>
          </div>
        </div>

        {/* Lectura de Body */}
        <div className="bg-white p-4 rounded-xl shadow mt-4">
          <h4 className="font-semibold mb-2">📥 Lectura de Body con req.on (chunks)</h4>
          <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto"><code>{`// POST endpoint - Leer body manualmente
if (req.method === 'POST' && url.pathname === '/api/datos') {
  let bodyRaw = '';
  
  // Acumular chunks que van llegando
  req.on('data', chunk => {
    bodyRaw += chunk;
  });
  
  // Cuando termina de llegar todo el body
  req.on('end', () => {
    try {
      const datosRecibidos = JSON.parse(bodyRaw);
      // Procesar datosRecibidos...
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, recibido: datosRecibidos }));
    } catch (error) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'JSON inválido' }));
    }
  });
  return; // ¡Importante! No ejecutar el resto del código
}`}</code></pre>
        </div>
      </section>

      {/* EJERCICIO INTEGRADOR FRONT + BACK */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-brand">
        <h3 className="text-2xl font-semibold text-center mb-4">
          🚀 EJERCICIO FINAL: Lista de Tareas (Front + Back)
        </h3>
        <p className="text-center mb-6">
          Pon en práctica TODO lo aprendido creando una aplicación completa que conecte frontend y backend.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* BACKEND */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h4 className="font-semibold text-lg mb-3">📡 BACKEND (Node.js puro)</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-white/20 p-3 rounded">
                <strong>1. Configuración:</strong>
                <ul className="list-disc pl-4 mt-1">
                  <li>package.json con "type": "module"</li>
                  <li>Script "dev": "node --watch servidor.js"</li>
                </ul>
              </div>
              
              <div className="bg-white/20 p-3 rounded">
                <strong>2. Rutas a implementar:</strong>
                <ul className="list-disc pl-4 mt-1">
                  <li><code>GET /api/tareas</code> → Lista todas las tareas</li>
                  <li><code>POST /api/tareas</code> → Añade nueva tarea</li>
                  <li><code>PUT /api/tareas/:id</code> → Marca tarea como completada</li>
                  <li><code>DELETE /api/tareas/:id</code> → Elimina tarea</li>
                </ul>
              </div>
              
              <div className="bg-white/20 p-3 rounded">
                <strong>3. Usar:</strong> CORS, JSON.parse/stringify, req.on para body, async/await
              </div>
            </div>
          </div>

          {/* FRONTEND */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h4 className="font-semibold text-lg mb-3">🌐 FRONTEND (HTML + JS)</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-white/20 p-3 rounded">
                <strong>1. Interface:</strong>
                <ul className="list-disc pl-4 mt-1">
                  <li>Input para escribir nueva tarea</li>
                  <li>Botón "Añadir tarea"</li>
                  <li>Lista de tareas con checkboxes</li>
                  <li>Botón "Eliminar" por tarea</li>
                </ul>
              </div>
              
              <div className="bg-white/20 p-3 rounded">
                <strong>2. Funcionalidades con fetch:</strong>
                <ul className="list-disc pl-4 mt-1">
                  <li>Cargar tareas al inicio</li>
                  <li>Añadir nueva tarea (POST)</li>
                  <li>Marcar completada (PUT)</li>
                  <li>Eliminar tarea (DELETE)</li>
                </ul>
              </div>
              
              <div className="bg-white/20 p-3 rounded">
                <strong>3. Usar:</strong> fetch con GET/POST/PUT/DELETE, async/await, JSON
              </div>
            </div>
          </div>
        </div>

        {/* Código de inicio */}
        <div className="mt-6 bg-black/30 p-4 rounded-xl">
          <h4 className="font-semibold mb-2">💡 Código de inicio (servidor.js):</h4>
          <pre className="text-sm overflow-x-auto"><code>{`import http from 'node:http';
import { URL } from 'node:url';

// Array en memoria para simular BD
let tareas = [
  { id: 1, texto: 'Aprender Node.js', completada: false },
  { id: 2, texto: 'Crear servidor HTTP', completada: true }
];

let siguienteId = 3;

const servidor = http.createServer(async (req, res) => {
  // CORS universal
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  res.setHeader('Content-Type', 'application/json');

  // ¡AQUÍ IMPLEMENTAS LAS RUTAS!
  
});

servidor.listen(3000, () => console.log('🚀 Servidor en http://localhost:3000'));`}</code></pre>
        </div>

        <div className="mt-4 bg-yellow-500/20 border border-yellow-300 rounded-xl p-4">
          <h4 className="font-semibold">🏆 Criterios de éxito:</h4>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>El servidor arranca sin errores y responde a las 4 rutas</li>
            <li>El frontend puede añadir, listar, completar y eliminar tareas</li>
            <li>Se usa CORS correctamente (no hay errores en consola)</li>
            <li>Los datos se envían y reciben en formato JSON</li>
            <li>Uso de async/await para todas las operaciones fetch</li>
          </ul>
        </div>
      </section>

      {/* QUIZZES DE REPASO */}
      <section className="grid md:grid-cols-2 gap-6">
        <MiniQuiz
          question="¿Qué activa los módulos ES6 en Node.js?"
          options={[
            "Instalar una dependencia",
            'Añadir "type": "module" en package.json',
            "Usar archivos .js",
            "Node lo detecta automáticamente"
          ]}
          answerIndex={1}
          explain='Con "type": "module" en package.json puedes usar import/export en lugar de require/module.exports.'
        />
        
        <MiniQuiz
          question="Para leer el body en un POST, ¿qué eventos usas?"
          options={[
            "res.on('data') y res.on('end')",
            "req.on('data') y req.on('end')",
            "request.on('body')",
            "Solo req.on('end')"
          ]}
          answerIndex={1}
          explain="El body llega por chunks en req.on('data'), y cuando termina se dispara req.on('end')."
        />

        <MiniQuiz
          question="¿Qué hace JSON.stringify()?"
          options={[
            "Convierte texto JSON a objeto",
            "Convierte objeto a texto JSON",
            "Valida si un JSON es correcto",
            "Formatea un JSON bonito"
          ]}
          answerIndex={1}
          explain="JSON.stringify() convierte un objeto JavaScript en una cadena de texto JSON para enviar por la red."
        />

        <MiniQuiz
          question="¿Cuál es el header CORS mínimo para permitir peticiones?"
          options={[
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Methods", 
            "Access-Control-Allow-Origin",
            "Content-Type"
          ]}
          answerIndex={2}
          explain="Access-Control-Allow-Origin es el header fundamental para permitir que otros dominios accedan a tu API."
        />
      </section>

      {/* RESUMEN FINAL */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-center text-secondary mb-4">
          ✅ Checklist Final: ¿Lo dominas todo?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-3">🎯 Conceptos Fundamentales</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-green-500 rounded"></span>
                Entiendo qué es Node.js y su modelo asíncrono
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-green-500 rounded"></span>
                Sé configurar package.json para módulos ES6
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-green-500 rounded"></span>
                Uso import/export correctamente
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-green-500 rounded"></span>
                Manejo async/await y promesas
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">🌐 Servidor HTTP</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-blue-500 rounded"></span>
                Creo servidores HTTP con rutas GET/POST/PUT/DELETE
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-blue-500 rounded"></span>
                Leo el body con req.on('data') y req.on('end')
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-blue-500 rounded"></span>
                Configuro CORS para permitir peticiones
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-blue-500 rounded"></span>
                Uso JSON.parse() y JSON.stringify() correctamente
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-blue-500 rounded"></span>
                Consumo APIs con fetch desde el frontend
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <p className="text-center font-medium text-primary">
            🏁 <strong>¡Felicidades!</strong> Ya dominas los fundamentos de Node.js. 
            Estás listo para Express, donde todo esto se simplifica enormemente.
          </p>
        </div>
      </section>

      {/* NAVEGACIÓN Y SIGUIENTE PASO */}
      <div className="text-center">
        <div className="mb-4">
          <Link
            to="/mf0492/uf1844/express"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-2xl shadow-brand hover:opacity-90 font-semibold"
          >
            🚀 ¡Ahora sí! Express Framework →
          </Link>
        </div>
        
        <p className="text-sm text-secondary/70">
          Lo que hemos visto en Node puro, Express lo hace en 3 líneas de código.
        </p>
      </div>

      {/* Navegación inferior */}
      <footer className="flex justify-between text-sm text-secondary/80 pt-6 border-t border-light">
        <Link to="/mf0492/uf1844/asincronia" className="hover:underline text-primary font-medium">
          ← Lección anterior: Programación Asíncrona
        </Link>
        <Link to="/mf0492/uf1844/express" className="hover:underline text-primary font-medium">
          Siguiente: Express Framework →
        </Link>
      </footer>
    </section>
  );
}
