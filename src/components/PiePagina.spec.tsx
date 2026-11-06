import { screen, within } from "@testing-library/react";
import PiePagina from "./PiePagina";
import { PAGINAS } from "../data/Paginas";
import { renderConProveedores } from "../test/utils";

describe("PiePagina", () => {
  it("PIE-01: muestra los mismos enlaces que la navegación (fuente única PAGINAS)", () => {
    renderConProveedores(<PiePagina />);
    const pie = within(screen.getByRole("contentinfo"));
    expect(pie.getAllByRole("link").length).toBe(PAGINAS.length);
    for (const pag of PAGINAS) {
      expect(pie.getByRole("link", { name: pag.nombre }).getAttribute("href")).toBe(pag.ruta);
    }
  });
  it("PIE-02: muestra el texto de derechos con el año 2026", () => {
    renderConProveedores(<PiePagina />);
    expect(screen.getByText(/© 2026 UrbanStyle/)).toBeTruthy();
  });
});
