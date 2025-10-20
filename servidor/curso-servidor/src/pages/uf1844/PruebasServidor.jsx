// =======================================================
// 🧪 BLOQUE 5 — PRUEBAS BÁSICAS DE SERVIDOR (UF1844)
// Archivo: PruebasServidor.jsx
// =======================================================

import React from "react";

// Si usas shadcn/ui y framer-motion en tu proyecto, puedes importar sus componentes.
// Aquí lo dejamos simple para que sea plug&play sin dependencias extra.

const Code = ({ children }) => (
  <pre style={{
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    background: "#272822",
    color: "#f8f8f2",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "0.95rem",
    overflowX: "auto"
  }}>
    <code>{children}</code>
  </pre>
);

export default function PruebasServidor() {
  return (
    <main style={{ padding: "24px", background: "#f7f7f7", color: "#212121" }}>
      {/* Cabecera */}
      <header style={{
        background: "linear-gradient(90deg,#E44D26,#F16529)",
        color: "#fff",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0,0,0,.12)",
        marginBottom: "24px"
      }}>
        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800 }}>
          🧪 Bloque 5 · Pruebas básicas de servidor (Node.js + Express)
        </h1>
        <p style={{ margin: "6px 0 0", opacity: .95 }}>
          UF1844 · Validar endpoints y asegurar el correcto funcionamiento de la API con Vitest, Supertest y Swagger.
        </p>
      </header>

      {/* Objetivos */}
      <section style={card}>
        <h2 style={h2}>🎯 Objetivos</h2>
        <ul>
          <li>Diferenciar pruebas <strong>unitarias</strong> vs <strong>integradas</strong>.</li>
          <li>Configurar <strong>Vitest</strong> para Node/ESM.</li>
          <li>Probar <strong>servicios</strong> (lógica de negocio) y <strong>rutas</strong> (endpoints) con <strong>Supertest</strong>.</li>
          <li>Generar y servir una documentación mínima <strong>OpenAPI/Swagger</strong>.</li>
        </ul>
      </section>

      {/* Estructura de ejemplo (mini app de pruebas) */}
      <section style={card}>
        <h2 style={h2}>📁 Estructura propuesta (mini proyecto de pruebas)</h2>
        <Code>{`pruebas-servidor/
├─ package.json
├─ vitest.config.js
├─ app.js                  # Exporta 'app' (Express) sin .listen() → fácil de testear
├─ server.js               # Arranca el servidor en puerto
├─ services/
│   └─ cartService.js      # Función de negocio a testear (unit test)
├─ routes/
│   └─ productRoutes.js    # Endpoints CRUD (in-memory para tests)
├─ docs/
│   └─ swagger.json        # Definición mínima OpenAPI
└─ tests/
    ├─ cartService.test.js
    └─ products.routes.test.js`}</Code>
        <p style={{ marginTop: 12 }}>
          <strong>Nota docente:</strong> para aislar las pruebas, usamos una API mínima <em>in-memory</em>.
          En clase puedes conectar esto con la arquitectura por capas del Bloque 4 y/o apuntar a un JSON temporal por <code>process.env</code>.
        </p>
      </section>

      {/* Instalación */}
      <section style={card}>
        <h2 style={h2}>⚙️ Instalación de dependencias</h2>
        <Code>{`npm init -y
npm install express supertest swagger-ui-express
npm install -D vitest @vitest/ui`}</Code>
        <p>En <code>package.json</code> añade scripts:</p>
        <Code>{`{
  "type": "module",
  "scripts": {
    "dev": "node server.js",
    "test": "vitest run",
    "test:ui": "vitest --ui"
  }
}`}</Code>
        <p>Crea <code>vitest.config.js</code> sencillo:</p>
        <Code>{`// vitest.config.js
export default {
  test: { environment: "node" }
};`}</Code>
      </section>

      {/* app.js */}
      <section style={card}>
        <h2 style={h2}>🧩 app.js — Express listo para test</h2>
        <p>Exportamos <code>app</code> (sin <code>listen</code>) para que Supertest lo pueda usar directamente en memoria.</p>
        <Code>{`// app.js
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

export const app = express();
app.use(express.json());

// Rutas de productos (in-memory para las pruebas)
app.use("/api/products", productRoutes);

// Documentación OpenAPI mínima
const swaggerDoc = JSON.parse(fs.readFileSync("./docs/swagger.json", "utf8"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));`}</Code>
      </section>

      {/* server.js */}
      <section style={card}>
        <h2 style={h2}>🚀 server.js — Arranque local</h2>
        <Code>{`// server.js
import { app } from "./app.js";

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("Servidor de pruebas en http://localhost:" + PORT);
  console.log("Swagger UI en         http://localhost:" + PORT + "/docs");
});`}</Code>
      </section>

      {/* Servicio a testear */}
      <section style={card}>
        <h2 style={h2}>🧠 Prueba unitaria — Servicio de totales</h2>
        <p>Función de negocio: calcula el total con impuestos. Así distinguimos la lógica (servicios) de las rutas.</p>
        <details>
          <summary style={summary}>services/cartService.js</summary>
          <Code>{`// services/cartService.js
/**
 * Calcula el total de una lista de items con IVA (o impuesto) opcional.
 * @param {Array<{price:number, qty?:number}>} items
 * @param {number} tax porcentaje en [0..1], por defecto 0.21 (21%)
 * @returns {number}
 */
export function calcTotal(items = [], tax = 0.21) {
  const base = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.qty) || 1), 0);
  const total = base * (1 + (Number(tax) || 0));
  return Number(total.toFixed(2));
}`}</Code>
        </details>

        <details style={{ marginTop: 12 }}>
          <summary style={summary}>tests/cartService.test.js</summary>
          <Code>{`// tests/cartService.test.js
import { describe, it, expect } from "vitest";
import { calcTotal } from "../services/cartService.js";

describe("calcTotal", () => {
  it("suma precios * qty y aplica 21% por defecto", () => {
    const items = [{ price: 10, qty: 2 }, { price: 5, qty: 1 }];
    // base = 10*2 + 5*1 = 25; total con 21% = 30.25
    expect(calcTotal(items)).toBe(30.25);
  });

  it("funciona con tax personalizado", () => {
    const items = [{ price: 100, qty: 1 }];
    expect(calcTotal(items, 0.1)).toBe(110.00);
  });

  it("tolera datos incompletos o 0", () => {
    const items = [{ price: "5" }, { price: 0, qty: 3 }, {}];
    expect(calcTotal(items, 0)).toBe(5.00);
  });
});`}</Code>
        </details>
      </section>

      {/* Rutas + Supertest */}
      <section style={card}>
        <h2 style={h2}>🌐 Pruebas de endpoints — Supertest</h2>
        <p>
          Creamos rutas CRUD de productos en memoria para que las pruebas sean rápidas y deterministas.
          En clase, puedes apuntarlas a tu API del Bloque 4 (repositorio JSON) activando un modo <em>test</em>.
        </p>

        <details>
          <summary style={summary}>routes/productRoutes.js</summary>
          <Code>{`// routes/productRoutes.js
import { Router } from "express";

// Estado en memoria (se reinicia entre ejecuciones). En tests lo reiniciamos por test.
const state = { products: [] };
export function __reset(seed = []) { state.products = seed; }

const router = Router();

router.get("/", (req, res) => {
  res.json(state.products);
});

router.post("/", (req, res) => {
  const { name, price } = req.body || {};
  if (!name || price == null) return res.status(400).json({ error: "Faltan campos" });
  const nuevo = { id: Date.now(), name, price: Number(price) };
  state.products.push(nuevo);
  res.status(201).json(nuevo);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = state.products.find(p => p.id === id);
  if (!found) return res.status(404).json({ error: "No encontrado" });
  res.json(found);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = state.products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "No encontrado" });
  const { name, price } = req.body || {};
  state.products[idx] = { ...state.products[idx], ...(name && { name }), ...(price != null && { price: Number(price) }) };
  res.json(state.products[idx]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = state.products.length;
  state.products = state.products.filter(p => p.id !== id);
  if (state.products.length === before) return res.status(404).json({ error: "No encontrado" });
  res.json({ message: "Eliminado" });
});

export default router;`}</Code>
        </details>

        <details style={{ marginTop: 12 }}>
          <summary style={summary}>tests/products.routes.test.js</summary>
          <Code>{`// tests/products.routes.test.js
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import productRoutes, { __reset } from "../routes/productRoutes.js";

// Asegúrate de que los tests no contaminen estado entre sí
beforeEach(() => {
  __reset([
    { id: 1, name: "Teclado", price: 25.99 },
    { id: 2, name: "Ratón", price: 14.5 }
  ]);
});

describe("GET /api/products", () => {
  it("devuelve el listado", async () => {
    const res = await request(app).get("/api/products").expect(200);
    expect(res.body.length).toBe(2);
  });
});

describe("POST /api/products", () => {
  it("crea un producto", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Pantalla", price: 120 })
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Pantalla");

    const list = await request(app).get("/api/products").expect(200);
    expect(list.body.length).toBe(3);
  });

  it("valida campos requeridos", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "" })
      .expect(400);

    expect(res.body.error).toBeTruthy();
  });
});`}</Code>
        </details>

        <p style={{ marginTop: 12 }}>
          Ejecuta las pruebas:
        </p>
        <Code>{`npm run test
# o con interfaz:
npm run test:ui`}</Code>
      </section>

      {/* Swagger */}
      <section style={card}>
        <h2 style={h2}>📄 OpenAPI/Swagger — Introducción mínima</h2>
        <p>
          Añadimos un <code>swagger.json</code> básico y lo servimos con <code>swagger-ui-express</code>.
          Así el alumnado ve la documentación viva de sus endpoints.
        </p>

        <details>
          <summary style={summary}>docs/swagger.json</summary>
          <Code>{`{
  "openapi": "3.0.0",
  "info": { "title": "API Productos (UF1844)", "version": "1.0.0" },
  "paths": {
    "/api/products": {
      "get": {
        "summary": "Listado de productos",
        "responses": { "200": { "description": "OK" } }
      },
      "post": {
        "summary": "Crear producto",
        "requestBody": { "required": true },
        "responses": { "201": { "description": "Creado" }, "400": { "description": "Petición inválida" } }
      }
    },
    "/api/products/{id}": {
      "get": {
        "summary": "Detalle por ID",
        "parameters": [{ "name": "id", "in": "path", "required": true }],
        "responses": { "200": { "description": "OK" }, "404": { "description": "No encontrado" } }
      }
    }
  }
}`}</Code>
        </details>

        <p style={{ marginTop: 12 }}>
          Inicia el servidor y visita <code>/docs</code>:
        </p>
        <Code>{`npm run dev
# -> http://localhost:3002/docs`}</Code>
      </section>

      {/* Paso a paso didáctico */}
      <section style={card}>
        <h2 style={h2}>🧭 Paso a paso (qué están haciendo)</h2>
        <ol>
          <li><strong>Instalan Vitest</strong> y configuran el entorno Node (ESM).</li>
          <li><strong>Separan app.js</strong> (exporta <code>app</code>) de <code>server.js</code> (solo escucha). Esto permite testear sin abrir puertos.</li>
          <li>Escriben una <strong>prueba unitaria</strong> de negocio (servicio <code>calcTotal</code>).</li>
          <li>Escriben <strong>pruebas de endpoints</strong> con Supertest sobre <code>app</code> en memoria.</li>
          <li>Documentan la API con <strong>Swagger</strong> y verifican visualmente los endpoints.</li>
        </ol>
      </section>

      {/* Ejercicios mínimos */}
      <section style={card}>
        <h2 style={h2}>✅ Ejercicios mínimos</h2>
        <ul>
          <li>Crear los tests de <strong>cartService</strong> y pasar todas las aserciones.</li>
          <li>Probar el endpoint <code>/api/products</code> (GET/POST) con Supertest, validando respuestas y errores.</li>
          <li>Generar un <code>swagger.json</code> mínimo y mostrarlo en <code>/docs</code>.</li>
        </ul>
      </section>

      {/* Extensiones */}
      <section style={card}>
        <h2 style={h2}>🧩 Extensiones (si hay tiempo)</h2>
        <ul>
          <li>Testear <code>PUT</code> y <code>DELETE</code>, incluyendo casos 404.</li>
          <li>Integrar con la API por capas del <strong>Bloque 4</strong> y usar un <em>DB_FILE</em> temporal en tests.</li>
          <li>Añadir <strong>coverage</strong> (<code>vitest --coverage</code>) y revisar ramas no cubiertas.</li>
          <li>Documentar más rutas en <code>swagger.json</code> (esquemas, requestBody, ejemplos).</li>
        </ul>
      </section>
    </main>
  );
}

const card = {
  background: "#fff",
  padding: "16px",
  borderRadius: "16px",
  boxShadow: "0 4px 14px rgba(0,0,0,.08)",
  marginBottom: "18px"
};
const h2 = { fontSize: "22px", margin: "0 0 8px", fontWeight: 700 };
const summary = { cursor: "pointer", fontWeight: 700, padding: "6px 0" };
