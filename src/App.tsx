import { Route, Routes } from "react-router-dom";
import BarraNavegacion from "./components/BarraNavegacion";
import Contenedor from "./components/Contenedor";
import MenuCarrito from "./components/MenuCarrito";
import PiePagina from "./components/PiePagina";
import Blog from "./pages/Blog";
import Checkout from "./pages/Checkout";
import Contacto from "./pages/Contacto";
import Inicio from "./pages/Inicio";
import NoEncontrado from "./pages/NoEncontrado";
import Nosotros from "./pages/Nosotros";
import ProductoDetalle from "./pages/ProductoDetalle";
import Productos from "./pages/Productos";
import Suscripcion from "./pages/Suscripcion";

// El <CarritoProvider> y el <BrowserRouter> se montan en main.tsx (y en los tests con MemoryRouter).
function App() {
  return (
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
            <Route path="/suscripcion" element={<Suscripcion />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
        </Contenedor>
      </main>
      <PiePagina />
    </div>
  );
}

export default App;
