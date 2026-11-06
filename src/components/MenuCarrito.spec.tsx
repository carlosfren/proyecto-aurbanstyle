import { fireEvent, screen } from "@testing-library/react";
import MenuCarrito from "./MenuCarrito";
import { useCarrito } from "../context/CarritoContext";
import { CARRITO_EJEMPLO, guardarCarrito, renderConProveedores } from "../test/utils";

function Abridor() {
  const { abrir } = useCarrito();
  return <button onClick={abrir}>abrir-panel</button>;
}
function montar(conItems = true) {
  if (conItems) guardarCarrito(CARRITO_EJEMPLO);
  renderConProveedores(<><Abridor /><MenuCarrito /></>);
  fireEvent.click(screen.getByText("abrir-panel"));
}

describe("MenuCarrito", () => {
  it("MEN-01: permanece oculto hasta que se abre", () => {
    guardarCarrito(CARRITO_EJEMPLO);
    renderConProveedores(<><Abridor /><MenuCarrito /></>);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("MEN-02: carrito vacío muestra mensaje y no muestra total", () => {
    montar(false);
    expect(screen.getByText("Tu carrito está vacío.")).toBeTruthy();
    expect(screen.queryByTestId("total-carrito")).toBeNull();
  });
  it("MEN-03: lista cada producto con su cantidad y calcula el total", () => {
    montar();
    expect(screen.getByText("Polerón Emotion")).toBeTruthy();
    expect(screen.getByText("Gorra Supreme")).toBeTruthy();
    expect(screen.getByTestId("cantidad-A1").textContent).toBe("2");
    expect(screen.getByTestId("cantidad-E5").textContent).toBe("1");
    expect(screen.getByTestId("total-carrito").textContent).toBe("$79.970");
  });
  it("MEN-04: el botón + aumenta la cantidad y recalcula el total", () => {
    montar();
    fireEvent.click(screen.getByRole("button", { name: "Agregar una unidad de Gorra Supreme" }));
    expect(screen.getByTestId("cantidad-E5").textContent).toBe("2");
    expect(screen.getByTestId("total-carrito").textContent).toBe("$99.960");
  });
  it("MEN-05: el botón − disminuye y al llegar a 0 elimina el producto", () => {
    montar();
    fireEvent.click(screen.getByRole("button", { name: "Quitar una unidad de Polerón Emotion" }));
    expect(screen.getByTestId("cantidad-A1").textContent).toBe("1");
    fireEvent.click(screen.getByRole("button", { name: "Quitar una unidad de Gorra Supreme" }));
    expect(screen.queryByTestId("cantidad-E5")).toBeNull();
    expect(screen.getByTestId("total-carrito").textContent).toBe("$29.990");
  });
  it("MEN-06: el botón + se deshabilita al llegar al máximo (10)", () => {
    guardarCarrito([{ ...CARRITO_EJEMPLO[0], cantidad: 10 }]);
    renderConProveedores(<><Abridor /><MenuCarrito /></>);
    fireEvent.click(screen.getByText("abrir-panel"));
    const mas = screen.getByRole("button", { name: "Agregar una unidad de Polerón Emotion" }) as HTMLButtonElement;
    expect(mas.disabled).toBeTrue();
  });
  it("MEN-07: 'Eliminar' quita el producto", () => {
    montar();
    fireEvent.click(screen.getByRole("button", { name: "Eliminar Polerón Emotion" }));
    expect(screen.queryByText("Polerón Emotion")).toBeNull();
    expect(screen.getByTestId("total-carrito").textContent).toBe("$19.990");
  });
  it("MEN-08: 'Vaciar carrito' deja el panel vacío", () => {
    montar();
    fireEvent.click(screen.getByRole("button", { name: "Vaciar carrito" }));
    expect(screen.getByText("Tu carrito está vacío.")).toBeTruthy();
  });
  it("MEN-09: el botón de cerrar y el fondo oscuro cierran el panel", () => {
    montar();
    fireEvent.click(screen.getByRole("button", { name: "Cerrar carrito" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByText("abrir-panel"));
    fireEvent.click(screen.getByTestId("fondo-carrito"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("MEN-10: 'Ir a pagar' enlaza a /checkout y cierra el panel", () => {
    montar();
    const enlace = screen.getByRole("link", { name: "Ir a pagar" });
    expect(enlace.getAttribute("href")).toBe("/checkout");
    fireEvent.click(enlace);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
