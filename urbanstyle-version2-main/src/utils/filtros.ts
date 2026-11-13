import { PRODUCTOS, type Categoria, type Producto } from "../data/Producto";

/** Filtra el catálogo por texto (ignora mayúsculas) y por categoría. */
export function filtrarProductos(busqueda: string, categoria: Categoria | "Todas"): Producto[] {
  const texto = busqueda.trim().toLowerCase();
  return PRODUCTOS.filter(
    (p) => (categoria === "Todas" || p.categoria === categoria) && p.nombre.toLowerCase().includes(texto),
  );
}
