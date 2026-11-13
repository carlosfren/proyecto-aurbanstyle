import type { Producto } from "../data/Producto";

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export type AccionCarrito =
  | { tipo: "agregar"; producto: Producto; cantidad?: number }
  | { tipo: "quitar"; id: string }
  | { tipo: "cambiarCantidad"; id: string; cantidad: number }
  | { tipo: "vaciar" };

export const CANTIDAD_MAXIMA = 10;

/** Reducer puro: dado el estado y una acción devuelve un estado nuevo (nunca muta). */
export function carritoReducer(estado: ItemCarrito[], accion: AccionCarrito): ItemCarrito[] {
  switch (accion.tipo) {
    case "agregar": {
      const cantidad = accion.cantidad ?? 1;
      const existente = estado.find((i) => i.producto.id === accion.producto.id);
      if (existente) {
        return estado.map((i) =>
          i.producto.id === accion.producto.id
            ? { ...i, cantidad: Math.min(i.cantidad + cantidad, CANTIDAD_MAXIMA) }
            : i,
        );
      }
      return [...estado, { producto: accion.producto, cantidad: Math.min(cantidad, CANTIDAD_MAXIMA) }];
    }
    case "quitar":
      return estado.filter((i) => i.producto.id !== accion.id);
    case "cambiarCantidad": {
      if (accion.cantidad <= 0) return estado.filter((i) => i.producto.id !== accion.id);
      return estado.map((i) =>
        i.producto.id === accion.id ? { ...i, cantidad: Math.min(accion.cantidad, CANTIDAD_MAXIMA) } : i,
      );
    }
    case "vaciar":
      return [];
    default:
      return estado;
  }
}

export const calcularTotal = (items: ItemCarrito[]): number =>
  items.reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0);

export const contarUnidades = (items: ItemCarrito[]): number =>
  items.reduce((suma, i) => suma + i.cantidad, 0);
