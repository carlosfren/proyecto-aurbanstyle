import { Component, type ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CarritoProvider, CLAVE_STORAGE, useCarrito } from "./CarritoContext";
import { PRODUCTOS } from "../data/Producto";
import { CARRITO_EJEMPLO, guardarCarrito } from "../test/utils";

// Componente "sonda": expone el estado del contexto en el DOM y botones para disparar acciones.
function Sonda() {
  const c = useCarrito();
  return (
    <div>
      <span data-testid="unidades">{c.unidades}</span>
      <span data-testid="total">{c.total}</span>
      <span data-testid="abierto">{String(c.abierto)}</span>
      <button onClick={() => c.agregar(PRODUCTOS[0])}>agregar</button>
      <button onClick={() => c.quitar("A1")}>quitar</button>
      <button onClick={() => c.cambiarCantidad("A1", 5)}>cinco</button>
      <button onClick={c.vaciar}>vaciar</button>
      <button onClick={c.abrir}>abrir</button>
      <button onClick={c.cerrar}>cerrar</button>
    </div>
  );
}
// Límite de errores: captura el error de render para poder verificarlo sin que llegue al navegador.
class LimiteError extends Component<{ children: ReactNode }, { mensaje: string }> {
  state = { mensaje: "" };
  static getDerivedStateFromError(error: Error) {
    return { mensaje: error.message };
  }
  render() {
    return this.state.mensaje ? <p role="alert">{this.state.mensaje}</p> : this.props.children;
  }
}
const montar = () => render(<CarritoProvider><Sonda /></CarritoProvider>);
const texto = (id: string) => screen.getByTestId(id).textContent;
const clic = (nombre: string) => fireEvent.click(screen.getByRole("button", { name: nombre }));

describe("CarritoProvider / useCarrito", () => {
  it("CTX-01: inicia vacío y cerrado", () => {
    montar();
    expect(texto("unidades")).toBe("0");
    expect(texto("total")).toBe("0");
    expect(texto("abierto")).toBe("false");
  });
  it("CTX-02: agregar actualiza unidades y total, y abre el carrito", () => {
    montar();
    clic("agregar");
    expect(texto("unidades")).toBe("1");
    expect(texto("total")).toBe("29990");
    expect(texto("abierto")).toBe("true");
  });
  it("CTX-03: cambiarCantidad, quitar y vaciar funcionan", () => {
    montar();
    clic("agregar");
    clic("cinco");
    expect(texto("unidades")).toBe("5");
    clic("quitar");
    expect(texto("unidades")).toBe("0");
    clic("agregar");
    clic("vaciar");
    expect(texto("unidades")).toBe("0");
  });
  it("CTX-04: abrir y cerrar cambian el estado del panel", () => {
    montar();
    clic("abrir");
    expect(texto("abierto")).toBe("true");
    clic("cerrar");
    expect(texto("abierto")).toBe("false");
  });
  it("CTX-05: guarda el carrito en localStorage (mock con spy)", () => {
    const espia = spyOn(Storage.prototype, "setItem").and.callThrough();
    montar();
    clic("agregar");
    const llamadas = espia.calls.allArgs().filter(([clave]) => clave === CLAVE_STORAGE);
    const ultimo = JSON.parse(llamadas[llamadas.length - 1][1]);
    expect(ultimo[0].producto.id).toBe("A1");
    expect(ultimo[0].cantidad).toBe(1);
  });
  it("CTX-06: recupera el carrito guardado al montar", () => {
    guardarCarrito(CARRITO_EJEMPLO);
    montar();
    expect(texto("unidades")).toBe("3");
    expect(texto("total")).toBe("79970");
  });
  it("CTX-07: si el JSON guardado está dañado, inicia vacío sin romperse", () => {
    localStorage.setItem(CLAVE_STORAGE, "{no-es-json");
    montar();
    expect(texto("unidades")).toBe("0");
  });
  it("CTX-08: si localStorage falla al guardar, el carrito sigue funcionando", () => {
    spyOn(Storage.prototype, "setItem").and.throwError("cuota excedida");
    montar();
    clic("agregar");
    expect(texto("unidades")).toBe("1");
  });
  it("CTX-09: usar useCarrito fuera del Provider lanza un error claro", () => {
    spyOn(console, "error"); // React registra el error capturado; lo silenciamos
    render(<LimiteError><Sonda /></LimiteError>);
    expect(screen.getByRole("alert").textContent).toMatch(/CarritoProvider/);
  });
});
