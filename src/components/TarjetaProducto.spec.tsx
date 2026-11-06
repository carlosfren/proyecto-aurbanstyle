import { fireEvent, screen } from "@testing-library/react";
import TarjetaProducto from "./TarjetaProducto";
import { useCarrito } from "../context/CarritoContext";
import { PRODUCTOS } from "../data/Producto";
import { renderConProveedores } from "../test/utils";

const producto = PRODUCTOS[0];
function Sonda() {
  const { unidades, abierto } = useCarrito();
  return <output data-testid="sonda">{`${unidades}|${abierto}`}</output>;
}
const montar = () => renderConProveedores(<><TarjetaProducto producto={producto} /><Sonda /></>);

describe("TarjetaProducto", () => {
  it("TPR-01: muestra nombre, descripción, imagen y precio formateado", () => {
    montar();
    expect(screen.getByRole("heading", { name: producto.nombre })).toBeTruthy();
    expect(screen.getByText(producto.descripcion)).toBeTruthy();
    expect(screen.getByRole("img", { name: producto.altImagen })).toBeTruthy();
    expect(screen.getByText("$29.990")).toBeTruthy();
  });
  it("TPR-02: el enlace '+ Info' apunta al detalle del producto", () => {
    montar();
    expect(screen.getByRole("link", { name: "+ Info" }).getAttribute("href")).toBe("/producto/A1");
  });
  it("TPR-03: 'Añadir' agrega 1 unidad al carrito y abre el panel", () => {
    montar();
    expect(screen.getByTestId("sonda").textContent).toBe("0|false");
    fireEvent.click(screen.getByRole("button", { name: `Añadir ${producto.nombre} al carrito` }));
    expect(screen.getByTestId("sonda").textContent).toBe("1|true");
  });
  it("TPR-04: añadir dos veces acumula cantidad", () => {
    montar();
    const boton = screen.getByRole("button", { name: /Añadir/ });
    fireEvent.click(boton);
    fireEvent.click(boton);
    expect(screen.getByTestId("sonda").textContent).toBe("2|true");
  });
});
