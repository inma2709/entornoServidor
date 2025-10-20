import React from "react";
import { Link } from "react-router-dom";
import SectionCors from "../../components/SectionCors";
import ConexionFrontBack from "../../components/ConexionFrontBack";

export default function PrimerosPasos() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          3. Primeros pasos con Node.js
        </h2>
        <p className="text-secondary/70 mt-2">
          Del “Hola Node” a entender HTTP, rutas, JSON y cómo el front habla con el back
        </p>
      </header>

      {/* OBJETIVO */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-xl font-semibold text-secondary">🎯 Objetivo de la sesión</h3>
        <p className="mt-2">
          Conceptos bases que debes conocer: qué es un <strong>script</strong>, qué es la <strong>terminal</strong>,
          qué significa levantar un <strong>servidor</strong>, qué es una <strong>ruta</strong>,
          qué es un <strong>puerto</strong> y, sobre todo, qué es <strong>JSON</strong> y por qué
          es la forma habitual en la que el <strong>front</strong> y el <strong>back</strong> se hablan.
        </p>
      </section>

      {/* PASO 1: SCRIPT + TERMINAL */}
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">1) Tu primer script con Node</h3>

        <div className="mb-6 bg-white p-4 rounded-xl shadow">
          <h4 className="font-semibold mb-2">¿Qué es un script?</h4>
          <p className="text-secondary/90">
            Un <strong>script</strong> es un archivo de texto que contiene instrucciones escritas en un lenguaje de programación, en este caso JavaScript. 
            Cuando ejecutas un script, esas instrucciones se procesan de arriba a abajo, realizando tareas de forma automática y repetible. 
            Los scripts se usan para automatizar procesos, manipular datos, realizar cálculos, interactuar con archivos, conectarse a servicios externos o, como en Node.js, crear servidores y aplicaciones completas. 
            En el contexto de Node.js, un script puede ser tan simple como mostrar un mensaje en consola o tan complejo como gestionar una API. 
            La principal ventaja de los scripts es que permiten ejecutar tareas sin intervención manual, facilitando el trabajo diario de desarrolladores y usuarios. 
            Por ejemplo, puedes crear un script para limpiar datos, generar informes, lanzar un servidor web o automatizar pruebas. 
            En resumen, un script es una herramienta flexible y poderosa para resolver problemas de manera eficiente y reproducible.
          </p>
          <p className="mt-3 text-secondary/90">
            En el desarrollo web, los <strong>scripts</strong> nos permiten automatizar tareas repetitivas, como compilar código, iniciar servidores, ejecutar pruebas o transformar archivos. Gracias a los scripts, podemos simplificar y acelerar procesos que de otro modo serían manuales y propensos a errores, facilitando así el flujo de trabajo y mejorando la productividad del equipo de desarrollo.

          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2">📘 Conceptos básicos</h4>
            <ul className="list-disc pl-6 space-y-1 text-secondary/90">
              <li>
                <strong>Script</strong>: archivo de texto con código JavaScript. Ej: <code>hola.js</code>.
              </li>
              <li>
                <strong>Terminal</strong>: ventana donde escribes órdenes. Ejecutas Node con:{" "}
                <code>node nombre-del-archivo.js</code>.
              </li>
              <li>
                <strong>Consola</strong>: salida de mensajes con <code>console.log()</code>.
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <pre className="overflow-x-auto text-sm"><code>{`// hola.js
      console.log('Hola Node 👋');`}</code></pre>
          </div>
        </div>

        <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
          <h4 className="font-semibold text-accent">Checklist rápido</h4>
          <ul className="list-disc pl-5 text-secondary/90 space-y-1 mt-2">
            <li>Abro terminal en la carpeta del archivo.</li>
            <li>Ejecuto <code>node hola.js</code>.</li>
            <li>Veo el mensaje en consola → ✅</li>
          </ul>
        </div>

        <details className="mt-3 bg-white/70 rounded-xl p-4 border">
          <summary className="cursor-pointer font-medium">🧪 Mini-práctica</summary>
          <p className="mt-2 text-sm">
            Cambia el mensaje por tu nombre y añade otra línea con un emoji.
          </p>
        </details>
      </section>
     

<div class="space-y-4">
    <h4 class="text-xl font-semibold text-primary">¿Qué hace este código?</h4>
    <p class="text-slate-600">
        Este código utiliza la función estándar de JavaScript <code>console.log()</code> para imprimir un mensaje. La clave aquí es dónde se ejecuta.
    </p>

    <ul class="space-y-3">
        <li class="p-3 bg-light rounded-lg border-l-4 border-accent">
            <strong class="text-secondary">En el Navegador:</strong> <code>console.log</code> imprime el mensaje en la Pestaña de Consola de las Herramientas de Desarrollador (Developer Tools).
        </li>
        <li class="p-3 bg-light rounded-lg border-l-4 border-accent">
            <strong class="text-secondary">En Node.js:</strong> Al ejecutarlo con el comando <code><code class="font-fira bg-gray-200 p-1 rounded">node hola.js</code></code>, el mensaje se imprime directamente en la Terminal donde se inició el comando.
        </li>
    </ul>
    
    <div class="bg-blue-100 p-4 rounded-xl text-blue-800 font-medium border border-blue-200">
        💡 El Rol del Comando 'node': El comando <code>node</code> es el motor de ejecución. Su única misión es leer tu archivo JavaScript y ejecutarlo fuera del navegador, usando el entorno del servidor (o tu máquina local). 
    </div>
</div>

      {/* PASO 2: ARGUMENTOS */}
        <section className="rounded-2xl p-6 bg-white shadow border border-light">
          <h3 className="text-xl font-semibold text-secondary">2) Parámetros desde la terminal. Personalizando el script</h3>
          <p className="mt-2">
            Tu script puede recibir datos que escribes al arrancarlo. Así se vuelve “interactivo”.
          </p>

          <div className="bg-light p-4 rounded-xl mt-3">
            <pre className="overflow-x-auto text-sm"><code>{`// saluda.js
      const args = process.argv.slice(2);

      const nombre = args[0] || 'Invitado';

      const edad = parseInt(args[1]) || 0;

      console.log(\`Hola, \${nombre}. Tienes \${edad} años.\`);
      `}</code></pre>
          </div>

          <div className="bg-black text-white rounded-xl p-4 mt-3 overflow-x-auto">
            <pre className="text-sm"><code>{`$ node saluda.js Ada 23
      Hola, Ada. Tienes 23 años.

      $ node saluda.js
      Hola, Invitado. Tienes 0 años.`}</code></pre>
          </div>
          <h5 class="font-bold text-lg text-blue-900 mt-4 mb-2">Importancia de esta Sintaxis</h5>
