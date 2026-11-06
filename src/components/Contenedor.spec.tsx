import { render, screen } from "@testing-library/react";
import Contenedor from "./Contenedor";
import "../test/utils";

describe("Contenedor", () => {
  it("CON-01: usa la clase 'container' por defecto y renderiza children", () => {
    render(<Contenedor><p>Hola</p></Contenedor>);
    const p = screen.getByText("Hola");
    expect(p.parentElement!.className).toBe("container");
  });
  it("CON-02: permite personalizar la clase", () => {
    render(<Contenedor clase="container-fluid"><p>Hola</p></Contenedor>);
    expect(screen.getByText("Hola").parentElement!.className).toBe("container-fluid");
  });
});
