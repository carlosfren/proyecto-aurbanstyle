import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import type { Producto } from "../data/Producto";
import { calcularTotal, carritoReducer, contarUnidades, type ItemCarrito } from "./carritoReducer";

export const CLAVE_STORAGE = "urbanstyle-carrito";

interface ValorCarrito {
  items: ItemCarrito[];
  total: number;
  unidades: number;
  abierto: boolean;
  agregar: (producto: Producto, cantidad?: number) => void;
  quitar: (id: string) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  vaciar: () => void;
  abrir: () => void;
  cerrar: () => void;
}

const CarritoContext = createContext<ValorCarrito | null>(null);

function leerGuardado(): ItemCarrito[] {
  try {
    const crudo = localStorage.getItem(CLAVE_STORAGE);
    return crudo ? (JSON.parse(crudo) as ItemCarrito[]) : [];
  } catch {
    return []; // JSON dañado o storage no disponible
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito(): ValorCarrito {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(carritoReducer, undefined, leerGuardado);
  const [abierto, setAbierto] = useState(false);

  // Persistencia: cada vez que cambia el carrito se guarda en localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
      /* sin almacenamiento: el carrito sigue funcionando en memoria */
    }
  }, [items]);

  const valor = useMemo<ValorCarrito>(
    () => ({
      items,
      total: calcularTotal(items),
      unidades: contarUnidades(items),
      abierto,
      agregar: (producto, cantidad = 1) => {
        dispatch({ tipo: "agregar", producto, cantidad });
        setAbierto(true);
      },
      quitar: (id) => dispatch({ tipo: "quitar", id }),
      cambiarCantidad: (id, cantidad) => dispatch({ tipo: "cambiarCantidad", id, cantidad }),
      vaciar: () => dispatch({ tipo: "vaciar" }),
      abrir: () => setAbierto(true),
      cerrar: () => setAbierto(false),
    }),
    [items, abierto],
  );

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}
