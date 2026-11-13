import { useState } from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import { CATEGORIAS, type Categoria } from "../data/Producto";
import { filtrarProductos } from "../utils/filtros";

function Productos() {
  // Dos estados controlados: lo que escribe el usuario y la categoría elegida.
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "Todas">("Todas");
  const visibles = filtrarProductos(busqueda, categoria);

  return (
    <>
      <h1 className="h2 my-4">Catálogo</h1>
      <div className="row g-2 mb-4">
        <div className="col-12 col-md-8">
          <label htmlFor="busqueda" className="visually-hidden">Buscar producto</label>
          <input id="busqueda" type="search" className="form-control" placeholder="Buscar producto…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="categoria" className="visually-hidden">Categoría</label>
          <select id="categoria" className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria | "Todas")}>
            <option value="Todas">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-body-secondary" aria-live="polite" data-testid="resultados">
        {visibles.length} producto(s) encontrado(s)
      </p>

      {visibles.length === 0 ? (
        <div className="alert alert-warning">No encontramos productos con esos filtros.</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {visibles.map((p) => (
            <div className="col" key={p.id}>
              <TarjetaProducto producto={p} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Productos;