<p class="text-sm text-orange-800">
    Conocer cómo manejar los argumentos de la línea de comandos es esencial porque:
</p>
<ul class="list-disc pl-5 mt-2 text-blue-800 space-y-1 text-sm">
    <li>Control de Servidor: Permite configurar puertos, entornos (`producción` vs `desarrollo`) o claves de API sin modificar el código fuente.</li>
    <li>Automatización: Es la base para construir herramientas de línea de comandos (CLI) que automatizan tareas, como scripts de *build* o migración de bases de datos. </li>
    <li>Flexibilidad: Hace que tu código sea reutilizable, ya que su comportamiento cambia de forma dinámica con la entrada del usuario en lugar de estar codificado de forma rígida.</li>
</ul>

{/* Ejercicio práctico: suma dos números desde la terminal */}
<div className="mt-6 bg-white p-4 rounded-xl shadow">
  <h4 className="font-semibold mb-2">📝 Ejercicio: Suma dos números desde la terminal</h4>
  <p className="text-secondary/90 mb-2">
    Crea un archivo <code>suma.js</code> que reciba dos números como argumentos y muestre su suma por consola.
  </p>
  

  <details className="mt-3 bg-white rounded-xl p-4 border">
    <summary className="cursor-pointer font-medium">🧠 Conexión con el front</summary>
    <p className="mt-2 text-sm text-secondary/90">
       Más adelante, cuando creemos una API, estos 
      datos llegarán desde el <strong>front</strong> a través de peticiones <code>fetch()</code>, 
      por ejemplo desde un formulario. En lugar de leerlos con <code>argv</code>, el servidor los 
      recibirá en <code>req.body</code> o en los <code>parámetros</code> de la URL.
    </p>
    <p className="mt-2 text-sm text-secondary/90">
      Es decir: ahora pasamos los datos al script desde la terminal, pero pronto lo haremos desde 
      una página HTML o un componente de React que enviará esos valores al backend para procesarlos. 
      La lógica será la misma, solo cambia la forma de recibir la información.
    </p>
  </details>

  
