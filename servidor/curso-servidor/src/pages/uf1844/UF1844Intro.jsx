import { Link } from "react-router-dom";

export default function UF1844Intro() {
  return (
    <section className="space-y-10">
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          UF1844 · Programación en entorno servidor
        </h2>
        <p className="max-w-2xl mx-auto mt-3 text-lg text-secondary/80">
          Node.js + Express · rutas, controladores, middleware, HTTP y primeras pruebas con cliente REST.
        </p>
      </header>
      
      <section className="mt-6 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
        <h3 className="text-xl font-semibold text-secondary mb-2">Qué se espera al finalizar</h3>
        <p className="text-secondary/80 mb-3">
          Breve resumen de las capacidades que adquirirás al completar la UF1844:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-secondary/80">
          <li>Instalar y configurar Node.js y npm en tu entorno de trabajo.</li>
          <li>Crear y ejecutar servidores HTTP básicos con Node (http.createServer) y con Express.</li>
          <li>Diseñar rutas, controladores y middleware para APIs REST.</li>
          <li>Gestionar asincronía (callbacks, Promesas, async/await) y operaciones de ficheros.</li>
          <li>Validar entradas, manejar errores y estructurar un proyecto servidor sencillo.</li>
          <li>Persistir datos básicos y consumir la API desde un cliente HTTP.</li>
        </ul>
      </section>
       🧭 ÍNDICE UF1844 
        <section id="indice" className="rounded-2xl p-6 bg-white shadow border border-light">
          <header className="mb-4 text-center">
            <h3 className="text-2xl font-semibold text-secondary">
          🧭 Índice de la lección · Introducción a Node.js
            </h3>
            <p className="text-secondary/70">En cada epígrafe encontrarás su página de desarrollo.</p>
          </header>

          <ol className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/entorno-servidor" className="font-medium text-primary hover:underline">
            1. Introducción al entorno servidor
          </Link>
          <p className="text-sm text-secondary/80">Qué es servidor · Frontend vs Backend · Por qué Node.js</p>
            </li>

            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/instalacion" className="font-medium text-primary hover:underline">
            2. Instalación y configuración inicial
          </Link>
          <p className="text-sm text-secondary/80">Instalar Node/npm · verificación · estructura mínima</p>
            </li>

            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/primeros-pasos" className="font-medium text-primary hover:underline">
            3. Primeros pasos con Node.js
          </Link>
          <p className="text-sm text-secondary/80">Scripts · console · módulos nativos</p>
            </li>

            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/modulos-dependencias" className="font-medium text-primary hover:underline">
            4. Módulos y gestión de dependencias
          </Link>
          <p className="text-sm text-secondary/80">CommonJS vs ESModules · npm · package.json</p>
            </li>

            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/asincronia" className="font-medium text-primary hover:underline">
            5. Programación asíncrona
          </Link>
          <p className="text-sm text-secondary/80">Callbacks · Promesas · async/await · fs</p>
            </li>
            <li className="p-4 rounded-xl bg-light ">
          <Link to="/mf0492/uf1844/servidor-node" className="font-medium text-primary hover:underline">
            6. Servidores web con Node.js
          </Link>
          <p className="text-sm text-secondary/80">Crear servidores HTTP con http.createServer · manejo de rutas y cabeceras · procesar peticiones y enviar respuestas · streaming y gestión de errores</p>
            </li>

            <li className="p-4 rounded-xl bg-light md:col-span-2 text-center">
          <Link to="/mf0492/uf1844/resumen-node" className="font-medium text-primary hover:underline block">
            6. Resumen: Fundamentos de Node.js (Checkpoint)
          </Link>
          <p className="text-sm text-secondary/80 text-center">Revisión de Node core, asincronía y http.createServer (base)</p>
            </li>

            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/express" className="font-medium text-primary hover:underline">
            7. Introducción a Express.js: framework
          </Link>
          <p className="text-sm text-secondary/80">Instalación/configuración · rutas · middleware · estáticos</p>
            </li>

            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/crud-express" className="font-medium text-primary hover:underline">
            8. CRUD básico con Express (en memoria)
          </Link>
          <p className="text-sm text-secondary/80">Mapeo HTTP (GET, POST, PUT, DELETE) y lógica sin BD</p>
            </li>

            <li className="p-4 rounded-xl bg-light">
          <Link to="/mf0492/uf1844/gestion-persistencia" className="font-medium text-primary hover:underline">
            9. Gestión de Datos y Persistencia
          </Link>
          <p className="text-sm text-secondary/80">Introducción a BD (SQL/NoSQL) · Transformación del CRUD con BD</p>
            </li>

            <li className="p-4 rounded-xl bg-light ">
          <Link to="/mf0492/uf1844/seguridad-proyecto" className="font-medium text-primary hover:underline">
            10. Seguridad, Buenas Prácticas y Proyecto Final
          </Link>
          <p className="text-sm text-secondary/80">Manejo de secretos (`.env`) · Validación · Estructura · Despliegue</p>
            </li>
          </ol>
        </section>

        {/* 🌟 INTRODUCCIÓN MOTIVADORA */}
<section className="rounded-2xl p-8 bg-gradient-to-r from-primary/90 to-accent text-white shadow-brand space-y-4">
  <h3 className="text-2xl font-semibold">🌍 Bienvenido/a al mundo del servidor</h3>
  <p className="text-white/90 leading-relaxed">
    En esta unidad formativa vas a cruzar la frontera del <strong>frontend</strong> hacia el 
    <strong> backend</strong>. Hasta ahora tus proyectos vivían en el navegador; ahora 
    aprenderás a construir la parte que <em>piensa, procesa y responde</em> desde el otro lado: 
    el <strong>servidor</strong>.
  </p>

  <p className="text-white/90 leading-relaxed">
    Empezaremos desde lo más básico —instalar y configurar <strong>Node.js</strong>—, y paso a paso 
    aprenderás a crear tu propio servidor, definir rutas, controlar peticiones y manejar datos.
    Usaremos el framework <strong>Express</strong> para hacer el desarrollo más limpio, rápido y profesional.
  </p>

  <p className="text-white/90 leading-relaxed">
    También descubrirás cómo funcionan las <strong>APIs REST</strong>, cómo enviar y recibir 
    información en formato <code>JSON</code>, y cómo estructurar un proyecto real con buenas 
    prácticas y código mantenible.
  </p>

  <div className="bg-white/15 p-4 rounded-xl mt-4">
    <h4 className="text-lg font-semibold mb-2">🎯 Al finalizar esta unidad serás capaz de:</h4>
    <ul className="list-disc pl-6 space-y-1 text-white/90">
      <li>Comprender la arquitectura cliente-servidor y su ciclo de vida.</li>
      <li>Crear un servidor Node.js y manejar peticiones HTTP.</li>
      <li>Construir rutas, controladores y middleware con Express.</li>
      <li>Validar datos, gestionar errores y trabajar con archivos JSON.</li>
      <li>Exponer una API funcional que pueda consumir cualquier aplicación web o móvil.</li>
    </ul>
  </div>

  <p className="text-white/90 leading-relaxed mt-4">
    En otras palabras, al terminar la UF1844 tendrás tu <strong>primer backend profesional </strong> 
    funcionando, capaz de comunicarse con tu frontend del módulo anterior. ¡Aquí es donde tus 
    proyectos se vuelven <strong>Full-Stack</strong>! 🚀
  </p>
</section>
    </section>
  );
}
