import React from "react";
import { Link } from "react-router-dom";

export default function ModulosDependencias() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          4. Módulos y dependencias (npm)
        </h2>
        <p className="text-secondary/70 mt-2">
          Cómo organizar el código, usar funciones de terceros (dependencias) y gestionar Node con npm.
        </p>
      </header>

      {/* OBJETIVO */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🎯 Objetivo de la sesión</h3>
        <p className="mt-2">
          Aprenderás a dividir el código en Módulos (archivos reusables) y a usar el gestor de paquetes npm para instalar librerías externas. Esto es esencial para entender cómo instalaremos y usaremos Express.
        </p>
      </section>

      {/* PASO 1: MÓDULOS NATIVOS VS. LOCALES */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">1) Módulos: organización del código</h3>

        <div className="mb-6 bg-white p-4 rounded-xl shadow">
          <h4 className="font-semibold mb-2">¿Por qué usar módulos?</h4>
          <p className="text-secondary/90">
            Un módulo es simplemente un archivo de JavaScript que exporta funciones, variables o clases para que otros archivos puedan importarlas y usarlas. Esto evita tener un único archivo gigante y facilita la reutilización y el mantenimiento del código.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* MÓDULO DE CÓDIGO */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">📄 Archivo: `utilidades.js`</h4>
            <pre className="overflow-x-auto text-sm"><code>{`// utilidades.js
// FUNCIÓN A EXPORTAR
function sumar(a, b) {
  return a + b;
}

// EXPORTACIÓN: Solo lo que se exporta es visible fuera del archivo
module.exports = {
  sumar,
  PI: 3.14159,
};`}</code></pre>
          </div>

          {/* MÓDULO PRINCIPAL */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">📄 Archivo: `principal.js`</h4>
            <pre className="overflow-x-auto text-sm"><code>{`// principal.js
// IMPORTACIÓN: Usar require para traer las funciones
const { sumar, PI } = require('./utilidades'); // Usa './' para archivos locales

const resultado = sumar(10, 5);
console.log('Suma:', resultado); // Salida: Suma: 15
console.log('Valor PI:', PI); // Salida: Valor PI: 3.14159`}</code></pre>
          </div>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">Tipos de módulos en Node.js</h4>
          <ul className="list-disc pl-5 text-secondary/90 space-y-1 mt-2">
            <li>
              <strong>Nativos (built-in)</strong>: Módulos que vienen con Node.js y no necesitan instalación. Ej: <code>require('node:http')</code> o <code>require('node:fs')</code>.
            </li>
            <li>
              <strong>Locales</strong>: Archivos que tú mismo creas y usas con una ruta relativa. Ej: <code>require('./utilidades')</code>.
            </li>
            <li>
              <strong>De terceros (Dependencias)</strong>: Módulos instalados por <code>npm</code>. Ej: <code>require('express')</code>.
            </li>
          </ul>
        </div>
      </section>

      {/* PASO 2: INTRODUCCIÓN A NPM */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">2) npm y el archivo `package.json`</h3>
        <p className="mt-2">
          npm (Node Package Manager) es la herramienta que usaremos para instalar librerías externas. Es el corazón de cualquier proyecto Node.js.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold mb-2">🛠️ Comandos básicos</h4>
            <ul className="list-disc pl-6 space-y-1 text-secondary/90">
              <li>
                <code>npm init -y</code>: Crea el archivo <code>package.json</code> con valores por defecto.
              </li>
              <li>
                <code>npm install express</code>: Instala Express y lo añade como dependencia.
              </li>
              <li>
                <code>npm start</code> o <code>npm run dev</code>: Ejecuta los scripts definidos en `package.json`.
              </li>
              <li>
                <code>npm install</code>: Instala todas las dependencias listadas en `package.json`.
              </li>
            </ul>
          </div>
          <div className="bg-light p-4 rounded-xl">
            <h4 className="font-semibold mb-2">📂 La carpeta `node_modules`</h4>
            <p className="text-secondary/90">
              Cuando instalas una dependencia (librería), npm la descarga y la guarda en una carpeta llamada <code>node_modules</code>. Esta carpeta puede ser muy grande y nunca se sube a repositorios (por eso usamos el archivo <code>.gitignore</code>). El archivo <code>package.json</code> es lo único que necesitamos para reconstruirla con <code>npm install</code>.
            </p>
          </div>
        </div>
      </section>

      {/* PASO 3: ANATOMÍA DE package.json */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">3) Entendiendo `package.json`</h3>
        <p className="mt-2">
          Este archivo actúa como el "carnet de identidad" de tu proyecto, listando metadatos, scripts de ejecución y, lo más importante, las librerías que necesita.
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold mb-2">Ejemplo de `package.json`</h4>
          <pre className="overflow-x-auto text-sm"><code>{`{
  "name": "mf0492-servidor-api",
  "version": "1.0.0",
  "description": "API de prueba para el módulo UF1844",
  "main": "api.js", // Archivo de arranque principal
  "scripts": {
    "start": "node api.js", // npm start
    "dev": "nodemon api.js" // npm run dev (útil para desarrollo)
  },
  "keywords": ["node", "express"],
  "author": "Tu Nombre",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2", // Librerías que el proyecto necesita para funcionar
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1" // Librerías solo para desarrollo (no necesarias en producción)
  }
}`}</code></pre>
        </div>
        
        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">¡Prepárate para Express!</h4>
          <p className="mt-2 text-secondary/90">
            Ahora que entendemos qué es un módulo y cómo usar `npm` para gestionar dependencias, estamos listos para instalar y empezar a trabajar con el framework Express. Es un módulo de terceros que simplificará enormemente la creación de rutas que vimos en la lección anterior.
          </p>
        </div>
      </section>

        {/* NUEVA SECCIÓN: Resumen y Transición a Express */}
      <section className="rounded-2xl p-6 bg-blue-50 shadow-inner border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-900 mb-3">4) Resumen y Transición a Express (El Gran Salto)</h3>
        <p className="text-blue-800/90 mb-4">
          Hemos visto cómo Node.js puro puede crear un servidor. Ahora, conectemos los puntos para entender por qué la industria usa Express y cómo se relaciona con lo que ya hemos aprendido.
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-900">
            {/* Columna 1: Node.js Puro */}
            <div className="p-4 bg-blue-200 rounded-xl shadow-md">
                <h4 className="font-bold mb-2">🌐 Node.js (El Motor)</h4>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Es el entorno de ejecución de JavaScript.</li>
                    <li>Soporta librerías Nativas (ej: <code>node:http</code>).</li>
                    <li>Maneja las conexiones de red, el sistema de archivos y el motor V8.</li>
                    <li>Funcionalidad clave: Ofrece el objeto <code>http</code> para crear servidores.</li>
                </ul>
            </div>

            {/* Columna 2: Express (La Solución) */}
            <div className="p-4 bg-blue-300 rounded-xl shadow-md">
                <h4 className="font-bold mb-2">📦 Express (La Dependencia)</h4>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Es una librería (módulo de terceros) que se instala vía npm.</li>
                    <li>Simplifica y abstrae las funciones de <code>node:http</code>.</li>
                    <li>Convierte las tareas complejas en métodos sencillos.</li>
                    <li>Funcionalidad clave: Hace el enrutamiento trivial.</li>
                </ul>
            </div>

            {/* Columna 3: Conexión y Diferencia */}
            <div className="p-4 bg-blue-100 rounded-xl shadow-md border border-blue-300">
                <h4 className="font-bold mb-2">🔗 ¿Cómo se Relacionan?</h4>
                <p className="mb-1"><strong>Node.js</strong> es el hardware; Express es el software.</p>
                <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Son interdependientes:</strong> Express requiere que Node.js esté corriendo para funcionar.</li>
                    <li><strong>Node es un módulo:</strong> Express es un módulo que Node.js importa.</li>
                    <li><strong>Diferencia clave:</strong> Node requiere `if (req.url === '...' && req.method === 'GET')`. Express lo reduce a un simple `app.get('/ruta', ...)`.</li>
                </ul>
            </div>
        </div>

        <div className="mt-6 bg-blue-700/80 p-4 rounded-xl text-white font-medium">
            <h4 className="font-bold text-xl mb-1">El Gran Salto de Abstracción</h4>
            <p className="text-sm">
                En el código de la lección anterior, el enrutamiento se hacía con muchos <code>if</code> y la gestión de cabeceras era manual. Express elimina esa complejidad, permitiéndote centrarte en la lógica de negocio (qué datos devolver) en lugar de en la lógica de servidor (cómo manejar la red).
            </p>
        </div>
      </section>

      {/* CIERRE */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">🚀 Próximo paso: Empezar con Express</h3>
        <p className="mt-2">
          Ya tienes la base de Node.js. A partir de la próxima lección, dejaremos de lado el módulo nativo `node:http` y usaremos Express, que es el estándar de facto para la creación de APIs en Node.
        </p>
      </section>


      

      {/* NAVEGACIÓN */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/primeros-pasos" className="hover:underline text-primary font-medium">
          ← Lección anterior: Primeros pasos con Node.js
        </Link>
        <Link to="/mf0492/uf1844/asincronia" className="hover:underline text-primary font-medium">
          Siguiente:Asincronia →
        </Link>
      </footer>
    </article>
  );
}
