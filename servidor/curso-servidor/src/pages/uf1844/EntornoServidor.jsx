import { Link } from "react-router-dom";

// Sustitutos sencillos sin librerías externas:
function CardLite({ children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow ${className}`}>{children}</div>
  );
}
function Code({ children, className = "" }) {
  return (
    <pre className={`overflow-x-auto text-sm bg-slate-900 text-white p-4 rounded-xl shadow-inner ${className}`}>
      <code>{children}</code>
    </pre>
  );
}

export default function EntornoServidor() {
  return (
    <article className="space-y-10">
      {/* Encabezado */}
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          1. Introducción al entorno servidor
        </h2>
        <p className="text-secondary/70 mt-2">
          Qué es el entorno servidor · Frontend vs Backend · Por qué Node.js
        </p>
      </header>

      {/* ¿Qué es un Servidor? */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          Concepto Clave: ¿Qué es un Servidor? 💻
        </h3>
        <p className="leading-relaxed mb-4">
          Un <strong>servidor</strong> es como un restaurante que atiende a sus clientes.
          En términos informáticos, es un programa o computadora que proporciona servicios
          (como páginas web, datos, archivos) a otros programas llamados <strong>clientes</strong>
          (como tu navegador web, una aplicación móvil, etc.).
        </p>

        <div className="bg-light/50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-primary mb-2">Analogía del Restaurante 🍽️</h4>
          <p className="text-sm">
            Imagina que el servidor es un restaurante: los clientes (navegadores) hacen pedidos (peticiones HTTP),
            el chef (servidor) prepara la comida (procesa la información) y el camarero entrega el plato
            (envía la respuesta) de vuelta al cliente.
          </p>
        </div>

        <div className="mt-4 p-4 bg-light rounded-lg border-l-4 border-primary">
          <p className="font-semibold text-primary mb-2">El Ciclo de Vida de una Petición Servidor</p>
          <ul className="list-disc pl-6 text-sm mt-1 space-y-2">
            <li>
              <strong>1. Recibe peticiones:</strong> El servidor está “escuchando” constantemente
              las solicitudes del cliente (por ejemplo, cuando escribes una URL en tu navegador
              y presionas Enter, estás haciendo una petición HTTP GET).
            </li>
            <li>
              <strong>2. Procesa lógica:</strong> Ejecuta el código necesario para responder
              (puede consultar una base de datos, validar información, realizar cálculos, etc.).
            </li>
            <li>
              <strong>3. Responde:</strong> Envía el resultado al cliente, generalmente en formato
              JSON (para APIs) o HTML (para páginas web).
            </li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-primary/10 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">¿Qué es una Petición HTTP? 📡</h4>
          <p className="text-sm mb-2">
            <strong>HTTP</strong> (HyperText Transfer Protocol) es el “idioma” que usan los navegadores
            y servidores para comunicarse. Es como el protocolo de cortesía en una conversación.
          </p>
          <div className="text-sm">
            <strong>Ejemplos de peticiones HTTP:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li><strong>GET:</strong> “Por favor, dame la página principal” (como abrir una web)</li>
              <li><strong>POST:</strong> “Aquí tienes mis datos para registrarme” (como enviar un formulario)</li>
              <li><strong>PUT:</strong> “Actualiza mi perfil con esta información”</li>
              <li><strong>DELETE:</strong> “Elimina esta publicación”</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Frontend vs Backend */}
      <section className="bg-light p-6 rounded-2xl border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          Frontend vs. Backend: Separación de Responsabilidades ☯️
        </h3>
        <p className="leading-relaxed mb-4">
          Una aplicación web moderna se divide en estas dos capas con responsabilidades claras.
          Piensa en una tienda: el <strong>frontend</strong> es la parte visible (el escaparate, la decoración,
          los productos expuestos) y el <strong>backend</strong> es todo lo que no ves pero que hace que funcione
          (el almacén, la contabilidad, los proveedores).
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-inner">
            <thead>
              <tr className="bg-primary/10 text-primary">
                <th className="px-4 py-2 text-left">Aspecto</th>
                <th className="px-4 py-2 text-left">Frontend (Lado del Cliente)</th>
                <th className="px-4 py-2 text-left">Backend (Lado del Servidor)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-light">
                <td className="px-4 py-2 font-medium">¿Qué es?</td>
                <td className="px-4 py-2">La parte visual e interactiva que ve el usuario</td>
                <td className="px-4 py-2">La lógica y datos que no ve el usuario</td>
              </tr>
              <tr className="border-b border-light">
                <td className="px-4 py-2 font-medium">Responsabilidad</td>
                <td className="px-4 py-2">Interfaz de usuario, experiencia visual, interacciones</td>
                <td className="px-4 py-2">Lógica de negocio, gestión de datos, seguridad</td>
              </tr>
              <tr className="border-b border-light">
                <td className="px-4 py-2 font-medium">Tecnologías</td>
                <td className="px-4 py-2">HTML, CSS, JavaScript, React, Vue, Angular</td>
                <td className="px-4 py-2">Node.js, Python, Java, PHP, Bases de Datos</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">¿Dónde se ejecuta?</td>
                <td className="px-4 py-2">En el navegador del usuario (su computadora)</td>
                <td className="px-4 py-2">En el servidor (computadora remota)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-accent/10 rounded-lg">
          <h4 className="font-semibold text-accent mb-2">Ejemplo práctico: Netflix 🎬</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Frontend:</strong> La interfaz que ves (botones, menús, reproductor de video)</li>
            <li><strong>Backend:</strong> Los servidores que guardan las películas, tu historial, recomendaciones, etc.</li>
          </ul>
        </div>
      </section>

      {/* ¿Qué es Node.js? */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          ¿Qué es Node.js? 🚀
        </h3>
        <p className="leading-relaxed mb-3">
          <strong>Node.js</strong> es un entorno de ejecución que permite usar{" "}
          <strong>JavaScript en el lado del servidor</strong>. Antes de Node.js, JavaScript
          solo podía ejecutarse en el navegador (frontend); gracias a Node.js,
          ahora puede ejecutarse también en la parte del servidor (backend).
        </p>

        <div className="bg-light/50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-primary mb-2">Historia rápida 📚</h4>
          <p className="text-sm">
            Fue creado en 2009 por <strong>Ryan Dahl</strong> y se basa en el{" "}
            <strong>motor V8 de Google Chrome</strong> (el mismo que hace que JavaScript
            sea súper rápido en Chrome). Node.js es <em>multiplataforma</em> (funciona en
            Windows, Mac, Linux) y <em>open source</em> (código abierto y gratuito).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">✅ ¿Qué puedes hacer con Node.js?</h4>
            <ul className="text-sm space-y-1">
              <li>• Crear servidores web y APIs</li>
              <li>• Aplicaciones de tiempo real (chats, juegos)</li>
              <li>• Herramientas de línea de comandos</li>
              <li>• Aplicaciones de escritorio (con Electron)</li>
              <li>• Microservicios y aplicaciones de red</li>
            </ul>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <h4 className="font-semibold text-accent mb-2">⚡ Características clave</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Asíncrono:</strong> No se bloquea esperando</li>
              <li>• <strong>Un solo lenguaje:</strong> JavaScript en todo</li>
              <li>• <strong>Rápido:</strong> Motor V8 de Google</li>
              <li>• <strong>NPM:</strong> Millones de paquetes disponibles</li>
              <li>• <strong>Comunidad:</strong> Muy activa y con soporte</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ventajas de Node.js */}
      <section className="bg-light p-6 rounded-2xl border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          ¿Por qué usar Node.js para el Desarrollo Web? 🎯
        </h3>
        <p className="leading-relaxed mb-4">
          Node.js se ha convertido en una de las tecnologías más utilizadas en
          el desarrollo web moderno. Estas son sus principales ventajas:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CardLite>
              <h4 className="font-semibold text-primary mb-2">1. 🎯 Un solo lenguaje</h4>
              <p className="text-sm">
                Puedes desarrollar toda tu aplicación (frontend y backend) en JavaScript.
                Esto significa menos cosas que aprender y equipos más eficientes.
              </p>
            </CardLite>
            <CardLite>
              <h4 className="font-semibold text-primary mb-2">2. ⚡ Velocidad y escalabilidad</h4>
              <p className="text-sm">
                Gracias al motor V8 y al modelo asíncrono, puede manejar miles de
                peticiones simultáneas sin crear nuevos hilos del sistema.
              </p>
            </CardLite>
            <CardLite>
              <h4 className="font-semibold text-primary mb-2">3. 📦 NPM - El ecosistema más grande</h4>
              <p className="text-sm">
                Node Package Manager incluye millones de librerías (módulos) listas
                para usar. ¿Necesitas enviar emails? Hay un paquete. ¿Procesar imágenes? También.
              </p>
            </CardLite>
          </div>
          <div className="space-y-4">
            <CardLite>
              <h4 className="font-semibold text-primary mb-2">4. 💼 Demanda laboral</h4>
              <p className="text-sm">
                Es una de las tecnologías backend más demandadas en la industria.
                Empresas como Netflix, Uber, LinkedIn la usan.
              </p>
            </CardLite>
            <CardLite>
              <h4 className="font-semibold text-primary mb-2">5. 👥 Comunidad activa</h4>
              <p className="text-sm">
                Miles de desarrolladores contribuyen constantemente con nuevas
                herramientas, tutoriales y soporte.
              </p>
            </CardLite>
            <CardLite>
              <h4 className="font-semibold text-primary mb-2">6. 🔄 Desarrollo rápido</h4>
              <p className="text-sm">
                Prototipa y desarrolla aplicaciones rápidamente gracias a su
                sintaxis familiar y herramientas como npm.
              </p>
            </CardLite>
          </div>
        </div>
      </section>

      {/* Arquitectura de Node.js */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          Arquitectura de Node.js: ¿Por qué es tan rápido? 🏗️
        </h3>
        <p className="leading-relaxed mb-4">
          La clave del rendimiento de Node.js radica en su arquitectura
          asíncrona y basada en eventos. A diferencia de otros entornos que
          crean un nuevo hilo para cada conexión (lo que consume muchos
          recursos), Node.js utiliza un solo hilo con un bucle de eventos que
          maneja múltiples conexiones de forma eficiente.
        </p>

        <div className="bg-light/50 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-3">El Event Loop (Bucle de Eventos) ⚙️</h4>
          <p className="text-sm mb-3">
            Node.js utiliza un bucle de eventos (event loop) que gestiona todas las operaciones de forma asíncrona.
            En lugar de crear un hilo por cada cliente (modelo bloqueante), Node usa un solo hilo
            que escucha eventos y ejecuta callbacks cuando las tareas de I/O terminan.
          </p>
          <p className="text-sm">
            Esto permite manejar miles de conexiones simultáneas con muy pocos recursos. Ideal para{" "}
            <em>chats, APIs REST, streaming y aplicaciones en tiempo real</em>.
          </p>
        </div>
      </section>

      {/* Explicación de Asíncrono */}
      <section className="bg-light p-6 rounded-2xl border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          ¿Qué significa Asíncrono? Analogía del Café ☕
        </h3>
        <p className="leading-relaxed mb-4">
          Entender qué significa <strong>asíncrono</strong> explica por qué Node.js es tan popular en backend.
          Aquí tienes una analogía de la vida real.
        </p>

        <h4 className="text-lg font-semibold text-primary mb-3">La diferencia entre Síncrono y Asíncrono</h4>
        <p className="leading-relaxed mb-4">
          <strong>Síncrono</strong> significa “en secuencia”; <strong>Asíncrono</strong>, “fuera de secuencia”.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <h5 className="font-semibold text-red-700 mb-2">☕ Cafetería Síncrona (Problemática)</h5>
            <p className="text-sm mb-2">Imagina una cafetería con un solo barista (el hilo principal):</p>
            <ul className="list-disc pl-4 text-sm space-y-1 mb-2">
              <li>Cliente 1 pide un café latte complejo (5 minutos)</li>
              <li>El barista NO puede atender a nadie más hasta terminar</li>
              <li>Clientes 2, 3, 4… esperan en cola</li>
              <li>Todos están frustrados</li>
            </ul>
            <p className="text-red-600 font-medium text-sm">❌ Una tarea lenta bloquea todo</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h5 className="font-semibold text-green-700 mb-2">☕ Cafetería Asíncrona (Node.js)</h5>
            <p className="text-sm mb-2">La misma cafetería pero con sistema de tickets:</p>
            <ul className="list-disc pl-4 text-sm space-y-1 mb-2">
              <li>Ticket → preparo → te llamo</li>
              <li>Mientras, atiendo a otros</li>
            </ul>
            <p className="text-green-600 font-medium text-sm">✅ Múltiples tareas sin bloqueos</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
          <h4 className="text-lg font-semibold text-primary mb-2">¿Cómo se aplica esto a Node.js?</h4>
          <p className="text-sm mb-3">
            Node.js maneja muchas peticiones con un solo hilo, usando callbacks, promesas y <code>async/await</code>.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white rounded-lg">
              <thead>
                <tr className="bg-primary/20">
                  <th className="px-3 py-2 text-left">Operación Lenta</th>
                  <th className="px-3 py-2 text-left">Cómo lo maneja Node.js</th>
                  <th className="px-3 py-2 text-left">Herramienta</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2">Consultar Base de Datos (1 seg)</td>
                  <td className="px-3 py-2">Envía consulta y sigue atendiendo otras peticiones</td>
                  <td className="px-3 py-2"><code className="bg-light px-1 rounded">await</code></td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2">Leer archivo grande</td>
                  <td className="px-3 py-2">Pide el archivo y ejecuta cuando termine</td>
                  <td className="px-3 py-2"><code className="bg-light px-1 rounded">callbacks</code></td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Llamada a API externa</td>
                  <td className="px-3 py-2">Hace la petición y espera sin bloquearse</td>
                  <td className="px-3 py-2"><code className="bg-light px-1 rounded">Promises</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Módulos nativos */}
      <section>
        <h2 className="text-2xl font-semibold">🧩 Ejemplo: módulo nativo</h2>
        <p>
          Node incluye muchos módulos integrados. Por ejemplo, el módulo <code>http</code> nos
          permite crear un servidor web sin instalar nada extra.
        </p>

        <CardLite className="mt-3">
          <Code>{`// Importamos el módulo HTTP nativo
const http = require('http');

// Creamos un servidor que responde "Hola mundo"
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola mundo desde Node.js');
});

