// components/SectionCors.jsx
import { CodeBlock, dracula } from "react-code-blocks";

export default function SectionCors() {
  return (
    <>
      {/* Encabezado corto de sección */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary">
          ️🔐 CORS: compartir recursos entre orígenes
        </h2>
        <p className="text-secondary/80 mt-2">
          Qué es, por qué falla en desarrollo y cómo configurarlo en Express.
        </p>
      </section>

      {/* Concepto */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-3">💡 ¿Qué es CORS?</h3>
        <p className="leading-relaxed mb-4">
          <strong>CORS</strong> (Cross-Origin Resource Sharing) es un mecanismo de seguridad del
          <em> navegador</em> que decide si permite que una web (origen A) haga peticiones a un servidor
          (origen B). Si el servidor no envía los encabezados adecuados, el navegador bloquea la respuesta.
        </p>
        <div className="friendly-box p-4 bg-gray-50 border-l-4 border-primary">
          <strong>Ejemplo:</strong> Frontend en <code>http://localhost:5173</code> (Vite/React) y backend en{" "}
          <code>http://localhost:3000</code> son <em>orígenes distintos</em>; necesitas CORS configurado.
        </div>
      </section>

      {/* Problemas comunes */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-3">⚠️ Problemas típicos</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            Error clásico:{" "}
            <code>
              Access to fetch at 'http://localhost:3000/api' from origin 'http://localhost:5173'
              has been blocked by CORS policy
            </code>
          </li>
          <li>El servidor no envía <code>Access-Control-Allow-Origin</code> y otros encabezados.</li>
          <li>Afecta a navegadores; en Postman normalmente no verás el error.</li>
          <li>Las peticiones <code>POST</code>/<code>PUT</code> fallan si hay preflight y no está permitido.</li>
        </ul>
      </section>

      {/* Solución Express básica */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-3">
          🧩 Configuración rápida en Express
        </h3>

        <p className="mb-2 font-medium">1) Instala el middleware:</p>
        <CodeBlock text={`npm install cors`} language="bash" theme={dracula} />

        <p className="mt-4 mb-2 font-medium">2) Actívalo para todas las rutas (ideal en desarrollo):</p>
        <CodeBlock
          language="javascript"
          theme={dracula}
          text={`// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());          // habilita CORS (permite cualquier origen)
app.use(express.json());  // body parser

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el servidor con CORS habilitado 🚀' });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));`}
        />
      </section>

      {/* Configuración selectiva / producción */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-3">⚙️ Modo seguro (selectivo)</h3>
        <p className="leading-relaxed mb-3">
          En producción limita qué origen puede acceder y qué métodos/headers están permitidos:
        </p>
        <CodeBlock
          language="javascript"
          theme={dracula}
          text={`const corsOptions = {
  origin: ['https://tu-frontend.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // si usas cookies/sesiones
};
app.use(cors(corsOptions));`}
        />
        <p className="mt-4 text-sm text-secondary/80">
          Tip: si usas <code>credentials:true</code>, el servidor debe responder con{" "}
          <code>Access-Control-Allow-Credentials: true</code> y <code>origin</code> no puede ser <code>*</code>;
          debe ser un origen concreto.
        </p>
      </section>

      {/* Ejemplo fetch desde React (opcional) */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-3">🧪 Probar desde React</h3>
        <CodeBlock
          language="javascript"
          theme={dracula}
          text={`// En un componente React
useEffect(() => {
  fetch('http://localhost:3000/api/saludo')
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error CORS:', err));
}, []);`}
        />
        <div className="resumen mt-4 p-4 bg-gray-50 border-l-4 border-yellow-400">
          <strong>Recuerda:</strong> Si ves el error CORS en consola, revisa que tu backend tenga
          <code> app.use(cors(...)) </code> bien configurado y que el <em>origen</em> del frontend esté permitido.
        </div>
      </section>

      {/* Repaso */}
      <section className="bg-white p-6 rounded-2xl shadow border border-light">
        <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-3">🧠 Repaso rápido</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>CORS es una política del navegador para proteger al usuario.</li>
          <li>En desarrollo, <code>app.use(cors())</code> simplifica mucho.</li>
          <li>En producción, limita <code>origin</code>, <code>methods</code>, <code>headers</code> y usa <code>credentials</code> solo si es necesario.</li>
        </ul>
      </section>
    </>
  );
}
