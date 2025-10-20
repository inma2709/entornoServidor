// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

// UF1844
import UF1844Intro from "./pages/uf1844/UF1844Intro.jsx";
import EntornoServidor from "./pages/uf1844/EntornoServidor.jsx";
import Instalacion from "./pages/uf1844/Instalacion.jsx";
import PrimerosPasos from "./pages/uf1844/PrimerosPasos.jsx";
import ModulosDependencias from "./pages/uf1844/ModulosDependencias.jsx";
import Asincronia from "./pages/uf1844/Asincronia.jsx";
import Http from "./pages/uf1844/Http.jsx";
import Express from "./pages/uf1844/Express.jsx";
import Datos from "./pages/uf1844/Datos.jsx";
import Seguridad from "./pages/uf1844/Seguridad.jsx";
import Proyecto from "./pages/uf1844/Proyecto.jsx";
import ServidorNode from "./pages/uf1844/ServidorNode.jsx";
import NodeFundamentals from "./pages/uf1844/NodeFundamentals.jsx";
import ArquitecturaCapas from "./pages/uf1844/ArquitecturaCapas.jsx";





export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* UF1844 · índice */}
        <Route path="/mf0492/uf1844" element={<UF1844Intro />} />

        {/* UF1844 · epígrafes */}
        <Route path="/mf0492/uf1844/entorno-servidor" element={<EntornoServidor />} />
        <Route path="/mf0492/uf1844/instalacion" element={<Instalacion />} />
        <Route path="/mf0492/uf1844/primeros-pasos" element={<PrimerosPasos />} />
        <Route path="/mf0492/uf1844/modulos-dependencias" element={<ModulosDependencias />} />
        <Route path="/mf0492/uf1844/asincronia" element={<Asincronia />} />
        <Route path="/mf0492/uf1844/http" element={<Http />} />
        <Route path="/mf0492/uf1844/express" element={<Express />} />
        <Route path="/mf0492/uf1844/crud-express" element={<Datos />} />
        <Route path="/mf0492/uf1844/gestion-persistencia" element={<Seguridad />} />
        <Route path="/mf0492/uf1844/seguridad-proyecto" element={<Proyecto />} />
        <Route path="/mf0492/uf1844/servidor-node" element={<ServidorNode />} />
        <Route path="/mf0492/uf1844/resumen-node" element={<NodeFundamentals />} />
        
        <Route path="/mf0492/uf1844/arquitectura-capas" element={<ArquitecturaCapas />} />
        

        {/* Aquí irán UF1845 y UF1846 cuando las montemos */}
      </Routes>
    </Layout>
  );
}