</div>
        </section>

        

        {/* PASO 3: QUÉ ES UN SERVIDOR HTTP */}
        <section className="rounded-2xl p-6 bg-white shadow border border-light">
          <h3 className="text-xl font-semibold text-secondary">3) Servidor, ruta y puerto</h3>
          <ul className="list-disc pl-6 space-y-1 text-secondary/90">
            <li>
              <strong>Servidor</strong>: programa que “está escuchando” y responde a peticiones. Node puede ser ese programa.
            </li>
            <li>
              <strong>Puerto</strong>: “puerta” numérica por la que entra la petición. Usaremos el <code>3000</code> para el back igual que usabamos el 5173 para Vite.
            </li>
            <li>
              <strong>Ruta / endpoint</strong>: camino concreto dentro del servidor. Ej: <code>/api/saludo</code>.
            </li>
          </ul>
          <p className="mt-2">
            El navegador (o tu front en React) hace una petición HTTP a una ruta y el servidor responde (normalmente con JSON).
          </p>
        </section>

        <section className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            6. Servidor HTTP Puro (Módulo <code>node:http</code>)
          </h3>
          <p className="text-slate-600 mb-4">
            Este archivo representa el código mínimo y fundamental para crear un servidor web funcional en Node.js. Aprender su estructura es esencial, ya que es la base sobre la que se construyen frameworks más avanzados como Express.js.
          </p>
          {/* BLOQUE DE CÓDIGO */}
          <div className="bg-slate-900 text-white p-4 rounded-xl font-fira text-sm mb-6">
            <span className="text-green-400">// archivo: api.js</span>
            <pre>
              <code>{`const http = require('node:http');

        const server = http.createServer((req, res) => {
          // Cabeceras: CORS y tipo de respuesta JSON
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json; charset=utf-8');

          // GET /api/saludo
          if (req.url === '/api/saludo' && req.method === 'GET') {
            const data = { ok: true, mensaje: 'Hola desde Node API 👋', modulo: 'UF1844' };
            res.writeHead(200);
            return res.end(JSON.stringify(data)); // objeto JS → texto JSON
          }

          // GET /api/hora
          if (req.url === '/api/hora' && req.method === 'GET') {
            const ahora = new Date();
            const hh = String(ahora.getHours()).padStart(2, '0');
            const mm = String(ahora.getMinutes()).padStart(2, '0');
            res.writeHead(200);
            return res.end(JSON.stringify({ ok: true, hora: \`\${hh}:\${mm}\` }));
          }

          // Cualquier otra ruta
          res.writeHead(404);
          res.end(JSON.stringify({ ok: false, error: 'No encontrado' }));
        });

        // Puerto 3000
        server.listen(3000, () => {
          console.log('✅ API en http://localhost:3000 (GET /api/saludo, /api/hora)');
        });`}</code>
            </pre>
          </div>
          {/* FIN BLOQUE CÓDIGO */}

          <h4 className="text-xl font-semibold text-primary mb-3">¿Es esto JavaScript?</h4>
          <div className="bg-blue-100 p-4 rounded-xl text-blue-800 font-medium border border-blue-200 mb-6">
            <p className="text-sm">
              Sí. Este código es JavaScript moderno (ES6+) ejecutándose en el entorno de Node.js. La única diferencia con el JavaScript del navegador es que utiliza <strong className="text-blue-900">APIs nativas de Node</strong> (como <code>require('node:http')</code>) que le dan acceso directo a funciones del sistema operativo, como manejar la red y los puertos.
            </p>
          </div>

          <h4 className="text-xl font-semibold text-primary mb-3">Desglose Paso a Paso del Flujo del Servidor</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-light rounded-lg shadow-md border border-slate-300">
              <thead>
                <tr className="bg-accent-light text-secondary">
                  <th className="py-2 px-4 text-left border-b border-slate-300">Líneas</th>
                  <th className="py-2 px-4 text-left border-b border-slate-300">Concepto Clave</th>
                  <th className="py-2 px-4 text-left border-b border-slate-300">Función</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 border-b border-slate-200">
                  <td className="py-3 px-4 font-fira">1</td>
                  <td className="py-3 px-4 font-semibold">Importación</td>
                  <td className="py-3 px-4">Carga el módulo nativo <code>http</code>. Sin esto, Node.js no sabe crear un servidor web.</td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-slate-200">
                  <td className="py-3 px-4 font-fira">3-25</td>
                  <td className="py-3 px-4 font-semibold">Motor del Servidor</td>
                  <td className="py-3 px-4">Crea el servidor. El callback dentro de <code>createServer</code> se ejecuta por cada petición del cliente. Recibe req (petición) y res (respuesta).</td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-slate-200">
                  <td className="py-3 px-4 font-fira">6-7</td>
                  <td className="py-3 px-4 font-semibold">Cabeceras CORS & JSON</td>
                  <td className="py-3 px-4">Instrucciones cruciales: 1. Permite que cualquier web acceda a la API (CORS). 2. Indica que la respuesta será en formato JSON.</td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-slate-200">
                  <td className="py-3 px-4 font-fira">10-14, 17-23</td>
                  <td className="py-3 px-4 font-semibold text-accent">Enrutamiento (Routing)</td>
                  <td className="py-3 px-4">La lógica principal. Usa if para decidir qué hacer basado en la URL (req.url) y el método (req.method). Si coinciden, devuelve una respuesta y usa <code>return</code> para detener la ejecución.</td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-slate-200">
                  <td className="py-3 px-4 font-fira">13, 22</td>
                  <td className="py-3 px-4 font-semibold">Cierre y Envío</td>
                  <td className="py-3 px-4"><code>res.end()</code> finaliza el ciclo y envía la respuesta. Se usa <code>JSON.stringify()</code> para convertir el objeto JS a la cadena de texto JSON que viaja por la red.</td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-slate-200">
                  <td className="py-3 px-4 font-fira">26-27</td>
                  <td className="py-3 px-4 font-semibold">Error 404</td>
                  <td className="py-3 px-4">El camino de error por defecto: si ninguna ruta coincide, se establece el código 404 y se devuelve un mensaje de "No encontrado".</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-fira">30-32</td>
                  <td className="py-3 px-4 font-semibold text-accent">Escucha del Puerto</td>
                  <td className="py-3 px-4">El servidor se "enciende" y espera peticiones en el Puerto 3000. Si esto falla, obtienes el error <code>EADDRINUSE</code> (Puerto Ocupado).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-primary mt-6 mb-3">La Importancia de este Patrón</h4>
          <p className="text-slate-600 mb-4">
            Este ejercicio es la piedra angular del desarrollo backend en Node.js, ya que te introduce a tres conceptos de la arquitectura web:
          </p>
          <ul className="list-disc pl-5 text-slate-600 space-y-3">
            <li>
              <strong>El Ciclo de Petición/Respuesta:</strong> Comprendes que todo servidor opera sobre un par (req, res). Tu código solo tiene que leer la petición y escribir la respuesta.
            </li>
            <li>
              <strong>HTTP y Códigos de Estado:</strong> Aprendes a usar los códigos de estado (200, 404, 500) para comunicar el resultado de una operación.
            </li>
            <li>
              <strong>Bases de JSON:</strong> Refuerza la necesidad de transformar datos de JavaScript a un formato estándar (JSON.stringify) para que puedan viajar por la red.
            </li>
          </ul>
          <div className="bg-yellow-100 p-4 rounded-xl text-yellow-800 font-medium border border-yellow-200 mt-6">
            <strong className="text-yellow-900">⚠️ Nota a tener en cuenta:</strong>
            <p className="mt-2 text-sm">
              Aunque este código es la forma "pura" de crear un servidor, en el mundo real, casi nunca lo harás de esta manera. En la siguiente sección (Express.js), veremos cómo frameworks como Express automatizan y simplifican enormemente toda esta lógica de enrutamiento y cabeceras, permitiéndote escribir menos código para obtener el mismo resultado.
            </p>
          </div>
        </section>
      <section className="rounded-2xl p-6 bg-light border border-light">
        <h3 className="text-xl font-semibold text-secondary">4) ¿QUÉ ES JSON?</h3>
        <p className="mt-2">
          <strong>JSON</strong> significa <em>JavaScript Object Notation</em>. Es una forma de escribir datos como texto
          que entienden casi todos los lenguajes. Se parece a los objetos de JS, pero con reglas:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Las <strong>claves</strong> van entre comillas dobles.</li>
          <li>Las <strong>cadenas</strong> (textos) van entre comillas dobles.</li>
          <li>Se pueden anidar objetos y arrays.</li>
        </ul>

        <div className="bg-white p-4 rounded-xl shadow mt-3">
          <pre className="overflow-x-auto text-sm"><code>{`{
  "ok": true,
  "mensaje": "Hola desde el servidor",
  "numeros": [1, 2, 3],
  "usuario": { "id": 7, "nombre": "Ada" }
}`}</code></pre>
        </div>

        <div className="mt-4 bg-white p-4 rounded-xl shadow">
          <h4 className="font-semibold mb-1">💡 ¿Por qué JSON es clave entre front y back?</h4>
          <ul className="list-disc pl-6 space-y-1 text-secondary/90">
            <li>Es <strong>texto</strong>: viaja fácil por la red.</li>
            <li>Es <strong>universal</strong>: cualquier lenguaje lo entiende.</li>
            <li>En el front, se convierte en objeto JS con <code>response.json()</code> y ya puedes dibujarlo en React.</li>
          </ul>
        </div>

        <div className="mt-4 bg-white p-4 rounded-xl shadow">
          <h4 className="font-semibold mb-1">❓¿JSON sustituye a SQL o a una base de datos?</h4>
          <p className="text-secondary/90">
            No. <strong>JSON es un formato</strong> para enviar/recibir datos. <strong>SQL/BD</strong> es dónde
            guardas esos datos de manera persistente. Cuando tengas base de datos, el servidor leerá de SQL, pero seguirá
            respondiendo al front en <strong>JSON</strong>. Es decir: BD ⟶ (back) ⟶ JSON ⟶ (front).
          </p>
        </div>
      </section>

      
     {/* PASO 5: MINI API QUE DEVUELVE JSON (con /api/hora) */}
