import { fireEvent, render, screen } from "@testing-library/react";
import Boton from "./Boton";
import "../test/utils";

describe("Boton", () => {
  it("BTN-01: muestra su contenido (children)", () => {
    render(<Boton>Comprar</Boton>);
    expect(screen.getByRole("button", { name: "Comprar" })).toBeTruthy();
  });
  it("BTN-02: por defecto es type=button y clase btn btn-primary", () => {
    render(<Boton>Ok</Boton>);
    const b = screen.getByRole("button");
    expect(b.getAttribute("type")).toBe("button");
    expect(b.className).toBe("btn btn-primary");
  });
  it("BTN-03: acepta tipo y clase personalizados (props)", () => {
    render(<Boton tipo="submit" clase="btn btn-danger">Enviar</Boton>);
    const b = screen.getByRole("button");
    expect(b.getAttribute("type")).toBe("submit");
    expect(b.className).toBe("btn btn-danger");
  });
  it("BTN-04: ejecuta alHacerClic al hacer clic (mock)", () => {
    const alHacerClic = jasmine.createSpy("alHacerClic");
    render(<Boton alHacerClic={alHacerClic}>Ok</Boton>);
    fireEvent.click(screen.getByRole("button"));
    expect(alHacerClic).toHaveBeenCalledTimes(1);
  });
  it("BTN-05: deshabilitado no dispara el clic", () => {
    const alHacerClic = jasmine.createSpy("alHacerClic");
    render(<Boton deshabilitado alHacerClic={alHacerClic}>Ok</Boton>);
    const b = screen.getByRole("button") as HTMLButtonElement;
    fireEvent.click(b);
    expect(b.disabled).toBeTrue();
    expect(alHacerClic).not.toHaveBeenCalled();
  });
  it("BTN-06: sin handler no falla al hacer clic y expone aria-label", () => {
    render(<Boton ariaLabel="Cerrar">x</Boton>);
    expect(() => fireEvent.click(screen.getByLabelText("Cerrar"))).not.toThrow();
  });
});
