import { fireEvent, render, screen } from "@testing-library/react";
import CampoFormulario from "./CampoFormulario";
import "../test/utils";

const base = { id: "nombre", name: "nombre", etiqueta: "Nombre", valor: "" };

describe("CampoFormulario", () => {
  it("CFO-01: asocia la etiqueta con el input (accesibilidad)", () => {
    render(
      <CampoFormulario {...base} alCambiar={() => {}} alSalir={() => {}} />,
    );
    expect(screen.getByLabelText("Nombre").tagName).toBe("INPUT");
  });
  it("CFO-02: tipo=textarea renderiza un <textarea>", () => {
    render(
      <CampoFormulario
        {...base}
        tipo="textarea"
        alCambiar={() => {}}
        alSalir={() => {}}
      />,
    );
    expect(screen.getByLabelText("Nombre").tagName).toBe("TEXTAREA");
  });
  it("CFO-03: sin error no muestra mensaje ni clase is-invalid", () => {
    render(
      <CampoFormulario {...base} alCambiar={() => {}} alSalir={() => {}} />,
    );
    const input = screen.getByLabelText("Nombre");
    expect(input.className).toBe("form-control");
    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("CFO-04: con error muestra el mensaje, is-invalid, aria-invalid y aria-describedby", () => {
    render(
      <CampoFormulario
        {...base}
        error="Campo requerido"
        alCambiar={() => {}}
        alSalir={() => {}}
      />,
    );
    const input = screen.getByLabelText("Nombre");
    expect(input.className).toContain("is-invalid");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    const alerta = screen.getByRole("alert");
    expect(alerta.textContent).toBe("Campo requerido");
    expect(input.getAttribute("aria-describedby")).toBe(alerta.id);
  });
  it("CFO-05: es un componente controlado: refleja 'valor'", () => {
    render(
      <CampoFormulario
        {...base}
        valor="Ana"
        alCambiar={() => {}}
        alSalir={() => {}}
      />,
    );
    expect((screen.getByLabelText("Nombre") as HTMLInputElement).value).toBe(
      "Ana",
    );
  });
  it("CFO-06: dispara alCambiar y alSalir (mocks)", () => {
    const alCambiar = jasmine.createSpy("alCambiar");
    const alSalir = jasmine.createSpy("alSalir");
    render(
      <CampoFormulario {...base} alCambiar={alCambiar} alSalir={alSalir} />,
    );
    const input = screen.getByLabelText("Nombre");
    fireEvent.change(input, { target: { value: "Luis" } });
    fireEvent.blur(input);
    expect(alCambiar).toHaveBeenCalledTimes(1);
    expect(alSalir).toHaveBeenCalledTimes(1);
  });
});
