import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs.jsx"; // 👈 import

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const showBreadcrumbs = location.pathname !== "/"; // Ocultar en inicio

  const linkBase =
    "block px-3 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm transition";
  const linkActive = "bg-white/15";

  return (
    <div className="min-h-screen bg-light text-secondary font-sans flex flex-col">
      {/* Skip link */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-3 py-2 rounded"
      >
        Saltar al contenido
      </a>

      {/* HEADER */}
      <header className="bg-gradient-to-r from-accent to-primary text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-5 px-4">
          <h1 className="text-lg md:text-xl font-semibold">
            MF0492_3 · Entorno Servidor
          </h1>

          {/* Botón menú móvil */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg"
            aria-label="Abrir menú"
          >
            ☰ Menú
          </button>

          {/* NAV superior (desktop) */}
          <nav aria-label="Principal" className="hidden md:flex gap-2 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Inicio
            </NavLink>

            {/* Pon aquí tu dropdown/UF1842 si lo quieres */}
            <NavLink
              to="/mf0492/uf1844"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              UF1844
            </NavLink>
            <NavLink
              to="/mf0492/uf1845"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              UF1845
            </NavLink>
            <NavLink
              to="/mf0492/uf1846"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              UF1846
            </NavLink>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="flex flex-1 container mx-auto w-full px-4 gap-6 py-6">
        {/* Drawer móvil */}
        {open && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <button
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            />
            <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Menú</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-secondary/70 hover:text-secondary"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
              <nav className="space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-lg hover:bg-light"
                  onClick={() => setOpen(false)}
                >
                  🏠 Inicio
                </Link>
                <Link
                  to="/mf0492/uf1844"
                  className="block px-3 py-2 rounded-lg hover:bg-light"
                  onClick={() => setOpen(false)}
                >
                  ⚙️ UF1844
                </Link>
                <Link
                  to="/mf0492/uf1845"
                  className="block px-3 py-2 rounded-lg hover:bg-light"
                  onClick={() => setOpen(false)}
                >
                  🗄️ UF1845
                </Link>
                <Link
                  to="/mf0492/uf1846"
                  className="block px-3 py-2 rounded-lg hover:bg-light"
                  onClick={() => setOpen(false)}
                >
                  🔗 UF1846
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Main */}
        <main id="contenido" className="flex-1">
          {showBreadcrumbs && <Breadcrumbs />} {/* 👈 aquí va el breadcrumb */}
          {children || <Outlet />}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-accent to-primary text-white text-sm text-center py-5 mt-4">
        © 2025 · Curso MF0492_3 · Entorno Servidor. Inma Contreras
      </footer>
    </div>
  );
}