<section className="rounded-2xl p-6 bg-white shadow border border-light">
  <h3 className="text-xl font-semibold text-secondary">5) Tu primera mini API que devuelve JSON</h3>
  <p className="mt-2">
    Vamos a crear un pequeño servidor HTTP con Node que expone dos rutas:
    <code> /api/saludo</code> y <code> /api/hora</code>. Responderá en <strong>JSON</strong>.
  </p>

  <div className="bg-light p-4 rounded-xl mt-3">
    <pre className="overflow-x-auto text-sm"><code>{`// back/api.js
const http = require('node:http');

const server = http.createServer((req, res) => {
  // Cabeceras: CORS y tipo de respuesta JSON
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // GET /api/saludo
  if (req.url === '/api/saludo' && req.method === 'GET') {
    const data = { ok: true, mensaje: 'Hola desde Node API 👋', modulo: 'UF1844' };
    res.writeHead(200);
    return res.end(JSON.stringify(data)); // objeto JS → texto JSON
  }

  // GET /api/hora
  if (req.url === '/api/hora' && req.method === 'GET') {
    const ahora = new Date();
    const hh = String(ahora.getHours()).padStart(2, '0');
    const mm = String(ahora.getMinutes()).padStart(2, '0');
    res.writeHead(200);
    return res.end(JSON.stringify({ ok: true, hora: \`\${hh}:\${mm}\` }));
  }

  // Cualquier otra ruta
  res.writeHead(404);
  res.end(JSON.stringify({ ok: false, error: 'No encontrado' }));
});

// Puerto 3000
server.listen(3000, () => {
  console.log('✅ API en http://localhost:3000 (GET /api/saludo, /api/hora)');
});`}</code></pre>
  </div>

  <div className="mt-4 bg-accent/10 p-4 rounded-xl border border-accent/20">
    <h4 className="font-semibold text-accent">Cómo probarlo (paso a paso)</h4>
    <ol className="list-decimal pl-5 text-secondary/90 space-y-1 mt-2">
      <li>Crea la carpeta <code>playground/back</code> y guarda el archivo como <code>api.js</code>.</li>
      <li>En la terminal: <code>cd playground/back</code> y ejecuta <code>node api.js</code>.</li>
      <li>Abre <code>http://localhost:3000/api/saludo</code> y <code>http://localhost:3000/api/hora</code> en el navegador.</li>
      <li>Deberías ver JSON en las dos rutas → ✅</li>
    </ol>
  </div>

  <details className="mt-3 bg-white rounded-xl p-4 border">
    <summary className="cursor-pointer font-medium">🐞 Errores típicos y solución</summary>
    <ul className="mt-2 list-disc pl-6 text-sm space-y-1">
      <li><strong>“address already in use :3000”</strong> → ya hay algo usando el puerto. Cierra la app o usa 3001.</li>
      <li><strong>Salida rara en el navegador</strong> → revisa que pones <code>JSON.stringify(obj)</code> al responder.</li>
      <li><strong>El front no puede pedir</strong> → asegúrate de tener la cabecera CORS <code>Access-Control-Allow-Origin: *</code>.</li>
      <li><strong>Problemas con fetch</strong> → revisa la consola del navegador para errores de CORS o de red.</li>
      <li><strong>¿Qué es Cors?</strong> CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad del navegador que controla qué sitios web pueden comunicarse con un servidor situado en un dominio diferente, evitando accesos no autorizados entre orígenes distintos.</li>
    </ul>
  </details>
