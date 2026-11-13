import { fireEvent, screen } from "@testing-library/react";
import { renderApp } from "../test/utils";

const enMain = () => screen.getByRole("main");

describe("ProductoDetalle (ruta /producto/:id)", () => {
  it("DET-01: lee el parámetro :id de la URL y muestra el producto", () => {
    renderApp("/producto/B2");
    expect(screen.getByRole("heading", { level: 1, name: "Polerón Valley United" })).toBeTruthy();
    expect(enMain().textContent).toContain("$32.990");
    expect(enMain().textContent).toContain("Código B2");
  });
  it("DET-02: la imagen usa una ruta válida (sin '//') y es adaptable", () => {
    renderApp("/producto/B2");
    const img = screen.getByRole("img", { name: "Polerón Valley United" });
    expect(img.getAttribute("src")).toBe("/imagen/imagen3.pgn.jpg");
    expect(img.className).toContain("img-fluid");
  });
  it("DET-03: id inexistente muestra 'Producto no encontrado' y enlace al catálogo", () => {
    renderApp("/producto/NO-EXISTE");
    expect(screen.getByText("Producto no encontrado")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Volver al catálogo" }).getAttribute("href")).toBe("/productos");
  });
  it("DET-04: añade al carrito la cantidad elegida en el selector (estado local)", () => {
    renderApp("/producto/A1");
    fireEvent.change(screen.getByLabelText("Cantidad"), { target: { value: "3" } });
    fireEvent.click(screen.getByRole("button", { name: "Añadir al carrito" }));
    expect(screen.getByTestId("contador-carrito").textContent).toBe("3");
    expect(screen.getByTestId("total-carrito").textContent).toBe("$89.970");
  });
  it("DET-05: por defecto añade 1 unidad", () => {
    renderApp("/producto/E5");
    fireEvent.click(screen.getByRole("button", { name: "Añadir al carrito" }));
    expect(screen.getByTestId("contador-carrito").textContent).toBe("1");
  });
});
