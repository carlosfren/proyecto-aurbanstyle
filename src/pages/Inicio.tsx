import { Link } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import { PRODUCTOS } from "../data/Producto";

const DESTACADOS = PRODUCTOS.slice(0, 4);

function Inicio() {
  return (
    <>
      <section className="hero text-center text-white rounded-4 p-4 p-md-5 my-4">
        <h1 className="display-5 fw-bold">Streetwear con identidad</h1>
        <p className="lead mb-4">Polerones, poleras, gorras y shorts oversize de algodón full brillo.</p>
        <Link to="/productos" className="btn btn-danger btn-lg">
          Ver catálogo
        </Link>
      </section>

      <h2 className="h3 text-center my-4">Productos destacados</h2>
      {/* Grilla responsiva: 1 columna en móvil, 2 en tablet, 4 en escritorio */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {DESTACADOS.map((prod) => (
          <div className="col" key={prod.id}>
            <TarjetaProducto producto={prod} />
          </div>
        ))}
      </div>

      <div className="row text-center g-3 mt-4">
        {[
          ["🚚", "Envíos a todo Chile"],
          ["🔄", "Cambios dentro de 10 días"],
          ["🔒", "Pago seguro"],
        ].map(([icono, texto]) => (
          <div className="col-12 col-md-4" key={texto}>
            <div className="p-3 bg-body-tertiary rounded">
              <span className="fs-3" aria-hidden="true">{icono}</span>
              <p className="mb-0 fw-semibold">{texto}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Inicio;
