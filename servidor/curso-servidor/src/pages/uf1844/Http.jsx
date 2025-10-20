import React from "react";
import { Link } from "react-router-dom";

export default function ResumenFundamentosNode() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          6. Resumen: Los 3 Pilares de Node.js
        </h2>
        <p className="text-secondary/70 mt-2">
          Consolidando Servidores Web, Asincronía y Gestión de Paquetes (npm).
        </p>
      </header>

      {/* INTRODUCCIÓN Y CONTEXTO */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🧠 ¿Qué hemos aprendido hasta ahora?</h3>
        <p className="mt-2 text-secondary/90">
          Hemos completado la base pura de Node.js. Antes de pasar a Express (que simplifica todo), es vital que estos tres conceptos estén claros. Son la esencia de por qué Node.js es tan rápido y eficiente.
        </p>
      </section>

      {/* PILAR 1: EL ENTORNO Y LOS MÓDULOS */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">I. El Sistema de Paquetes (npm)</h3>
        <p className="mt-2 text-secondary/90">
          npm no es solo un gestor de dependencias; es la puerta de entrada a millones de herramientas.
        </p>
        
        <div className="mt-4 space-y-3">
          <div className="bg-white p-3 rounded-xl shadow border-l-4 border-accent">
            <h4 className="font-semibold text-secondary">Concepto Clave: Dependencies</h4>
            <p className="text-sm text-secondary/90">
              Son librerías de terceros que necesitamos para que nuestra app funcione (ej. Express).
              <code className="bg-gray-100 p-1 rounded ml-2">$ npm install express</code>
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow border-l-4 border-accent">
            <h4 className="font-semibold text-secondary">Concepto Clave: Módulos</h4>
            <p className="text-sm text-secondary/90">
              `require()` o `import` son nuestras puertas de entrada a funcionalidades, ya sean nativas (`node:http`) o de terceros (`express`).
            </p>
          </div>
        </div>
      </section>

      {/* PILAR 2: EL SERVIDOR WEB Y HTTP */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-primary">II. El Corazón HTTP (Servidores Web)</h3>
        <p className="mt-2 text-secondary/90">
          Hemos visto cómo `node:http` funciona a nivel bajo para manejar peticiones.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-light p-3 rounded-xl shadow-inner">
            <h4 className="font-semibold text-secondary">La Interfaz `req` y `res`</h4>
            <ul className="list-disc pl-5 text-sm space-y-1 text-secondary/90">
              <li>**`req` (Request):** Contiene la información del cliente (URL, método: GET, POST...).</li>
              <li>**`res` (Response):** Usado para enviar la respuesta de vuelta (cuerpo, cabeceras, códigos de estado).</li>
            </ul>
          </div>
          <div className="bg-light p-3 rounded-xl shadow-inner">
            <h4 className="font-semibold text-secondary">El Enrutado Manual (y su Problema)</h4>
            <p className="text-sm text-secondary/90">
              El enrutado en Node nativo requiere verificar manualmente `req.url` y `req.method` con sentencias `if`. Este es el caos que Express viene a solucionar.
            </p>
          </div>
        </div>
      </section>

      {/* PILAR 3: EL MOTOR DE EJECUCIÓN */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-primary">III. El Modelo Asíncrono (No Bloqueante)</h3>
        <p className="mt-2 text-secondary/90">
          Este es el concepto más importante: Node.js usa un solo hilo (camarero) que no se bloquea esperando.
        </p>

        <div className="mt-4 space-y-3">
          <div className="bg-white p-3 rounded-xl shadow border-l-4 border-accent">
            <h4 className="font-semibold text-secondary">Promesas y `async/await`</h4>
            <p className="text-sm text-secondary/90">
              **`Promise`** es la garantía de que una operación futura tendrá un resultado (`resolve`) o un error (`reject`).
              **`async/await`** es la sintaxis limpia que usamos para pausar la ejecución de una función (sin bloquear el servidor) hasta que la Promesa se resuelva.
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow border-l-4 border-accent">
            <h4 className="font-semibold text-secondary">¿Cuándo usar `await`?</h4>
            <p className="text-sm text-secondary/90">
              Siempre que la tarea tarde: leer un archivo, consultar una base de datos, o llamar a otra API web.
              <code className="bg-gray-100 p-1 rounded ml-2">const datos = await db.query()</code>
            </p>
          </div>
        </div>
      </section>

      {/* CIERRE Y ENLACE A EXPRESS */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">¡Todo listo para Express!</h3>
        <p className="mt-2">
          Express toma el **Pilar II (HTTP)** y nos da una sintaxis sencilla para el enrutado, y combina esto con el **Pilar III (Asincronía)** para interactuar fácilmente con recursos externos.
        </p>
        <p className="mt-2 font-medium">
          Ahora que entendemos la "teoría de la ingeniería", ¡vamos a usar la "caja de herramientas profesional"!
        </p>
      </section>

      {/* NAVEGACIÓN */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/programacion-asincrona" className="hover:underline text-primary font-medium">
          ← Lección anterior: Programación Asíncrona
        </Link>
        <Link to="/mf0492/uf1844/introduccion-express" className="hover:underline text-primary font-medium">
          Siguiente: Introducción a Express →
        </Link>
      </footer>
    </article>
  );
}
