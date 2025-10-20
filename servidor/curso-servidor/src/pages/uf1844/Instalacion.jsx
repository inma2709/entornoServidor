import { Link } from "react-router-dom";

export default function Instalacion() {
  return (
    <article className="space-y-10">
      {/* ENCABEZADO */}
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          2. Instalación y configuración inicial
        </h2>
        <p className="text-secondary/70 mt-2">
          Node.js · npm · verificación del entorno · estructura mínima de proyecto
        </p>
      </header>

      {/* INTRODUCCIÓN */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          🌍 Preparando tu entorno de trabajo
        </h3>
        <p className="leading-relaxed">
          Antes de empezar a crear servidores y APIs, necesitamos instalar y
          configurar el entorno que usaremos durante toda la unidad. Node.js y su
          gestor de paquetes <strong>npm</strong> serán nuestras herramientas
          principales para ejecutar código en el servidor, instalar librerías y
          organizar proyectos.
        </p>

        <p className="mt-3 leading-relaxed">
          La instalación de Node.js es sencilla y multiplataforma (Windows, macOS
          o Linux). Además, incluye automáticamente <strong>npm</strong> (Node
          Package Manager), el sistema que usaremos para gestionar dependencias y
          frameworks como <code>Express</code>.
        </p>
      </section>

      {/* PASO 1: INSTALAR NODE */}
      <section className="bg-light p-6 rounded-2xl border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          1️⃣ Instalar Node.js LTS
        </h3>
        <p className="leading-relaxed">
          Dirígete a la página oficial{" "}
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            nodejs.org
          </a>{" "}
          y descarga la versión marcada como{" "}
          <strong>LTS (Long Term Support)</strong>. Esta es la más estable y
          recomendada para desarrollo profesional.
        </p>

        <p className="mt-3 leading-relaxed">
          Durante la instalación puedes dejar las opciones por defecto. El
          instalador añadirá Node.js y npm a las variables del sistema para que
          puedas ejecutarlos desde cualquier terminal.
        </p>

        <div className="bg-white p-4 rounded-xl shadow mt-4">
          <h4 className="font-semibold text-secondary mb-2">💡 Tip rápido:</h4>
          <ul className="list-disc pl-6 space-y-1 text-secondary/90">
            <li>
              En Windows puedes comprobar la instalación con{" "}
              <code>node -v</code> y <code>npm -v</code> desde PowerShell.
            </li>
            <li>
              En macOS o Linux, abre la Terminal y ejecuta los mismos comandos.
            </li>
          </ul>
        </div>

        <div className="bg-black text-white mt-4 rounded-xl p-4 overflow-x-auto">
          <pre className="text-sm">
            <code>{`$ node -v
v20.17.0

$ npm -v
10.5.2`}</code>
          </pre>
        </div>

        <p className="mt-2 text-sm text-secondary/80">
          Si ves las versiones, ¡todo está listo! 🚀
        </p>
      </section>

      {/* PASO 2: CREAR LA ESTRUCTURA */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          2️⃣ Estructura mínima del proyecto
        </h3>
        <p className="leading-relaxed">
          Vamos a crear la carpeta base donde alojaremos nuestro primer proyecto
          Node.js. La estructura mínima suele incluir los siguientes elementos:
        </p>

        <div className="bg-light p-4 rounded-xl mt-3 text-sm font-mono">
          <pre>
            <code>{`mi-proyecto/
├── src/
│   └── index.js
├── package.json
└── README.md`}</code>
          </pre>
        </div>
         <p className="mt-3 leading-relaxed">
          📁 <strong>src/</strong> contendrá el código fuente (servidores, rutas, etc.).  
          📄 <strong>index.js</strong> será el punto de entrada del programa.  
          📦 <strong>package.json</strong> almacenará la información del proyecto y sus dependencias.
        </p>

        <div className="bg-black text-white p-4 mt-4 rounded-xl overflow-x-auto">
          <pre className="text-sm">
            <code>{`# Crear una carpeta nueva
mkdir mi-proyecto
cd mi-proyecto

# Iniciar un nuevo proyecto Node.js
npm init -y

# Crear la carpeta src y el archivo principal
mkdir src
echo console.log("Hola desde Node.js") > src/index.js`}</code>
          </pre>
        </div>

        <p className="mt-3 leading-relaxed">
          El comando <code>npm init -y</code> crea automáticamente un{" "}
          <strong>package.json</strong> con valores por defecto. Más adelante lo
          editaremos para añadir dependencias como Express.
        </p>
      </section>
      <ul className="space-y-3">
  <li className="p-3 bg-light rounded-lg border-l-4 border-accent">
    <strong className="text-secondary">1. Organización (`mkdir`, `cd`):</strong> Crea y aísla el proyecto en su propio directorio. La organización es el primer paso hacia un código mantenible.
  </li>
  <li className="p-3 bg-light rounded-lg border-l-4 border-accent">
    <strong className="text-secondary">2. El ADN del Proyecto (`npm init -y`):</strong> Genera el archivo `package.json`. Este archivo es el manifiesto del proyecto; contiene metadatos, scripts de ejecución y, lo más importante, registrará *todas* las librerías externas (como Express) que instalemos. 
  </li>
  <li className="p-3 bg-light rounded-lg border-l-4 border-accent">
    <strong className="text-secondary">3. El Código Fuente (`mkdir src`, `echo ...`):</strong> Establece la convención `src/index.js`.
    <ul className="list-disc pl-6 text-sm mt-1 text-secondary/80">
      <li>`src`: Convención universal para el código principal.</li>
      <li>`index.js`: El punto de entrada principal, donde comienza la ejecución del servidor.</li>
    </ul>
  </li>
</ul>

<div className="bg-blue-100 p-4 rounded-xl text-blue-800 font-medium">
  💡 Conclusión: Con estos pasos, has movido tu foco del navegador (Frontend) al entorno de ejecución de Node.js (Backend), que se ejecuta en la terminal.
</div>
        <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-xl mt-6">
          <h4 className="font-semibold text-accent mb-2">🖥️ ¿Qué son los comandos shell?</h4>
          <p className="leading-relaxed mb-2">
            Los <strong>comandos shell</strong> son instrucciones que escribimos en la terminal (o consola) para interactuar directamente con el sistema operativo. Permiten crear carpetas, mover archivos, instalar programas y ejecutar scripts, entre muchas otras tareas.
          </p>
          <p className="leading-relaxed mb-2">
            Usar comandos shell es fundamental para desarrolladores, ya que agiliza el trabajo y permite automatizar procesos. Algunos de los comandos más utilizados son:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-secondary/90 mb-2">
            <li><code>mkdir</code>: crea una nueva carpeta.</li>
            <li><code>cd</code>: cambia de directorio.</li>
            <li><code>ls</code> (o <code>dir</code> en Windows): muestra el contenido de una carpeta.</li>
            <li><code>echo</code>: imprime texto o crea archivos con contenido.</li>
            <li><code>node</code>: ejecuta archivos JavaScript con Node.js.</li>
            <li><code>npm</code>: gestiona paquetes y dependencias de Node.js.</li>
          </ul>
          <h4 className="font-semibold text-accent mt-4 mb-2">📜 ¿Qué es un script?</h4>
          <p className="leading-relaxed">
            Un <strong>script</strong> es un archivo de texto que contiene una serie de instrucciones (código) que el sistema ejecuta de forma automática. En Node.js, los scripts suelen estar escritos en JavaScript y se ejecutan con el comando <code>node</code>. Los scripts permiten automatizar tareas y crear programas funcionales en el servidor.
          </p>
        </div>
      
            <section class="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                <h2 class="text-2xl font-bold text-slate-900 mb-2 text-center">3. Profundizando en NPM: El Gestor de Paquetes</h2>
                 <p class="text-slate-600 mb-6 text-center">
                    NPM (Node Package Manager) no es solo un comando, son dos cosas a la vez.
                </p>
                <div class="grid md:grid-cols-2 gap-6 mt-6">
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 class="text-lg font-semibold text-slate-800 mb-2">1. El Registro Público ☁️</h3>
                        <p class="text-slate-600">NPM es un enorme repositorio online (como una "App Store" para desarrolladores) que contiene millones de paquetes de código JavaScript listos para usar. Librerías como Express, React o herramientas de validación se descargan desde aquí.</p>
                    </div>
                     <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 class="text-lg font-semibold text-slate-800 mb-2">2. La Herramienta de Terminal 💻</h3>
                        <p class="text-slate-600">El comando `npm` que usas en la terminal es la herramienta cliente que te permite interactuar con ese registro: `npm install` para descargar paquetes, `npm init` para crear proyectos y `npm start` para ejecutar scripts.</p>
                    </div>
                </div>
                 <div class="mt-6 p-4 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 text-center font-medium">
                    <p><strong>Diferencia Clave:</strong> Node.js es el entorno que ejecuta el código. NPM es la herramienta que gestiona las librerías que ese código necesita.</p>
                </div>
            </section>

      {/* PASO 3: PROBAR EL ENTORNO */}
      <section className="bg-light p-6 rounded-2xl border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          3️⃣ Verificar que todo funciona
        </h3>
        <p className="leading-relaxed">
          Ahora ejecutaremos nuestro primer programa Node.js para confirmar que
          todo está configurado correctamente.
        </p>

        <div className="bg-black text-white mt-4 rounded-xl p-4 overflow-x-auto">
          <pre className="text-sm">
            <code>{`# Desde la raíz del proyecto
node src/index.js`}</code>
          </pre>
        </div>

        <p className="mt-3 leading-relaxed">
          Si ves el mensaje <strong>“Hola desde Node.js”</strong> en la consola,
          ¡enhorabuena! 🎉 Has ejecutado tu primer script de servidor.
        </p>
      </section>

      {/* CHECKLIST FINAL */}
      <section className="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-2xl shadow-brand">
        <h3 className="text-2xl font-semibold mb-3">✅ Checklist</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Instalé Node.js LTS correctamente.</li>
          <li>Verifiqué las versiones con <code>node -v</code> y <code>npm -v</code>.</li>
          <li>Creé la estructura del proyecto con <code>src/</code> e <code>index.js</code>.</li>
          <li>Ejecuté mi primer script Node.js con éxito.</li>
        </ul>
      </section>

      {/* NAVEGACIÓN ENTRE LECCIONES */}
      <footer className="flex justify-between text-sm text-secondary/80">
        <Link
          to="/mf0492/uf1844/entorno-servidor"
          className="hover:underline text-primary font-medium"
        >
          ← Lección anterior: Introducción al entorno servidor
        </Link>
        <Link
          to="/mf0492/uf1844/primeros-pasos"
          className="hover:underline text-primary font-medium"
        >
          Siguiente: Primeros pasos con Node.js →
        </Link>
      </footer>
    </article>
  );
}
