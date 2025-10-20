// ================================================
// 🧱 BLOQUE 4 - ARQUITECTURA POR CAPAS (UF1844)
// Archivo: ArquitecturaCapas.jsx
// ================================================

import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { motion } from "framer-motion";

// --- Mini componentes locales para no depender de shadcn/ui ---
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md border border-[#eee] ${className}`}>
      {children}
    </div>
  );
}
function CardContent({ children, className = "" }) {
  return <div className={`p-4 md:p-5 ${className}`}>{children}</div>;
}
// ----------------------------------------------------------------

export default function ArquitecturaPorCapas() {
  return (
    <main className="p-6 space-y-8 bg-[#f7f7f7] text-[#212121]">
      <header className="bg-gradient-to-r from-[#E44D26] to-[#F16529] text-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">🧱 Bloque 4 · Arquitectura por Capas</h1>
        <p className="text-lg opacity-90">
          UF1844 · Desarrollo de aplicaciones web en entorno servidor (Node.js + Express)
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">🎯 Objetivos</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Separar responsabilidades del backend para mantener el código limpio y escalable.</li>
          <li>Comprender la diferencia entre rutas, controladores, servicios y repositorios.</li>
          <li>Conectar una API con una base de datos simulada mediante archivos JSON.</li>
          <li>Aplicar el patrón MVC y la arquitectura por capas.</li>
          <li>Usar variables de entorno para configuración del servidor.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">📘 Contenidos mínimos</h2>
        <ul className="list-disc list-inside">
          <li>Diferencias entre rutas, controladores, servicios y repositorios.</li>
          <li>Conexión a una base de datos simulada (JSON o en memoria).</li>
          <li>Patrón MVC vs Arquitectura por Capas.</li>
          <li>Variables de configuración: puerto, baseURL, y claves.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">🧩 Estructura del proyecto</h2>

        <CodeBlock
          text={`arquitectura-por-capas/
│
├─ server.js
├─ .env
├─ package.json
│
├─ routes/
│   └─ productRoutes.js
├─ controllers/
│   └─ productController.js
├─ services/
│   └─ productService.js
├─ data/
│   └─ productRepository.js
└─ db/
    └─ products.json`}
          language="bash"
          theme={dracula}
        />

        <p className="bg-white p-4 rounded-xl shadow-sm">
          Esta estructura divide la aplicación en <strong>capas independientes</strong>. Cada una tiene una función específica:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li><strong>Rutas:</strong> reciben las peticiones HTTP y las redirigen al controlador adecuado.</li>
          <li><strong>Controladores:</strong> interpretan la petición y usan los servicios para resolverla.</li>
          <li><strong>Servicios:</strong> contienen la lógica de negocio y validaciones.</li>
          <li><strong>Repositorio:</strong> gestiona el acceso a los datos (lectura/escritura de JSON).</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">⚙️ Ejemplo de servidor</h2>
        <p>Servidor Express con arquitectura por capas y base JSON simulada.</p>

        <Card>
          <CardContent>
            <CodeBlock
              language="javascript"
              theme={dracula}
              text={`// server.js
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

app.listen(PORT, () => console.log(\`Servidor en \${BASE_URL}\`));`}
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🧩 Capas de la aplicación</h2>

        <details className="bg-white p-4 rounded-xl shadow-sm">
          <summary className="font-semibold text-lg cursor-pointer">
            Rutas → Controladores → Servicios → Repositorios
          </summary>

          <div className="mt-3 space-y-6">
            <Card>
              <CardContent>
                <h3 className="font-semibold mb-2">routes/productRoutes.js</h3>
                <CodeBlock
                  language="javascript"
                  theme={dracula}
                  text={`import express from "express";
import { getAllProducts, createProduct } from "../controllers/productController.js";

const router = express.Router();
router.get("/", getAllProducts);
router.post("/", createProduct);
export default router;`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold mb-2">controllers/productController.js</h3>
                <CodeBlock
                  language="javascript"
                  theme={dracula}
                  text={`import * as productService from "../services/productService.js";

export function getAllProducts(req, res) {
  const data = productService.getAllProducts();
  res.json(data);
}

export function createProduct(req, res) {
  const nuevo = productService.createProduct(req.body);
  res.status(201).json(nuevo);
}`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold mb-2">services/productService.js</h3>
                <CodeBlock
                  language="javascript"
                  theme={dracula}
                  text={`import * as repo from "../data/productRepository.js";

export function getAllProducts() {
  return repo.getAll();
}

export function createProduct(data) {
  if (!data.name || !data.price) throw new Error("Faltan campos obligatorios");
  return repo.create(data);
}`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold mb-2">data/productRepository.js</h3>
                <CodeBlock
                  language="javascript"
                  theme={dracula}
                  text={`import fs from "fs";
const DB_FILE = "./db/products.json";

function readData() {
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");
  const raw = fs.readFileSync(DB_FILE);
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export function getAll() {
  return readData();
}

export function create(data) {
  const products = readData();
  const nuevo = { id: Date.now(), ...data };
  products.push(nuevo);
  writeData(products);
  return nuevo;
}`}
                />
              </CardContent>
            </Card>
          </div>
        </details>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">🌐 Comunicación con el Frontend</h2>
        <p>
          El frontend (React o HTML+JS) se comunica con la API usando <code>fetch()</code> y los endpoints REST definidos.
        </p>

        <Card>
          <CardContent>
            <CodeBlock
              language="javascript"
              theme={dracula}
              text={`// Ejemplo desde el cliente
async function cargarProductos() {
  const res = await fetch("http://localhost:3001/api/products");
  const data = await res.json();
  console.log("Productos:", data);
}

async function crearProducto() {
  await fetch("http://localhost:3001/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Pantalla LED", price: 120 })
  });
}`}
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">✅ Evaluación y ejercicios</h2>
        <ul className="list-decimal list-inside space-y-1">
          <li>Refactoriza un CRUD moviendo código a /routes, /controllers, /services y /data.</li>
          <li>Añade validaciones (evitar duplicados, precio &gt; 0).</li>
          <li>Documenta (comentarios) cómo viaja la petición desde el front hasta el repositorio.</li>
        </ul>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-4 rounded-2xl shadow-sm"
      >
        <h2 className="text-2xl font-semibold mb-2">🧠 Reflexión final</h2>
        <p>
          Separar por capas permite modificar o ampliar una parte sin romper las demás.
          Es el paso previo a frameworks como NestJS.
        </p>
      </motion.section>
    </main>
  );
}
