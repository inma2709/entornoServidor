import React from "react";
import { Link } from "react-router-dom";

export default function ProgramacionAsincrona() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          6. Programación Asíncrona (El motor de Node)
        </h2>
        <p className="text-secondary/70 mt-2">
          Callbacks, Promesas y Async/Await: cómo Node.js maneja la espera sin bloquear el servidor.
        </p>
      </header>

      {/* OBJETIVO */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🎯 Objetivo de la sesión</h3>
        <p className="mt-2">
          Comprender el modelo de No Bloqueo de Node.js. Aprender a usar Promesas y, lo más importante, la sintaxis moderna Async/Await para gestionar operaciones que tardan tiempo (como consultas a la base de datos) de forma legible y eficiente.
        </p>
      </section>

      {/* PASO 1: SINCRONÍA VS ASINCRONÍA */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">1) Sincronía vs. Asincronía (Analogía del restaurante)</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🐢 Programación Síncrona (Bloqueante)</h4>
            <p className="text-secondary/90 mb-2">
              El código se ejecuta línea por línea, de principio a fin. Una tarea debe completarse antes de que la siguiente pueda comenzar.
            </p>
            <p className="font-medium text-accent">
              Analogía: Eres el camarero (el único hilo de Node) y tomas un pedido. Hasta que el cocinero no te da ese plato, no puedes atender a la siguiente mesa. Bloqueas todo el servicio.
            </p>
            <pre className="overflow-x-auto text-sm bg-gray-50 p-2 rounded mt-2">
              <code>{`// Código síncrono
const resultadoA = ejecutarTareaA(); // espera a que termine A
const resultadoB = ejecutarTareaB(); // espera a que termine B
console.log(resultadoA, resultadoB);`}</code>
            </pre>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">🚀 Programación Asíncrona (No Bloqueante)</h4>
            <p className="text-secondary/90 mb-2">
              Node le dice al sistema operativo que ejecute una tarea que consume tiempo (ej. lectura de disco) y, en lugar de esperar, sigue ejecutando el resto del código. Cuando la tarea termina, se le notifica.
            </p>
            <p className="font-medium text-primary">
              Analogía: Tomas el pedido y se lo das al cocinero. Luego, sigues atendiendo a otras mesas. Cuando el plato está listo, el cocinero te avisa con un "callback" o una "Promesa". ¡El servicio no se bloquea!
            </p>
            <pre className="overflow-x-auto text-sm bg-gray-50 p-2 rounded mt-2">
              <code>{`// Código asíncrono
ejecutarTareaLenta(callback); // no espera, sigue
console.log('¡Sigo trabajando!'); // se ejecuta antes que la tarea lenta`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* PASO 2: LAS PROMESAS */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">2) El estándar moderno: Las Promesas (`Promise`)</h3>
        <p className="mt-2">
          Una Promesa es un objeto que representa la finalización (o el fracaso) de una operación asíncrona. Es el mecanismo que Node.js y el JavaScript moderno usan para evitar el "Callback Hell".
        </p>

        <div className="bg-light p-4 rounded-xl mt-3">
          <h4 className="font-semibold mb-2">Estados de una Promesa</h4>
          <ul className="list-disc pl-6 space-y-1 text-secondary/90">
            <li>
              Pending (Pendiente): Estado inicial. La operación aún no ha terminado.
            </li>
            <li>
              Fulfilled (Resuelta/Exitosa): La operación terminó con éxito. Se accede al resultado con `.then()`.
            </li>
            <li>
              Rejected (Rechazada/Fallida): La operación terminó con error. Se maneja con `.catch()`.
            </li>
          </ul>
        </div>

        <div className="bg-light p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold mb-2">Ejemplo práctico de Promesa con `.then()`</h4>
          <pre className="overflow-x-auto text-sm"><code>{`// Creamos una función que devuelve una Promesa
const simularLecturaDB = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulamos que la base de datos devuelve datos
      if (ms > 1500) {
        reject('Error: Timeout de la DB');
      }
      resolve({ usuario: 'Ada', items: 3 });
    }, ms);
  });
};

console.log('1. Petición a la base de datos (inicia)');

simularLecturaDB(1000) // Se ejecuta la promesa
  .then(data => {
    // Esto se ejecuta SÓLO cuando la Promesa se resuelve (resolve)
    console.log('4. Datos recibidos:', data);
  })
  .catch(err => {
    // Esto se ejecuta SÓLO si la Promesa es rechazada (reject)
    console.error('ERROR:', err);
  });

console.log('2. ¡El servidor sigue funcionando! (código no bloqueado)');
// NOTA: El orden de ejecución será 1, 2, y luego 4.
`}</code></pre>
        </div>
      </section>

      {/* PASO 3: ASYNC/AWAIT */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">3) La solución definitiva: `async` y `await`</h3>
        <p className="mt-2">
          `async/await` es solo una "azúcar sintáctica" (una forma más bonita y legible) para trabajar con Promesas. Hace que el código asíncrono parezca síncrono, facilitando su lectura y manejo.
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold mb-2">Reglas de Oro</h4>
          <ul className="list-disc pl-6 space-y-1 text-secondary/90">
            <li>
              La palabra clave `await` solo se puede usar dentro de una función marcada como `async`.
            </li>
            <li>
              `await` pausa la ejecución de la función `async` hasta que la Promesa se resuelva (o rechace).
            </li>
            <li>
              Para manejar errores, usamos el clásico bloque `try...catch`.
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <h4 className="font-semibold mb-2">Ejemplo usando `async/await` (¡Nuestro estándar!)</h4>
          <pre className="overflow-x-auto text-sm"><code>{`// Reutilizamos la función simularLecturaDB de la práctica anterior
// ...

async function obtenerDatos() {
  console.log('1. Petición a la base de datos (inicia)');

  try {
    // AWAIT: La ejecución se pausa aquí, pero el servidor sigue con otras tareas
    const datos = await simularLecturaDB(1000); 

    console.log('4. Datos recibidos:', datos);
    
    // Si queremos esperar otra cosa:
    const datos2 = await simularLecturaDB(500);
    console.log('5. Segunda espera terminada.');

  } catch (error) {
    // Si simularLecturaDB llama a reject(), catch() lo atrapa
    console.error('¡Fallo en la consulta!', error);
  }
}

obtenerDatos();
console.log('2. ¡El servidor sigue funcionando! (código no bloqueado)');
// NOTA: Este es el formato que usaremos SIEMPRE en nuestras rutas de Express.
`}</code></pre>
        </div>
      </section>

      {/* CIERRE */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">🚀 Reto y Enlace con Express</h3>
        <p className="mt-2">
          El manejo de datos en Express siempre se hará dentro de las rutas usando `async/await`. Por ejemplo:
        </p>
        <pre className="overflow-x-auto text-sm bg-black/50 p-3 rounded mt-2">
          <code>{`app.get('/api/productos', async (req, res) => {
  try {
    // Aquí es donde AWAITharemos la consulta a la BD
    const productos = await bd.obtenerTodos(); 
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Fallo del servidor' });
  }
});`}</code>
        </pre>
        <p className="mt-3">
          Ahora sí: Ya tienes la base de Node.js (scripts, npm, http) y el motor (asincronía). ¡Estamos listos para hacer un CRUD completo con Express!
        </p>
      </section>

      {/* NAVEGACIÓN */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/modulos-dependencias" className="hover:underline text-primary font-medium">
          ← Lección anterior: Módulos y dependencias
        </Link>
        <Link to="/mf0492/uf1844/introduccion-express" className="hover:underline text-primary font-medium">
          Siguiente: Introducción a Express →
        </Link>
      </footer>
    </article>
  );
}