</section>
<ConexionFrontBack />

  {/* 3) Qué debemos recordar */}
    <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
      <h4 className="font-semibold text-accent">3) Ideas que debes llevarte</h4>
      <ul className="list-disc pl-5 space-y-1 text-secondary/90 mt-2">
        <li><strong>Script</strong>: archivo que ejecutas con Node desde la <em>terminal</em>.</li>
        <li><strong>Servidor</strong>: programa que recibe peticiones en un <em>puerto</em> y responde.</li>
        <li><strong>Ruta/endpoint</strong>: el “camino” de la petición (<code>/api/saludo</code>).</li>
        <li><strong>JSON</strong>: el “idioma común” entre front y back (texto que el front convierte a objeto).</li>
        <li><strong>CORS</strong>: cabecera para permitir que tu front pida datos al back en local.</li>
      </ul>
    </div>
    <ul className="list-disc pl-5 text-slate-600 space-y-3">
      <li><strong>El Ciclo de Petición/Respuesta:</strong> Comprendes que todo servidor opera sobre un par (req, res). Tu código solo tiene que leer la petición y escribir la respuesta.</li>
      <li><strong>HTTP y Códigos de Estado:</strong> Aprendes a usar los códigos de estado (200, 404, 500) para comunicar el resultado de una operación.</li>
      <li><strong>Bases de JSON:</strong> Refuerza la necesidad de transformar datos de JavaScript a un formato estándar (JSON.stringify) para que puedan viajar por la red.</li>
    </ul>
{/* RESUMEN DE LA PRÁCTICA */}
<section className="rounded-2xl p-6 bg-white shadow border border-light">
  <header className="mb-3">
    <h3 className="text-2xl font-semibold text-secondary">🧾 Resumen: ¿Qué hemos hecho y por qué?</h3>
    <p className="text-secondary/70">Del cero absoluto a pedir datos reales desde un front a un back hecho con Node.</p>
  </header>

  {/* 1) Qué construimos */}
  <div className="grid md:grid-cols-2 gap-4">
    <div className="p-4 rounded-xl bg-light border border-light">
      <h4 className="font-semibold">1) Construimos</h4>
      <ul className="list-disc pl-5 space-y-1 text-secondary/90 mt-2">
        <li>Un <strong>script</strong> de Node (<code>hola.js</code>) y uno con <strong>argumentos</strong> (<code>saluda.js</code>).</li>
        <li>Un <strong>servidor HTTP</strong> básico (<code>back/api.js</code>) que escucha en el <strong>puerto 3000</strong>.</li>
        <li>Dos <strong>endpoints</strong> que devuelven <strong>JSON</strong>: <code>/api/saludo</code> y <code>/api/hora</code>.</li>
        <li>Un <strong>front</strong> mínimo (<code>front/index.html</code>) que usa <code>fetch()</code> para leer esos JSON.</li>
      </ul>
    </div>

    {/* 2) Diagrama mental */}
    <div className="p-4 rounded-xl bg-light border border-light">
      <h4 className="font-semibold">2) Mapa mental (cómo fluye la info)</h4>
      <pre className="mt-2 text-sm bg-white p-3 rounded-lg border overflow-x-auto">{`Front (navegador)
    | fetch('http://localhost:3000/api/saludo')
    v
Back (Node/HTTP) -----> Responde JSON (texto)
    ^
    | lee hora/saludo (lógica simple por ahora, luego BD)
`}</pre>
      <p className="text-secondary/80 mt-2">
        Clave: el <strong>formato de intercambio</strong> entre front y back es <strong>JSON</strong>. 
        Más adelante el back leerá de una <strong>BD SQL</strong>, pero seguirá enviando JSON al front.
      </p>
    </div>
  </div>

  {/* 3) Qué debemos recordar */}
  <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
    <h4 className="font-semibold text-accent">3) Ideas que debes llevarte</h4>
    <ul className="list-disc pl-5 space-y-1 text-secondary/90 mt-2">
      <li><strong>Script</strong>: archivo que ejecutas con Node desde la <em>terminal</em>.</li>
      <li><strong>Servidor</strong>: programa que recibe peticiones en un <em>puerto</em> y responde.</li>
      <li><strong>Ruta/endpoint</strong>: el “camino” de la petición (<code>/api/saludo</code>).</li>
      <li><strong>JSON</strong>: el “idioma común” entre front y back (texto que el front convierte a objeto).</li>
      <li><strong>CORS</strong>: cabecera para permitir que tu front pida datos al back en local.</li>
    </ul>
  </div>


</section>



      {/* CIERRE */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold">📌 Hoy hemos aprendido</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Qué es un script y cómo ejecutarlo en la terminal.</li>
          <li>Qué es un servidor HTTP, una ruta y un puerto.</li>
          <li>Qué es JSON, por qué es el “idioma” entre front y back y que <strong>no sustituye</strong> a SQL: se complementan.</li>
          <li>Cómo levantar una mini API que responde JSON y cómo el front lo consume con <code>fetch()</code>.</li>
        </ul>
      </section>

      

      {/* NAVEGACIÓN */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link to="/mf0492/uf1844/instalacion" className="hover:underline text-primary font-medium">
          ← Lección anterior: Instalación y configuración
        </Link>
        <Link to="/mf0492/uf1844/modulos-dependencias" className="hover:underline text-primary font-medium">
          Siguiente: Módulos y dependencias →
        </Link>
      </footer>
    </article>
  );
}
