import { screen } from "@testing-library/react";
import Inicio from "./Inicio";
import Blog from "./Blog";
import NoEncontrado from "./NoEncontrado";
import Nosotros from "./Nosotros";
import { ENTRADAS } from "../data/Blog";
import { renderConProveedores } from "../test/utils";

describe("Inicio", () => {
  it("INI-01: muestra el título y el botón hacia el catálogo", () => {
    renderConProveedores(<Inicio />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Streetwear");
    expect(screen.getByRole("link", { name: "Ver catálogo" }).getAttribute("href")).toBe("/productos");
  });
  it("INI-02: muestra 4 productos destacados en una grilla responsiva", () => {
    const { container } = renderConProveedores(<Inicio />);
    expect(screen.getAllByRole("link", { name: "+ Info" }).length).toBe(4);
    const fila = container.querySelector(".row")!;
    expect(fila.className).toContain("row-cols-1");
    expect(fila.className).toContain("row-cols-sm-2");
    expect(fila.className).toContain("row-cols-lg-4");
  });
});

describe("Blog, Nosotros y NoEncontrado", () => {
  it("PAG-01: Blog muestra una tarjeta por entrada", () => {
    renderConProveedores(<Blog />);
    expect(screen.getAllByRole("article").length).toBe(ENTRADAS.length);
    expect(screen.getByText(ENTRADAS[0].titulo)).toBeTruthy();
  });
  it("PAG-02: Nosotros muestra misión, visión y valores con imagen adaptable (img-fluid)", () => {
    renderConProveedores(<Nosotros />);
    expect(screen.getByText(/Misión:/)).toBeTruthy();
    expect(screen.getByText(/Visión:/)).toBeTruthy();
    expect(screen.getByRole("img").className).toContain("img-fluid");
  });
  it("PAG-03: NoEncontrado muestra 404 y enlace al inicio", () => {
    renderConProveedores(<NoEncontrado />);
    expect(screen.getByText("404")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Volver al inicio" }).getAttribute("href")).toBe("/");
  });
});
