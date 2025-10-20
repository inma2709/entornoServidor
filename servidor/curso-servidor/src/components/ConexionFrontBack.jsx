
import { CodeBlock, dracula } from "react-code-blocks";

export default function ConexionFrontBack() {
  return (
    <article className="space-y-10">
      {/* Encabezado */}
      <header className="text-center">
        <h2 className="text-3xl font-semibold text-primary">
          🌐 Conexión entre Frontend y Backend
        </h2>
        <p className="text-secondary/70 mt-2">
          Cómo el navegador se comunica con el servidor · Peticiones HTTP · JSON como lenguaje común
        </p>
      </header>

      {/* Concepto general */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          💡 ¿Qué significa “conectar el front con el back”?
        </h3>
        <p className="leading-relaxed mb-4">
          En una aplicación web moderna, el <strong>frontend</strong> (la parte visible en el navegador)
          y el <strong>backend</strong> (el servidor en Node.js o Express) trabajan en equipo.
          El navegador muestra la interfaz, pero los datos reales —usuarios, mensajes, productos,
          registros de base de datos— se guardan en el servidor.
        </p>
        <p className="leading-relaxed mb-4">
          La conexión entre ambos se realiza a través del protocolo <strong>HTTP</strong>,
          el mismo que usan las páginas web normales.  
          El front envía una <strong>petición</strong> (por ejemplo: “dame la hora”) y el back responde
          con un <strong>mensaje JSON</strong> (“hora”: “12:45:10”).
        </p>

        <div className="friendly-box bg-gray-50 border-l-4 border-primary p-4">
          <strong>Piensa así:</strong>  
          El frontend “pregunta” y el backend “responde”.  
          Esa comunicación es continua y se hace mediante peticiones HTTP.
        </div>
      </section>

      {/* El ciclo petición / respuesta */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          🔄 El ciclo petición-respuesta
        </h3>
        <p className="leading-relaxed mb-4">
          Cada vez que una página necesita información (por ejemplo, la lista de productos o un saludo),
          el frontend hace una petición HTTP usando métodos como <code>GET</code> o <code>POST</code>.
          El servidor escucha en un puerto (por ejemplo, <code>3000</code>) y responde con un texto JSON.
        </p>

        <CodeBlock
          language="javascript"
          theme={dracula}
          text={`// Ejemplo de petición desde el FRONT:
fetch('http://localhost:3000/api/saludo')
  .then(resp => resp.json())      // Convierte la respuesta JSON en objeto JS
  .then(data => console.log('Mensaje del servidor:', data))
  .catch(err => console.error('Error:', err));`}
        />

        <p className="mt-4">
          En el backend, un servidor Node.js (con el módulo <code>http</code> o Express) tiene rutas como:
        </p>

        <CodeBlock
          language="javascript"
          theme={dracula}
          text={`// Ejemplo en el BACK (Node.js + Express)
app.get('/api/saludo', (req, res) => {
  res.json({ ok: true, mensaje: 'Hola desde el servidor 👋' });
});`}
        />

        <div className="bg-light p-4 rounded-xl border border-light mt-4">
          <strong>Resumen visual:</strong>
          <pre className="text-sm bg-white p-3 rounded-lg border mt-2 overflow-x-auto">{`Frontend (navegador)
    | fetch('http://localhost:3000/api/saludo')
    v
Servidor Node/Express -----> responde JSON
    ^
    | procesa datos, genera respuesta
`}</pre>
        </div>
      </section>

      {/* El papel del JSON */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">📦 JSON: el idioma común</h3>
        <p className="leading-relaxed mb-4">
          El formato <strong>JSON (JavaScript Object Notation)</strong> es el “idioma universal”
          con el que el backend y el frontend se entienden.  
          Es texto estructurado que puede convertirse fácilmente en objetos JavaScript.
        </p>

        <CodeBlock
          language="json"
          theme={dracula}
          text={`{
  "ok": true,
  "mensaje": "Hola desde el servidor 👋",
  "fecha": "2025-10-19T18:00:00Z"
}`}
        />

        <p className="mt-3">
          En el front, usamos <code>.json()</code> para transformar ese texto en un objeto:
        </p>

        <CodeBlock
          language="javascript"
          theme={dracula}
          text={`fetch('/api/saludo')
  .then(resp => resp.json())
  .then(data => console.log(data.mensaje)); // 'Hola desde el servidor 👋'`}
        />

        <div className="resumen bg-gray-50 border-l-4 border-yellow-400 p-4 mt-4">
          <strong>Importante:</strong> El back puede usar cualquier lenguaje (Node, Python, PHP...),
          pero el formato de intercambio casi siempre es <strong>JSON</strong>.
        </div>
      </section>

      {/* CORS y seguridad */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-2xl font-semibold text-secondary mb-3">🛡️ Seguridad: CORS</h3>
        <p className="leading-relaxed mb-4">
          Cuando el frontend y el backend no están en el mismo origen (por ejemplo,
          <code>localhost:5173</code> y <code>localhost:3000</code>), el navegador bloquea las peticiones
          por seguridad.  
          Este mecanismo se llama <strong>CORS (Cross-Origin Resource Sharing)</strong>.
        </p>
        <p>
          Para permitir la comunicación, el backend debe incluir una cabecera especial:
          <code>Access-Control-Allow-Origin</code>.  
          En Express, esto se soluciona fácilmente instalando el paquete <code>cors</code> y activándolo con
          <code>app.use(cors())</code>.
        </p>
      </section>

      {/* Cierre y repaso */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-primary to-accent text-white shadow-brand">
        <h3 className="text-xl font-semibold mb-2">📘 Resumen del flujo completo</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>El <strong>frontend</strong> pide datos usando <code>fetch()</code>.</li>
          <li>El <strong>backend</strong> recibe la petición, procesa la lógica y responde JSON.</li>
          <li>El <strong>formato JSON</strong> permite intercambiar información fácilmente.</li>
          <li>El navegador aplica políticas <strong>CORS</strong> para proteger al usuario.</li>
          <li>Con <code>app.use(cors())</code> el servidor autoriza esas peticiones.</li>
        </ul>

        <p className="mt-4 text-sm opacity-90">
          🌍 A partir de aquí, podrás conectar tu frontend React con APIs reales,
          bases de datos y autenticación segura.  
          ¡Tu aplicación ya está lista para comunicarse con el mundo!
        </p>
      </section>
    </article>
  );
}
