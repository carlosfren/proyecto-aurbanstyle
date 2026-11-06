import { fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "./test/utils";

describe("App (integración: navegación y rutas)", () => {
  it("APP-01: la ruta / muestra Inicio", () => {
    renderApp("/");
    expect(screen.getByRole("heading", { level: 2, name: "Productos destacados" })).toBeTruthy();
  });
  it("APP-02: cada ruta del menú renderiza su página", () => {
    const rutas: [string, RegExp | string][] = [
      ["/productos", "Catálogo"],
      ["/blog", "Blog"],
      ["/suscripcion", "Suscríbete"],
      ["/contacto", "Contacto"],
      ["/nosotros", "Sobre nosotros"],
    ];
    for (const [ruta, titulo] of rutas) {
      const { unmount } = renderApp(ruta);
      expect(within(screen.getByRole("main")).getByRole("heading", { level: 1, name: titulo }))
        .withContext(ruta).toBeTruthy();
      unmount();
    }
  });
  it("APP-03: una ruta desconocida muestra la página 404", () => {
    renderApp("/ruta-que-no-existe");
    expect(screen.getByText("404")).toBeTruthy();
  });
  it("APP-04: navegar con el menú cambia de página sin recargar", () => {
    renderApp("/");
    fireEvent.click(within(screen.getByRole("navigation")).getByRole("link", { name: "Contacto" }));
    expect(screen.getByRole("heading", { level: 1, name: "Contacto" })).toBeTruthy();
  });
  it("APP-05: flujo completo: catálogo → añadir → carrito → checkout", () => {
    renderApp("/productos");
    fireEvent.click(screen.getByRole("button", { name: "Añadir Gorra Corteiz al carrito" }));
    expect(screen.getByTestId("contador-carrito").textContent).toBe("1");
    fireEvent.click(screen.getByRole("link", { name: "Ir a pagar" }));
    expect(screen.getByRole("heading", { name: "Datos de envío" })).toBeTruthy();
    expect(screen.getByText("Gorra Corteiz × 1")).toBeTruthy();
  });
});
