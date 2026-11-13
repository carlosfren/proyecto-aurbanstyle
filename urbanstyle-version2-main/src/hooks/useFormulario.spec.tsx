import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { act, renderHook } from "@testing-library/react";
import { useFormulario } from "./useFormulario";
import { validarCorreo, validarNombre } from "../utils/validaciones";
import "../test/utils";

const cambio = (name: string, value: string) => ({ target: { name, value } }) as unknown as ChangeEvent<HTMLInputElement>;
const salida = (name: string) => ({ target: { name } }) as unknown as FocusEvent<HTMLInputElement>;
const hook = () => renderHook(() => useFormulario({ nombre: "", correo: "" }, { nombre: validarNombre, correo: validarCorreo }));

describe("useFormulario", () => {
  it("FRM-01: inicia con los valores iniciales y es inválido", () => {
    const { result } = hook();
    expect(result.current.valores).toEqual({ nombre: "", correo: "" });
    expect(result.current.esValido).toBeFalse();
  });
  it("FRM-02: alCambiar actualiza solo el campo indicado", () => {
    const { result } = hook();
    act(() => result.current.alCambiar(cambio("nombre", "Ana")));
    expect(result.current.valores).toEqual({ nombre: "Ana", correo: "" });
  });
  it("FRM-03: no muestra errores hasta que el campo se toca (blur)", () => {
    const { result } = hook();
    expect(result.current.errorVisible("nombre")).toBe("");
    act(() => result.current.alSalir(salida("nombre")));
    expect(result.current.errorVisible("nombre")).toBe("El nombre es obligatorio.");
    expect(result.current.errorVisible("correo")).toBe("");
  });
  it("FRM-04: el error desaparece al corregir el valor", () => {
    const { result } = hook();
    act(() => result.current.alSalir(salida("nombre")));
    act(() => result.current.alCambiar(cambio("nombre", "Ana")));
    expect(result.current.errorVisible("nombre")).toBe("");
  });
  it("FRM-05: esValido es true cuando todos los campos cumplen", () => {
    const { result } = hook();
    act(() => result.current.alCambiar(cambio("nombre", "Ana")));
    act(() => result.current.alCambiar(cambio("correo", "ana@correo.cl")));
    expect(result.current.esValido).toBeTrue();
  });
  it("FRM-06: manejarEnvio NO llama al callback si hay errores, pero muestra todos los errores", () => {
    const { result } = hook();
    const alEnviar = jasmine.createSpy("alEnviar");
    const evento = { preventDefault: jasmine.createSpy("preventDefault") } as unknown as FormEvent;
    act(() => result.current.manejarEnvio(alEnviar)(evento));
    expect(evento.preventDefault).toHaveBeenCalled();
    expect(alEnviar).not.toHaveBeenCalled();
    expect(result.current.errorVisible("correo")).toBe("El correo es obligatorio.");
  });
  it("FRM-07: manejarEnvio llama al callback con los valores si es válido", () => {
    const { result } = hook();
    const alEnviar = jasmine.createSpy("alEnviar");
    act(() => result.current.alCambiar(cambio("nombre", "Ana")));
    act(() => result.current.alCambiar(cambio("correo", "ana@correo.cl")));
    act(() => result.current.manejarEnvio(alEnviar)({ preventDefault() {} } as unknown as FormEvent));
    expect(alEnviar).toHaveBeenCalledOnceWith({ nombre: "Ana", correo: "ana@correo.cl" });
  });
  it("FRM-08: reiniciar restaura valores y oculta errores", () => {
    const { result } = hook();
    act(() => result.current.alCambiar(cambio("nombre", "A")));
    act(() => result.current.alSalir(salida("nombre")));
    act(() => result.current.reiniciar());
    expect(result.current.valores.nombre).toBe("");
    expect(result.current.errorVisible("nombre")).toBe("");
  });
});
