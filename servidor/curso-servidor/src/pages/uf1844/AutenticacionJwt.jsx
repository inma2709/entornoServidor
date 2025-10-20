// =======================================================
// 🔐 BLOQUE 3 — AUTENTICACIÓN Y AUTORIZACIÓN (UF1844)
// Archivo: AutenticacionJwt.jsx
// =======================================================

import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";

// --- Componente básico Card para estilo coherente ---
function Card({ children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 my-4">
      {children}
    </div>
  );
}

// =======================================================
// 💡 COMPONENTE PRINCIPAL
// =======================================================
export default function AutenticacionJwt() {
  return (
    <main className="p-6 bg-[#f7f7f7] text-[#212121] space-y-8">
      <header className="bg-gradient-to-r from-[#E44D26] to-[#F16529] text-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">
          🔐 Bloque 3 · Autenticación y Autorización (JWT)
        </h1>
        <p className="opacity-90">
          UF1844 · Desarrollo de aplicaciones web en entorno servidor (Node.js + Express)
        </p>
      </header>

      {/* Objetivos */}
      <section>
        <h2 className="text-2xl font-semibold">🎯 Objetivos</h2>
        <ul className="list-disc list-inside">
          <li>Proteger rutas en Express mediante autenticación JWT.</li>
          <li>Entender el proceso de registro, login y validación.</li>
          <li>Implementar un middleware que compruebe tokens.</li>
          <li>Simular una base de datos y roles de usuario.</li>
        </ul>
      </section>

      {/* Paso 1 */}
      <section>
        <h2 className="text-2xl font-semibold">🧩 Paso 1 · Preparar el entorno</h2>
        <p>
          Crea una nueva carpeta <code>leccion-jwt</code> y ejecuta los siguientes comandos para
          preparar tu proyecto Node.js:
        </p>

        <CodeBlock
          language="bash"
          theme={dracula}
          text={`mkdir leccion-jwt
cd leccion-jwt
npm init -y
npm install express bcrypt jsonwebtoken dotenv`}
        />

        <p>
          Luego crea un archivo <code>.env</code> para almacenar variables de entorno:
        </p>
        <CodeBlock
          language="bash"
          theme={dracula}
          text={`PORT=3000
JWT_SECRET=clave-secreta-supersegura`}
        />
      </section>

      {/* Paso 2 */}
      <section>
        <h2 className="text-2xl font-semibold">⚙️ Paso 2 · Configurar servidor básico</h2>
        <p>
          Crea el archivo <code>AutenticacionJwt.js</code> y añade el siguiente código para iniciar
          el servidor Express:
        </p>

        <Card>
          <CodeBlock
            language="javascript"
            theme={dracula}
            text={`import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Servidor activo en http://localhost:\${PORT}\`));`}
          />
        </Card>

        <p>
          Comprueba que funciona con <code>node AutenticacionJwt.js</code>. Deberías ver el mensaje
          en consola.
        </p>
      </section>

      {/* Paso 3 */}
      <section>
        <h2 className="text-2xl font-semibold">👤 Paso 3 · Registro de usuarios</h2>
        <p>
          Añade la ruta <code>/api/register</code> para registrar usuarios. Se valida que no esté
          duplicado y se cifra la contraseña con <strong>bcrypt</strong>.
        </p>

        <Card>
          <CodeBlock
            language="javascript"
            theme={dracula}
            text={`import bcrypt from "bcrypt";

const usuarios = [];

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "Faltan campos obligatorios" });

    const existe = usuarios.find((u) => u.username === username);
    if (existe) return res.status(400).json({ error: "Usuario ya registrado" });

    const hashed = await bcrypt.hash(password, 10);
    usuarios.push({ username, password: hashed, role: "user" });

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch {
    res.status(500).json({ error: "Error en el registro" });
  }
});`}
          />
        </Card>

        <p>
          📦 Prueba el endpoint en Thunder Client:
          <br />
          <code>POST http://localhost:3000/api/register</code>
        </p>
      </section>

      {/* Paso 4 */}
      <section>
        <h2 className="text-2xl font-semibold">🔑 Paso 4 · Login con generación de token</h2>
        <p>
          En el login, comprobamos la contraseña y devolvemos un token JWT firmado con nuestra
          clave secreta. Este token representa la sesión del usuario.
        </p>

        <Card>
          <CodeBlock
            language="javascript"
            theme={dracula}
            text={`import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "clave-secreta-supersegura";

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = usuarios.find((u) => u.username === username);

    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token });
  } catch {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});`}
          />
        </Card>

        <p>
          ✅ Si el login es correcto, recibirás un token como respuesta:
        </p>
        <CodeBlock
          language="json"
          theme={dracula}
          text={`{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}`}
        />
      </section>

      {/* Paso 5 */}
      <section>
        <h2 className="text-2xl font-semibold">🛡️ Paso 5 · Middleware de autenticación</h2>
        <p>
          Este middleware valida el token en cada petición. Si es válido, deja pasar al usuario.
        </p>

        <Card>
          <CodeBlock
            language="javascript"
            theme={dracula}
            text={`function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });
    req.user = user;
    next();
  });
}`}
          />
        </Card>

        <p>
          Agrega este middleware a las rutas que quieras proteger. Si el token no es válido, la
          ruta no responderá.
        </p>
      </section>

      {/* Paso 6 */}
      <section>
        <h2 className="text-2xl font-semibold">🔒 Paso 6 · Ruta protegida</h2>
        <p>
          Creamos la ruta <code>/api/perfil</code>, que solo responde si el usuario envía un token
          válido.
        </p>

        <Card>
          <CodeBlock
            language="javascript"
            theme={dracula}
            text={`app.get("/api/perfil", autenticarToken, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user
  });
});`}
          />
        </Card>

        <p>
          ⚡ Prueba en Thunder Client:
          <br />
          <code>GET http://localhost:3000/api/perfil</code>
          <br />
          Header: <code>Authorization: Bearer &lt;tu_token&gt;</code>
        </p>
      </section>

      {/* Validación */}
      <section>
        <h2 className="text-2xl font-semibold">🧠 Validación paso a paso</h2>

        <table className="w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Etapa</th>
              <th className="border px-2 py-1">Qué valida</th>
              <th className="border px-2 py-1">Respuesta esperada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Registro</td>
              <td className="border px-2 py-1">Campos obligatorios</td>
              <td className="border px-2 py-1">400 si faltan</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Registro</td>
              <td className="border px-2 py-1">Usuario duplicado</td>
              <td className="border px-2 py-1">400 si ya existe</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Login</td>
              <td className="border px-2 py-1">Usuario y contraseña</td>
              <td className="border px-2 py-1">401 si incorrectos</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Token</td>
              <td className="border px-2 py-1">Presencia y validez</td>
              <td className="border px-2 py-1">403 si caducado o falso</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Cierre */}
      <section className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">✅ Ejercicio final</h2>
        <ul className="list-decimal list-inside">
          <li>Crea el servidor completo siguiendo los pasos anteriores.</li>
          <li>Prueba las rutas <code>/api/register</code>, <code>/api/login</code> y <code>/api/perfil</code>.</li>
          <li>Agrega un campo “rol” al usuario y crea una ruta solo para administradores.</li>
          <li>Explica con tus palabras qué valida el middleware JWT.</li>
        </ul>
      </section>
    </main>
  );
}
