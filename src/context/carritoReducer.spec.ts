import { PRODUCTOS } from "../data/Producto";
import { calcularTotal, CANTIDAD_MAXIMA, carritoReducer, contarUnidades, type ItemCarrito } from "./carritoReducer";

const [A1, , , , E5] = PRODUCTOS;

describe("carritoReducer", () => {
  it("CAR-01: agregar un producto nuevo crea un ítem con cantidad 1", () => {
    const r = carritoReducer([], { tipo: "agregar", producto: A1 });
    expect(r).toEqual([{ producto: A1, cantidad: 1 }]);
  });
  it("CAR-02: agregar un producto existente suma cantidad (no duplica)", () => {
    const r = carritoReducer([{ producto: A1, cantidad: 1 }], { tipo: "agregar", producto: A1, cantidad: 2 });
    expect(r.length).toBe(1);
    expect(r[0].cantidad).toBe(3);
  });
  it("CAR-03: la cantidad nunca supera el máximo", () => {
    const r = carritoReducer([{ producto: A1, cantidad: 9 }], { tipo: "agregar", producto: A1, cantidad: 5 });
    expect(r[0].cantidad).toBe(CANTIDAD_MAXIMA);
    const nuevo = carritoReducer([], { tipo: "agregar", producto: A1, cantidad: 99 });
    expect(nuevo[0].cantidad).toBe(CANTIDAD_MAXIMA);
  });
  it("CAR-04: quitar elimina solo el ítem indicado", () => {
    const estado: ItemCarrito[] = [{ producto: A1, cantidad: 1 }, { producto: E5, cantidad: 1 }];
    expect(carritoReducer(estado, { tipo: "quitar", id: "A1" }).map((i) => i.producto.id)).toEqual(["E5"]);
  });
  it("CAR-05: cambiarCantidad actualiza la cantidad", () => {
    const r = carritoReducer([{ producto: A1, cantidad: 1 }], { tipo: "cambiarCantidad", id: "A1", cantidad: 4 });
    expect(r[0].cantidad).toBe(4);
  });
  it("CAR-06: cambiarCantidad a 0 o negativo elimina el ítem", () => {
    const estado: ItemCarrito[] = [{ producto: A1, cantidad: 2 }];
    expect(carritoReducer(estado, { tipo: "cambiarCantidad", id: "A1", cantidad: 0 })).toEqual([]);
    expect(carritoReducer(estado, { tipo: "cambiarCantidad", id: "A1", cantidad: -1 })).toEqual([]);
  });
  it("CAR-07: vaciar deja el carrito en []", () => {
    expect(carritoReducer([{ producto: A1, cantidad: 3 }], { tipo: "vaciar" })).toEqual([]);
  });
  it("CAR-08: es puro: no muta el estado original", () => {
    const original: ItemCarrito[] = [{ producto: A1, cantidad: 1 }];
    const copia = JSON.parse(JSON.stringify(original));
    carritoReducer(original, { tipo: "agregar", producto: A1 });
    carritoReducer(original, { tipo: "quitar", id: "A1" });
    expect(original).toEqual(copia);
  });
  it("CAR-09: una acción desconocida devuelve el mismo estado", () => {
    const estado: ItemCarrito[] = [{ producto: A1, cantidad: 1 }];
    // @ts-expect-error acción inválida a propósito
    expect(carritoReducer(estado, { tipo: "otra" })).toBe(estado);
  });
});

describe("cálculos del carrito", () => {
  const items: ItemCarrito[] = [{ producto: A1, cantidad: 2 }, { producto: E5, cantidad: 1 }];
  it("CAR-10: calcularTotal suma precio × cantidad", () => {
    expect(calcularTotal(items)).toBe(29990 * 2 + 19990);
  });
  it("CAR-11: contarUnidades suma las cantidades", () => {
    expect(contarUnidades(items)).toBe(3);
  });
  it("CAR-12: carrito vacío => total 0 y 0 unidades", () => {
    expect(calcularTotal([])).toBe(0);
    expect(contarUnidades([])).toBe(0);
  });
});
