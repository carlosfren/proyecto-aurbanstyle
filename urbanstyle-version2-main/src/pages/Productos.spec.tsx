import { fireEvent, screen } from "@testing-library/react";
import Productos from "./Productos";
import { renderConProveedores } from "../test/utils";

const montar = () => renderConProveedores(<Productos />, "/productos");
const resultados = () => screen.getByTestId("resultados").textContent;

describe("Productos (estado: búsqueda y categoría)", () => {
  it("PRD-01: al inicio lista los 8 productos", () => {
    montar();
    expect(resultados()).toBe("8 producto(s) encontrado(s)");
    expect(screen.getAllByRole("link", { name: "+ Info" }).length).toBe(8);
  });
  it("PRD-02: escribir en el buscador filtra los productos", () => {
    montar();
    fireEvent.change(screen.getByLabelText("Buscar producto"), { target: { value: "gorra" } });
    expect(resultados()).toBe("2 producto(s) encontrado(s)");
    expect(screen.queryByText("Polerón Emotion")).toBeNull();
  });
  it("PRD-03: elegir categoría filtra los productos", () => {
    montar();
    fireEvent.change(screen.getByLabelText("Categoría"), { target: { value: "Shorts" } });
    expect(resultados()).toBe("1 producto(s) encontrado(s)");
    expect(screen.getByText("Short Valley Dream")).toBeTruthy();
  });
  it("PRD-04: sin coincidencias muestra una alerta", () => {
    montar();
    fireEvent.change(screen.getByLabelText("Buscar producto"), { target: { value: "zapatillas" } });
    expect(screen.getByText("No encontramos productos con esos filtros.")).toBeTruthy();
    expect(resultados()).toBe("0 producto(s) encontrado(s)");
  });
  it("PRD-05: borrar el texto restaura el catálogo completo", () => {
    montar();
    const campo = screen.getByLabelText("Buscar producto");
    fireEvent.change(campo, { target: { value: "gorra" } });
    fireEvent.change(campo, { target: { value: "" } });
    expect(resultados()).toBe("8 producto(s) encontrado(s)");
  });
});