// Escuchamos en el puerto 3000
server.listen(3000, () => console.log('Servidor en http://localhost:3000'));`}</Code>
        </CardLite>

        <p className="mt-2">
          👉 Aquí usamos <strong>require()</strong>, el método tradicional de Node.js para importar módulos.
        </p>
      </section>

      {/* CommonJS */}
      <section>
        <h2 className="text-2xl font-semibold">📜 CommonJS (require/export)</h2>
        <p>
          Durante muchos años, Node.js utilizó el sistema de módulos llamado{" "}
          <strong>CommonJS</strong>, que usa <code>require</code> y <code>module.exports</code>.
        </p>
        <CardLite className="mt-3">
          <Code>{`// archivo: matematicas.js
function sumar(a, b) {
  return a + b;
}

// Exportamos la función
module.exports = { sumar };

// archivo: app.js
const { sumar } = require('./matematicas');
console.log('La suma es:', sumar(3, 4));`}</Code>
        </CardLite>

        <p className="mt-2">
          ✅ Este formato sigue siendo compatible y se usa en muchos proyectos antiguos o cuando
          no se ha activado el modo <code>ESM</code> (módulos modernos).
        </p>
      </section>

      {/* ESModules */}
      <section>
        <h2 className="text-2xl font-semibold">🚀 Módulos modernos (ES Modules)</h2>
        <p>
          Desde la versión 14 de Node.js podemos usar <strong>ES Modules</strong>, el mismo
          sistema que utiliza JavaScript en el navegador.
        </p>
        <p>Para activarlo, añade esta línea en tu <code>package.json</code>:</p>

        <CardLite className="mt-3">
          <Code>{`{
  "type": "module"
}`}</Code>
        </CardLite>

        <CardLite className="mt-3">
          <Code>{`// archivo: matematicas.js
