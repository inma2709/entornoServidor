import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Componente Breadcrumbs reutilizable
 * Muestra la ruta actual con enlaces parciales, estilo tailwind personalizado.
 */
export default function Breadcrumbs() {
  const location = useLocation();

  // Divide la ruta actual por "/"
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Construye enlaces acumulativos
  const crumbs = pathSegments.map((segment, index) => {
    const to = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = segment.replace(/-/g, " "); // Mejora legibilidad
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    const isLast = index === pathSegments.length - 1;

    return (
      <li key={to} className="flex items-center gap-1">
        {!isLast ? (
          <Link to={to} className="text-primary hover:underline capitalize">
            {label}
          </Link>
        ) : (
          <span className="text-secondary/70 capitalize">{label}</span>
        )}
        {!isLast && <span className="text-secondary/50">›</span>}
      </li>
    );
  });

  // Si estás en la raíz ("/"), no muestra nada
  if (pathSegments.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="text-sm mb-4">
      <ol className="flex flex-wrap gap-1">{crumbs}</ol>
    </nav>
  );
}
