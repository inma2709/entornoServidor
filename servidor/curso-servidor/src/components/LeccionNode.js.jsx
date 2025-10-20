import React from 'react';

const LeccionNode = () => {
  return (
    <div className="cliente bg-light text-[color:var(--color-secondary)] font-sans p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-display text-[color:var(--color-primary)] mb-4">
          Lección: Introducción a Node.js
        </h1>
        <p className="text-lg max-w-4xl leading-relaxed">
          ¿Alguna vez te has preguntado cómo funcionan las aplicaciones web detrás de lo que ves en pantalla? Node.js es la puerta de entrada al mundo del desarrollo backend, donde se procesan datos, se gestionan usuarios y se construyen APIs que conectan todo.  
          <br /><br />
          En esta lección aprenderás desde cero a crear aplicaciones web en entorno servidor, usando Node.js y Express, dos herramientas clave en el desarrollo moderno. Aprenderás a crear servidores, gestionar rutas, conectar con bases de datos y aplicar buenas prácticas que te prepararán para proyectos reales y certificaciones oficiales.  
          <br /><br />
          Al finalizar, tendrás tu propia API funcional, lista para desplegar y mostrar en tu portfolio. ¡Vamos a por ello!
        </p>
      </header>

      <section className="friendly-box mb-10">
        <h2 className="text-2xl font-display text-[color:var(--color-accent)] mb-4">🧭 Índice de contenidos</h2>
        <ul className="space-y-4 text-lg">
          {[
            {
              href: '01-introduccion-servidor.html',
              title: '1. Introducción al entorno servidor',
              desc: 'Comprenderás qué es el backend, cómo se diferencia del frontend y por qué es esencial en el desarrollo web.'
            },
            {
              href: '02-instalacion-node.html',
              title: '2. Instalación y configuración inicial',
              desc: 'Aprenderás a instalar Node.js, configurar tu entorno y preparar tu primer proyecto.'
            },
            {
              href: '03-primeros-pasos.html',
              title: '3. Primeros pasos con Node.js',
              desc: 'Ejecutarás tus primeros scripts, usarás módulos nativos y entenderás cómo funciona Node desde dentro.'
            },
            {
              href: '04-modulos-npm.html',
              title: '4. Módulos y gestión de dependencias',
              desc: 'Descubrirás cómo importar funcionalidades, instalar paquetes y organizar tu proyecto con npm.'
            },
            {
              href: '05-programacion-asincrona.html',
              title: '5. Programación asíncrona en Node.js',
              desc: 'Dominarás callbacks, promesas y `async/await` para trabajar con procesos no bloqueantes.'
            },
            {
              href: '06-servidores-http.html',
              title: '6. Servidores web con Node.js',
              desc: 'Crearás tu propio servidor con el módulo `http`, gestionando rutas y respuestas.'
            },
            {
              href: '07-express-framework.html',
              title: '7. Express.js: el framework más usado',
              desc: 'Aprenderás a usar Express para simplificar la creación de rutas, middleware y servidores robustos.'
            },
            {
              href: '08-gestion-datos.html',
              title: '8. Gestión de datos y persistencia',
              desc: 'Conectarás tu aplicación con bases de datos y realizarás operaciones CRUD.'
            },
            {
              href: '09-seguridad-practicas.html',
              title: '9. Seguridad y buenas prácticas',
              desc: 'Aplicarás validaciones, manejarás errores y protegerás tu aplicación con buenas prácticas.'
            },
            {
              href: '10-proyecto-final.html',
              title: '10. Proyecto final guiado',
              desc: 'Construirás una API REST completa, la documentarás y la desplegarás en la nube.'
            }
          ].map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="text-[color:var(--color-primary)] hover:underline font-semibold"
              >
                {item.title}
              </a>
              <br />
              {item.desc}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-light p-6 rounded-xl shadow-brand">
        <h2 className="text-xl font-display text-[color:var(--color-warning)] mb-2">🎯 Objetivos mínimos UF1842</h2>
        <ul className="list-disc list-inside space-y-1 text-lg">
          <li>Crear aplicaciones web en entorno servidor con Node.js</li>
          <li>Utilizar módulos y librerías externas</li>
          <li>Implementar lógica de negocio y rutas</li>
          <li>Gestionar datos y persistencia</li>
          <li>Aplicar buenas prácticas de desarrollo</li>
        </ul>
      </section>
    </div>
  );
};

export default LeccionNode;
