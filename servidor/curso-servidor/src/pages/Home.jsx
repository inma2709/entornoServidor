import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="space-y-12">
      {/* HERO */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-primary">
          De la interfaz al motor ⚙️
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg">
          Venimos del <strong>MF0491_3</strong> (cliente: HTML, CSS, JS) y
          entramos en <strong>MF0492_3</strong> (servidor):{" "}
          <strong>Node.js, Express, SQL y APIs REST</strong>. Aquí aprenderás a
          procesar peticiones, validar datos, persistir información y publicar
          servicios que tu front consumirá.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            to="/mf0492/uf1844"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl shadow-brand hover:opacity-90"
          >
            Empezar por UF1844
          </Link>
          <a
            href="#indice"
            className="inline-flex items-center gap-2 bg-white border border-primary text-primary px-4 py-2 rounded-xl hover:bg-light"
          >
            Ver índice (UF introducción)
          </a>
          <a
            href="#resumen-uf"
            className="inline-flex items-center gap-2 bg-white border border-primary text-primary px-4 py-2 rounded-xl hover:bg-light"
          >
            Ver resumen por UF
          </a>
        </div>
      </div>

   
      {/* QUÉ APRENDERÁS */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="friendly-box">
          <h3 className="font-semibold">Construir APIs</h3>
          <p>
            Crearás servidores con <strong>Express</strong>, rutas REST y
            middleware para validar, autenticar y proteger tus endpoints.
          </p>
        </div>
        <div className="bg-white border-l-4 border-primary p-4 rounded-xl shadow">
          <h3 className="font-semibold text-primary">Persistencia real</h3>
          <p>
            Conectarás con <strong>MySQL</strong>, diseñarás modelos y harás
            consultas y transacciones seguras y eficientes.
          </p>
        </div>
        <div className="bg-secondary text-white p-4 rounded-xl shadow-brand">
          <h3 className="font-semibold">Despliegue y calidad</h3>
          <p>
            Probarás, documentarás y prepararás tus apps para producción:
            entornos, variables y buenas prácticas.
          </p>
        </div>
      </section>

      {/* RESUMEN POR UF */}
      <section id="resumen-uf" className="space-y-6">
        <header className="text-center">
          <h3 className="text-2xl font-semibold text-secondary">
            Resumen por Unidades Formativas
          </h3>
          <p className="text-secondary/80 max-w-2xl mx-auto">
            Cada UF añade una pieza clave del lado servidor. Juntas construyen
            tu primera app <strong>full-stack</strong>.
          </p>
        </header>
      </section>

      {/* OBJETIVOS MÍNIMOS POR UF */}
      <section id="objetivos-minimos" className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* UF1844 — Objetivos mínimos */}
          <article className="rounded-2xl bg-white shadow p-5 border border-light">
            <h4 className="text-xl font-semibold">UF1844 — Programación en servidor</h4>
            <h5 className="mt-3 font-semibold text-secondary">Objetivos</h5>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Instalar Node.js y crear un servidor <code>Express</code>.</li>
              <li>Definir rutas <code>GET/POST/PUT/DELETE</code> y enviar respuestas JSON.</li>
              <li>Usar middleware para logs, validación básica y manejo de errores.</li>
              <li>Gestionar variables de entorno y estructura de proyecto (MVC simple).</li>
              <li>Probar endpoints con Postman/Thunder y documentar brevemente.</li>
            </ul>
            <h5 className="mt-4 font-semibold text-secondary">Contenidos</h5>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>HTTP , status codes y ciclo petición-respuesta.</li>
              <li>Express: rutas, controladores y middleware de errores.</li>
              <li>Validación sencilla (p. ej., <code>express-validator</code> o lógica propia).</li>
              <li>Gestión de configuración con <code>.env</code>.</li>
              <li>CRUD en memoria (array/Map) con ids y validaciones.</li>
            </ul>
          </article>

          {/* UF1845 — Objetivos mínimos */}
          <article className="rounded-2xl bg-white shadow p-5 border border-light">
            <h4 className="text-xl font-semibold">UF1845 — Acceso a datos: base de datos relacional y no relacional</h4>
            <h5 className="mt-3 font-semibold text-secondary">Objetivos</h5>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Conectar Node con MySQL (pool de conexiones).</li>
              <li>Implementar un CRUD completo con consultas parametrizadas.</li>
              <li>Manejar errores SQL y devolver códigos/formatos adecuados.</li>
              <li>Diseñar tablas simples con claves primarias y foráneas básicas.</li>
              <li>Realizar al menos una transacción (BEGIN/COMMIT/ROLLBACK).</li>
            </ul>
            <h5 className="mt-4 font-semibold text-secondary">Contenidos</h5>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Modelo relacional: tablas, claves, relaciones 1–N.</li>
              <li>SQL esencial: <code>CREATE</code>, <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>JOIN</code> .</li>
              <li>Conexión desde Node y manejo de pool.</li>
              <li>Consultas seguras con parámetros (prevención de inyección).</li>
              <li>Transacciones y concurrencia elemental.</li>
            </ul>
          </article>

          {/* UF1846 — Objetivos mínimos */}
          <article className="rounded-2xl bg-white shadow p-5 border border-light">
            <h4 className="text-xl font-semibold">UF1846 — Aplicaciones distribuidas</h4>
            <h5 className="mt-3 font-semibold text-secondary">Objetivos</h5>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Exponer una API REST con rutas versionadas (p. ej., <code>/api/v1</code>).</li>
              <li>Permitir consumo desde un front (CORS configurado).</li>
              <li>Implementar autenticación sencilla por token (p. ej., JWT ).</li>
              <li>Consumir al menos un servicio externo y transformar su respuesta.</li>
              <li>Preparar un README con instrucciones de despliegue y variables.</li>
            </ul>
            <h5 className="mt-4 font-semibold text-secondary">Contenidos</h5>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Principios REST, documentación ligera (p. ej., Swagger/Markdown).</li>
              <li>Intercambio JSON/XML y fetch/axios desde cliente.</li>
              <li>Autenticación por token, nociones de autorización y CORS.</li>
              <li>Buenas prácticas de despliegue (entornos, logs y control de errores).</li>
              <li>Checklist de calidad: rutas, validación, seguridad y pruebas básicas.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* RUTA DE APRENDIZAJE */}
      <section className="rounded-2xl p-6 bg-white shadow border border-light">
        <h3 className="text-2xl font-semibold">Ruta de aprendizaje</h3>
        <ol className="mt-4 grid md:grid-cols-4 gap-4">
          <li className="p-4 rounded-xl bg-light">
            <p className="text-sm uppercase tracking-wide text-secondary/70">Paso 1</p>
            <p className="font-medium">Express  → rutas y middleware de errores.</p>
          </li>
          <li className="p-4 rounded-xl bg-light">
            <p className="text-sm uppercase tracking-wide text-secondary/70">Paso 2</p>
            <p className="font-medium">Conectar MySQL → CRUD con consultas parametrizadas.</p>
          </li>
          <li className="p-4 rounded-xl bg-light">
            <p className="text-sm uppercase tracking-wide text-secondary/70">Paso 3</p>
            <p className="font-medium">API REST completa → validación y documentación.</p>
          </li>
          <li className="p-4 rounded-xl bg-light">
            <p className="text-sm uppercase tracking-wide text-secondary/70">Paso 4</p>
            <p className="font-medium">Despliegue y pruebas finales → checklist de calidad.</p>
          </li>
        </ol>
      </section>

      {/* BLOQUE MOTIVADOR */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-accent to-primary text-white shadow-brand">
        <h3 className="text-2xl font-semibold">Siguiente nivel: Full-Stack 🚀</h3>
        <p className="mt-2 max-w-3xl">
          Al terminar este módulo, podrás unir tu front del MF0491_3 con tu
          backend del MF0492_3 para construir una aplicación real: datos
          persistentes, usuarios, autenticación y despliegue. Es el paso que te
          convierte en un/a desarrollador/a <strong>full-stack</strong>.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/mf0492/uf1844"
            className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-xl hover:opacity-90"
          >
            Comenzar ahora
          </Link>
          <a
            href="#resumen-uf"
            className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-xl hover:bg-white/20"
          >
            Repasar unidades
          </a>
        </div>
      </section>

      {/* PIE DIDÁCTICO */}
      <p className="text-center text-sm text-secondary/70">
        Consejo: trae instalado <strong>Node.js LTS</strong>,{" "}
        <strong>MySQL</strong> y <strong>Postman/Thunder Client</strong>. Usaremos
        Git y GitHub para versionar el proyecto.
      </p>
    </section>
  );
}