export function sumar(a, b) {
  return a + b;
}

// archivo: app.js
import { sumar } from './matematicas.js';
console.log('La suma es:', sumar(5, 7));`}</Code>
        </CardLite>

        <p className="mt-2">✨ Ventajas de los ES Modules:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Mismo formato que en frontend (React, Vue, etc.).</li>
          <li>Permite usar <code>top-level await</code>.</li>
          <li>Más compatible con herramientas modernas (Vite, Babel, TypeScript).</li>
        </ul>
      </section>

      {/* Tabla comparativa */}
      <section>
        <h2 className="text-2xl font-semibold">📊 Comparativa rápida</h2>

        <table className="w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Funcionalidad</th>
              <th className="border px-2 py-1">CommonJS</th>
              <th className="border px-2 py-1">ES Modules</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Importar módulo</td>
              <td className="border px-2 py-1">const x = require('x')</td>
              <td className="border px-2 py-1">import x from 'x'</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Exportar valores</td>
              <td className="border px-2 py-1">
                <code>module.exports = {'{...}'}</code>
              </td>
              <td className="border px-2 py-1">
                <code>export / export default</code>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Extensión requerida</td>
              <td className="border px-2 py-1">no (automática)</td>
              <td className="border px-2 py-1">sí (.js, .mjs)</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Archivo por defecto</td>
              <td className="border px-2 py-1">.js (CommonJS)</td>
              <td className="border px-2 py-1">.mjs o “type: module”</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Top-level await</td>
              <td className="border px-2 py-1">❌ No</td>
              <td className="border px-2 py-1">✅ Sí</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Ejercicio práctico */}
      <section className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">🧩 Ejercicio guiado</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Crea un archivo <code>operaciones.js</code> con funciones <code>sumar</code> y <code>restar</code>.</li>
          <li>Expórtalas con <code>export</code> (ESM) o <code>module.exports</code> (CJS).</li>
          <li>En <code>app.js</code>, impórtalas y muestra el resultado por consola.</li>
          <li>Cambia el formato del proyecto de CommonJS a ES Modules y observa la diferencia.</li>
        </ol>
      </section>

      {/* Conclusión */}
      <section className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">🧠 Reflexión final</h2>
        <p>
          Node.js permite organizar el código en módulos para hacerlo más limpio, escalable y reutilizable.
          Comprender la diferencia entre <strong>CommonJS</strong> y <strong>ES Modules</strong> es esencial para cualquier desarrollador backend moderno.
        </p>
      </section>

      {/* Ejemplo práctico de servidor */}
      <section className="bg-gradient-to-r from-primary/90 to-accent text-white p-6 rounded-2xl shadow-brand">
        <h3 className="text-2xl font-semibold mb-3">🧠 Tu primer Servidor HTTP con Node.js</h3>
        <p className="leading-relaxed mb-4">
          Vamos a crear tu primer servidor web. Sigue estos pasos y en 5 minutos tendrás tu propio servidor funcionando:
        </p>

        <div className="bg-white/10 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">📋 Pasos a seguir:</h4>
          <ol className="list-decimal pl-6 space-y-1 text-sm">
            <li>Abre Visual Studio Code</li>
            <li>Crea un archivo llamado <code className="bg-black/20 px-1 rounded">server.js</code></li>
            <li>Copia el código de abajo</li>
            <li>Abre la terminal integrada (Ctrl + `)</li>
            <li>Ejecuta: <code className="bg-black/20 px-1 rounded">node server.js</code></li>
            <li>Visita: <code className="bg-black/20 px-1 rounded">http://localhost:3000</code></li>
          </ol>
        </div>

        <div className="bg-black/40 p-4 rounded-xl mt-4">
          <Code>{`// Archivo: server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('¡Hola desde Node.js! 🚀\\nTu primer servidor está funcionando.');
});

server.listen(3000, () => {
  console.log('🌐 Servidor ejecutándose en http://localhost:3000');
  console.log('💡 Presiona Ctrl+C para detener el servidor');
});`}</Code>
        </div>

        <div className="mt-6 bg-white/20 rounded-xl p-4 border border-white/30">
          <h4 className="text-lg font-semibold mb-3">🔍 Explicación línea por línea</h4>
          <div className="space-y-3 text-sm">
            <div>
              <code className="bg-black/20 px-2 py-1 rounded">const http = require('http');</code>
              <p className="mt-1">
                <strong>Importa el módulo HTTP:</strong> Trae las herramientas necesarias para crear servidores web.
              </p>
            </div>

            <div>
              <code className="bg-black/20 px-2 py-1 rounded">const server = http.createServer((req, res) =&gt; &#123;...&#125;);</code>
              <p className="mt-1">
                <strong>Crea el servidor:</strong> Define qué hacer cuando alguien visite tu servidor.
                <br />• <strong>req</strong> = lo que pide el visitante
                <br />• <strong>res</strong> = lo que vas a responder
              </p>
              <p className="mt-1">
                Ten en cuenta que no es obligatorio para el sistema usar <code>req</code> y <code>res</code>, pero sí para construir una respuesta.
              </p>
            </div>

            <div>
              <code className="bg-black/20 px-2 py-1 rounded">res.writeHead(200, &#123;...&#125;);</code>
              <p className="mt-1">
                <strong>Configura la respuesta:</strong> Dice “todo bien” (200) y que envías texto en español (utf-8).
              </p>
            </div>

            <div>
              <code className="bg-black/20 px-2 py-1 rounded">res.end('¡Hola desde Node.js!');</code>
              <p className="mt-1">
                <strong>Envía la respuesta:</strong> Manda el mensaje al navegador y cierra la conexión.
              </p>
            </div>

            <div>
              <code className="bg-black/20 px-2 py-1 rounded">server.listen(3000, () =&gt; &#123;...&#125;);</code>
              <p className="mt-1">
                <strong>Arranca el servidor:</strong> “Escucha en el puerto 3000” y ejecuta la función cuando esté listo.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-black/10 rounded-lg">
            <p className="text-sm">
              <strong>💡 ¿Qué es un puerto?</strong> Es como la dirección de un apartamento. El 3000 es muy común en desarrollo.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-600/20 rounded-lg border border-green-400/30">
          <p className="font-semibold mb-1">🎉 ¡Felicidades!</p>
          <p className="text-sm">
            En apenas 8 líneas has creado tu primer servidor HTTP. En la siguiente lección verás Express.js para crear servidores más potentes y organizados.
          </p>
        </div>
      </section>

      {/* Recursos adicionales */}
      <section className="bg-light p-6 rounded-2xl border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          Recursos Adicionales 📚📺
        </h3>
        <p className="leading-relaxed mb-4">
          Para profundizar en estos conceptos, aquí tienes recursos adicionales:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <CardLite>
            <h4 className="font-semibold text-primary mb-2">📖 Documentación Oficial</h4>
            <ul className="text-sm space-y-1">
              <li>• <a href="https://nodejs.org/es/docs/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Documentación de Node.js</a></li>
              <li>• <a href="https://developer.mozilla.org/es/docs/Web/HTTP" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">HTTP en MDN</a></li>
            </ul>
          </CardLite>
          <CardLite>
            <h4 className="font-semibold text-primary mb-2">🛠️ Herramientas útiles</h4>
            <ul className="text-sm space-y-1">
              <li>• <a href="https://code.visualstudio.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Visual Studio Code</a></li>
              <li>• <a href="https://www.postman.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Postman (para probar APIs)</a></li>
            </ul>
          </CardLite>
        </div>

        <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/10">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/BA1-NU5edwQ"
            title="Introducción a Node.js: Guía para principiantes"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </section>

      {/* Navegación */}
      <footer className="flex justify-between text-sm text-secondary/80 pt-6 border-t border-light">
        <Link to="/mf0492/uf1844" className="hover:underline text-primary font-medium">
          ← Volver al índice UF1844
        </Link>
        <Link to="/mf0492/uf1844/instalacion" className="hover:underline text-primary font-medium">
          Siguiente: Instalación y configuración →
        </Link>
      </footer>
    </article>
  );
}
