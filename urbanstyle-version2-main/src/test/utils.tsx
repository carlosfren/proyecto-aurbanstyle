// Utilidades compartidas por las pruebas: render con Router + Carrito, y limpieza entre pruebas.
import type { ReactElement } from "react";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { CarritoProvider, CLAVE_STORAGE } from "../context/CarritoContext";
import type { ItemCarrito } from "../context/carritoReducer";
import { PRODUCTOS } from "../data/Producto";

/** Renderiza un componente dentro de un MemoryRouter (navegación simulada) y del CarritoProvider. */
export function renderConProveedores(ui: ReactElement, ruta = "/") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <CarritoProvider>{ui}</CarritoProvider>
    </MemoryRouter>,
  );
}

/** Renderiza la aplicación completa en una ruta dada. */
export const renderApp = (ruta = "/") => renderConProveedores(<App />, ruta);

/** Deja un carrito pre-cargado en localStorage (se lee al montar el Provider). */
export function guardarCarrito(items: ItemCarrito[]) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
}

/** Carrito de ejemplo: 2 × A1 ($29.990) + 1 × E5 ($19.990) = $79.970, 3 unidades. */
export const CARRITO_EJEMPLO: ItemCarrito[] = [
  { producto: PRODUCTOS[0], cantidad: 2 },
  { producto: PRODUCTOS[4], cantidad: 1 },
];

// Aislamiento: tras cada prueba se desmonta el DOM y se limpia el almacenamiento.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
