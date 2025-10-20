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
          6. Resumen — Fundamentos de Node.js (Checkpoint)
        </h1>
        <p className="mt-2 max-w-3xl">
          Parada técnica para consolidar lo esencial de Node.js antes de seguir con Express y BD.
          Si dominas esta lección, estás listo/a para construir APIs fiables.
        </p>
      </header>

      {/* Objetivos */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="friendly-box">
          <h3 className="font-semibold">Objetivos</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Entender qué es Node.js y su modelo de ejecución.</li>
            <li>Usar npm y scripts para automatizar tareas.</li>
            <li>Trabajar con módulos (ESM/CommonJS) y módulos nativos.</li>
            <li>Manejar asincronía con callbacks, Promesas y <code>async/await</code>.</li>
          </ul>
        </div>
        <div className="bg-white border-l-4 border-primary p-4 rounded-2xl shadow">
          <h3 className="font-semibold text-primary">Qué te llevas</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Plantilla mínima de proyecto Node.</li>
            <li>Scripts útiles: <code>dev</code>, <code>start</code>, <code>test</code>.</li>
            <li>Buenas prácticas de ESM y variables de entorno.</li>
          </ul>
        </div>
        <div className="bg-secondary text-white p-4 rounded-2xl shadow-brand">
          <h3 className="font-semibold">Checklist mental</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>¿Qué es el event loop?</li>
            <li>¿Bloqueante vs no bloqueante?</li>
            <li>¿Cuándo <code>require()</code> y cuándo <code>import</code>?</li>
          </ul>
        </div>
      </section>

      {/* Mapa rápido */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold">Mapa rápido de Node.js</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Conceptos base</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Runtime JS</strong> sobre V8 (sin DOM, con APIs de sistema).</li>
              <li><strong>Event Loop</strong>: gestiona tareas asíncronas (I/O, timers, red…).</li>
              <li><strong>Single-thread</strong> con librerías I/O no bloqueantes.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Estructura mínima</h4>
            <pre className="mt-2 p-3 bg-light rounded-xl overflow-auto text-sm">
{`my-app/
  ├─ package.json
  ├─ .gitignore
  └─ index.js`}
            </pre>
          </div>
        </div>
      </section>

      {/* npm & scripts */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold">npm y scripts esenciales</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <div>
            <h4 className="font-medium">Comandos clave</h4>
            <pre className="mt-2 p-3 bg-light rounded-xl overflow-auto text-sm">
{`npm init -y           # crear package.json
npm i <paquete>        # instalar dependencia
npm i -D <paquete>     # dependencia de desarrollo
npm run dev            # ejecutar script "dev"
npm run test           # ejecutar tests
node index.js          # ejecutar un fichero
node --watch index.js  # recarga automática (v18+)`}
            </pre>
          </div>
          <div>
            <h4 className="font-medium"><code>package.json</code> de ejemplo (ESM)</h4>
            <pre className="mt-2 p-3 bg-light rounded-xl overflow-auto text-sm">
{`{
  "name": "node-checkpoint",
  "type": "module",
  "scripts": {
    "dev": "node --watch index.js",
    "start": "node index.js",
    "test": "node test.js"
  }
}`}
            </pre>
            <p className="text-sm mt-2">
              <strong>"type": "module"</strong> activa módulos ESM (<code>import/export</code>). 
              Si lo quitas, usarás CommonJS (<code>require/module.exports</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Módulos nativos y ESM */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold">Módulos nativos & ESM vs CommonJS</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <div>
            <h4 className="font-medium">Módulos nativos útiles</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><code>fs</code> (archivos), <code>path</code> (rutas), <code>os</code> (sistema).</li>
              <li><code>url</code> (URLs), <code>crypto</code> (hash/uuid), <code>readline</code> (CLI).</li>
              <li><code>process</code> (env, argv, cwd), <code>events</code> (event emitter).</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Importar (ESM) y requerir (CJS)</h4>
            <pre className="mt-2 p-3 bg-light rounded-xl overflow-auto text-sm">
{`// ESM (package.json -> "type":"module")
import fs from "node:fs/promises";
const txt = await fs.readFile("README.md", "utf8");

// CommonJS (sin "type":"module")
const fs2 = require("node:fs");
const txt2 = fs2.readFileSync("README.md", "utf8");`}
            </pre>
          </div>
        </div>
      </section>

      {/* Asincronía */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold">Asincronía en Node</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-3">
          <div>
            <h4 className="font-medium">Callbacks → Promesas → async/await</h4>
            <pre className="mt-2 p-3 bg-light rounded-xl overflow-auto text-sm">
{`// Promesa
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// async/await + try/catch
async function main(){
  try {
    await sleep(500);
    console.log("Hecho");
  } catch (e) {
    console.error(e);
  }
}
main();`}
            </pre>
          </div>
          <div>
            <h4 className="font-medium">Bloqueante vs no bloqueante</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Sync</strong>: detiene el hilo (p.ej., <code>readFileSync</code>).</li>
              <li><strong>Async</strong>: libera el hilo, continúa cuando termina I/O.</li>
              <li>En servidores, prioriza operaciones <strong>no bloqueantes</strong>.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Event Loop (foto mental)</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Cola de microtareas (promesas) y macrotareas (timers, I/O).</li>
              <li>Node delega I/O al sistema y reacciona cuando hay resultado.</li>
              <li>Evita bucles pesados en el hilo principal.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Checkpoint Quiz */}
      <section className="grid md:grid-cols-2 gap-6">
        <MiniQuiz
          question="¿Qué activa los módulos ESM (import/export) en Node?"
          options={[
            "Usar archivos .mjs",
            "Añadir \"type\":\"module\" en package.json o .mjs",
            "Instalar un plugin",
            "No es posible en Node"
          ]}
          answerIndex={1}
          explain='Node activa ESM con "type":"module" a nivel de proyecto (o usando extensión .mjs).'
        />
        <MiniQuiz
          question="¿Qué opción es NO bloqueante en Node?"
          options={[
            "fs.readFileSync()",
            "while(true){}",
            "fs.promises.readFile()",
            "JSON.parse()"
          ]}
          answerIndex={2}
          explain="fs.promises.readFile() usa I/O asíncrono; las otras opciones bloquean el hilo."
        />
      </section>

      {/* Mini-Lab */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold">Mini-Lab (15–20 min)</h3>
        <ol className="list-decimal pl-5 mt-2 space-y-2">
          <li>Crea <code>package.json</code> con <code>npm init -y</code> y añade <code>"type":"module"</code>.</li>
          <li>Añade script <code>"dev": "node --watch index.js"</code>.</li>
          <li>En <code>index.js</code>, lee un fichero <code>data.txt</code> con <code>fs/promises</code>, 
             convierte su contenido a MAYÚSCULAS y guárdalo como <code>out.txt</code>.</li>
          <li>Muestra en consola el tamaño del archivo generado (usa <code>fs.stat</code>).</li>
        </ol>
        <pre className="mt-3 p-3 bg-light rounded-xl overflow-auto text-sm">
{`// index.js (ESM)
import { readFile, writeFile, stat } from "node:fs/promises";

async function run(){
  const input = await readFile("data.txt", "utf8");
  const upper = input.toUpperCase();
  await writeFile("out.txt", upper, "utf8");
  const info = await stat("out.txt");
  console.log("out.txt ->", info.size, "bytes");
}
run().catch(console.error);`}
        </pre>
      </section>

      {/* Checklist de salida */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold">Checklist de salida</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Comprendo qué resuelve Node y cómo funciona el Event Loop.</li>
          <li>Se crear y ejecutar scripts con npm (<code>dev/start/test</code>).</li>
          <li>Distingo <strong>ESM</strong> vs <strong>CommonJS</strong> y sé cuándo usar cada uno.</li>
          <li>Hago I/O asíncrono con <code>fs/promises</code> y manejo errores con <code>try/catch</code>.</li>
        </ul>
      </section>

      {/* CTA siguiente paso */}
      <div className="text-center">
        <Link
          to="/mf0492/uf1844"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl shadow-brand hover:opacity-90"
        >
          Siguiente: Express básico (rutas y middleware) →
        </Link>
      </div>
    </section>
  );
}
