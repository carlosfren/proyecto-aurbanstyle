import { fireEvent, screen, within } from "@testing-library/react";
import BarraNavegacion from "./BarraNavegacion";
import MenuCarrito from "./MenuCarrito";
import { PAGINAS } from "../data/Paginas";
import { CARRITO_EJEMPLO, guardarCarrito, renderConProveedores } from "../test/utils";

const montar = (ruta = "/") => renderConProveedores(<><BarraNavegacion /><MenuCarrito /></>, ruta);
const menu = () => document.getElementById("menuPrincipal")!;

describe("BarraNavegacion", () => {
  it("NAV-01: muestra un enlace por cada página de PAGINAS con su ruta", () => {
    montar();
    const nav = within(screen.getByRole("navigation", { name: "Navegación principal" }));
    for (const pag of PAGINAS) {
      expect(nav.getByRole("link", { name: pag.nombre }).getAttribute("href")).toBe(pag.ruta);
    }
  });
  it("NAV-02: marca como activo el enlace de la ruta actual", () => {
    montar("/productos");
    const nav = within(screen.getByRole("navigation"));
    expect(nav.getByRole("link", { name: "Productos" }).className).toContain("active");
    expect(nav.getByRole("link", { name: "Inicio" }).className).not.toContain("active");
  });
  it("NAV-03: el menú móvil inicia colapsado (sin clase 'show')", () => {
    montar();
    expect(menu().classList.contains("show")).toBeFalse();
    expect(screen.getByLabelText("Mostrar u ocultar menú").getAttribute("aria-expanded")).toBe("false");
  });
  it("NAV-04: el botón hamburguesa despliega y vuelve a colapsar el menú (estado)", () => {
    montar();
    const toggler = screen.getByLabelText("Mostrar u ocultar menú");
    fireEvent.click(toggler);
    expect(menu().classList.contains("show")).toBeTrue();
    expect(toggler.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(toggler);
    expect(menu().classList.contains("show")).toBeFalse();
  });
  it("NAV-05: al elegir una página el menú móvil se cierra", () => {
    montar();
    fireEvent.click(screen.getByLabelText("Mostrar u ocultar menú"));
    fireEvent.click(within(menu()).getByRole("link", { name: "Blog" }));
    expect(menu().classList.contains("show")).toBeFalse();
  });
  it("NAV-06: el contador del carrito muestra 0 cuando está vacío", () => {
    montar();
    expect(screen.getByTestId("contador-carrito").textContent).toBe("0");
  });
  it("NAV-07: el contador refleja las unidades del carrito guardado", () => {
    guardarCarrito(CARRITO_EJEMPLO);
    montar();
    expect(screen.getByTestId("contador-carrito").textContent).toBe("3");
  });
  it("NAV-08: el botón 'Abrir carrito' muestra el panel del carrito", () => {
    montar();
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Abrir carrito" }));
    expect(screen.getByRole("dialog", { name: "Carrito de compras" })).toBeTruthy();
  });
});
