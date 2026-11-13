import { Route, Routes } from "react-router-dom";
import BarraNavegacion from "./components/BarraNavegacion";
import Contenedor from "./components/Contenedor";
import MenuCarrito from "./components/MenuCarrito";
import PiePagina from "./components/PiePagina";
import { AuthProvider } from "./context/AuthContext";
import Blog from "./pages/Blog";
import Checkout from "./pages/Checkout";
import Contacto from "./pages/Contacto";
import IniciarSesion from "./pages/IniciarSesion";
import Inicio from "./pages/Inicio";
import NoEncontrado from "./pages/NoEncontrado";
import Nosotros from "./pages/Nosotros";
import ProductoDetalle from "./pages/ProductoDetalle";
import Productos from "./pages/Productos";
import Registrarse from "./pages/Registrarse";

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <BarraNavegacion />
        <MenuCarrito />
        <main className="flex-grow-1">
          <Contenedor>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/registrarse" element={<Registrarse />} />
              <Route path="/iniciar-sesion" element={<IniciarSesion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </Contenedor>
        </main>
        <PiePagina />
      </div>
    </AuthProvider>
  );
}

export default App;
