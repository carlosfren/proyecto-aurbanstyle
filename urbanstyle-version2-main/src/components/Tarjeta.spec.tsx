import { render, screen } from "@testing-library/react";
import Tarjeta from "./Tarjeta";
import TarjetaCuerpo from "./TarjetaCuerpo";
import "../test/utils";

describe("TarjetaCuerpo", () => {
  it("TAR-01: muestra título y texto con las clases por defecto de Bootstrap", () => {
    render(<TarjetaCuerpo titulo="Polerón" texto="Algodón" />);
    expect(screen.getByRole("heading", { name: "Polerón" }).className).toBe("card-title");
    expect(screen.getByText("Algodón").className).toBe("card-text");
  });
  it("TAR-02: permite personalizar las clases", () => {
    render(<TarjetaCuerpo titulo="T" texto="X" clase="mi-cuerpo" claseTitulo="mi-titulo" claseTexto="mi-texto" />);
    expect(screen.getByText("T").className).toBe("mi-titulo");
    expect(screen.getByText("X").className).toBe("mi-texto");
  });
});

describe("Tarjeta", () => {
  it("TAR-03: renderiza imagen con src y alt cuando se entrega urlImagen", () => {
    render(<Tarjeta titulo="A" texto="B" urlImagen="/imagen/x.jpg" altImagen="Foto X" />);
    const img = screen.getByRole("img", { name: "Foto X" });
    expect(img.getAttribute("src")).toBe("/imagen/x.jpg");
  });
  it("TAR-04: NO renderiza <img> si no hay urlImagen (render condicional)", () => {
    render(<Tarjeta titulo="A" texto="B" />);
    expect(screen.queryByRole("img")).toBeNull();
  });
  it("TAR-05: renderiza children dentro del cuerpo", () => {
    render(<Tarjeta titulo="A" texto="B"><button>Acción</button></Tarjeta>);
    expect(screen.getByRole("button", { name: "Acción" })).toBeTruthy();
  });
  it("TAR-06: no fija ancho en línea (la grilla de Bootstrap decide) y acepta clase propia", () => {
    const { container } = render(<Tarjeta titulo="A" texto="B" clase="card shadow" />);
    const raiz = container.firstElementChild as HTMLElement;
    expect(raiz.className).toBe("card shadow");
    expect(raiz.getAttribute("style")).toBeNull();
  });
});
