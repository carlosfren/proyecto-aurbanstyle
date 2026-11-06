import { fireEvent, screen } from "@testing-library/react";
import Contacto from "./Contacto";
import Suscripcion from "./Suscripcion";
import Checkout from "./Checkout";
import { CLAVE_STORAGE } from "../context/CarritoContext";
import { CARRITO_EJEMPLO, guardarCarrito, renderConProveedores } from "../test/utils";

const escribir = (etiqueta: string, valor: string) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
const clic = (nombre: string) => fireEvent.click(screen.getByRole("button", { name: nombre }));

describe("Contacto (formulario con validación)", () => {
  beforeEach(() => renderConProveedores(<Contacto />, "/contacto"));

  it("FCO-01: enviar vacío muestra los 3 errores y no confirma el envío", () => {
    clic("Enviar mensaje");
    expect(screen.getAllByRole("alert").map((a) => a.textContent)).toEqual([
      "El nombre es obligatorio.",
      "El correo es obligatorio.",
      "El mensaje es obligatorio.",
    ]);
    expect(screen.queryByText(/Mensaje enviado/)).toBeNull();
  });
  it("FCO-02: no muestra errores mientras el usuario no haya tocado el campo", () => {
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("FCO-03: al salir de un campo inválido (blur) aparece su error y se marca is-invalid", () => {
    escribir("Correo electrónico", "ana@");
    fireEvent.blur(screen.getByLabelText("Correo electrónico"));
    expect(screen.getByRole("alert").textContent).toContain("correo válido");
    expect(screen.getByLabelText("Correo electrónico").className).toContain("is-invalid");
  });
  it("FCO-04: corregir el valor elimina el error", () => {
    escribir("Nombre", "A");
    fireEvent.blur(screen.getByLabelText("Nombre"));
    expect(screen.getByRole("alert")).toBeTruthy();
    escribir("Nombre", "Ana");
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("FCO-05: con datos válidos confirma el envío y limpia el formulario", () => {
    escribir("Nombre", "Ana Pérez");
    escribir("Correo electrónico", "ana@correo.cl");
    escribir("Mensaje", "Hola, quiero consultar por tallas.");
    clic("Enviar mensaje");
    expect(screen.getByText(/Mensaje enviado/)).toBeTruthy();
    expect((screen.getByLabelText("Nombre") as HTMLInputElement).value).toBe("");
    expect(screen.queryByRole("alert")).toBeNull(); // el formulario reiniciado no muestra errores
  });
});

describe("Suscripcion", () => {
  beforeEach(() => renderConProveedores(<Suscripcion />, "/suscripcion"));

  it("FSU-01: enviar vacío muestra errores de nombre y correo", () => {
    clic("Suscribirme");
    expect(screen.getAllByRole("alert").length).toBe(2);
  });
  it("FSU-02: con datos válidos confirma la suscripción con el nombre", () => {
    escribir("Nombre", "Luis");
    escribir("Correo electrónico", "luis@correo.cl");
    clic("Suscribirme");
    expect(screen.getByText("¡Listo, Luis! Ya estás suscrito.")).toBeTruthy();
  });
});

describe("Checkout (compra)", () => {
  it("FCH-01: con el carrito vacío ofrece ir al catálogo", () => {
    renderConProveedores(<Checkout />, "/checkout");
    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Ir al catálogo" }).getAttribute("href")).toBe("/productos");
  });
  it("FCH-02: muestra el resumen del pedido con el total", () => {
    guardarCarrito(CARRITO_EJEMPLO);
    renderConProveedores(<Checkout />, "/checkout");
    expect(screen.getByText("Polerón Emotion × 2")).toBeTruthy();
    expect(screen.getByText("$79.970")).toBeTruthy();
  });
  it("FCH-03: datos inválidos no completan la compra (el carrito se conserva)", () => {
    guardarCarrito(CARRITO_EJEMPLO);
    renderConProveedores(<Checkout />, "/checkout");
    escribir("Teléfono", "123");
    clic("Confirmar compra");
    expect(screen.getByText(/celular chileno válido/)).toBeTruthy();
    expect(screen.queryByText(/Gracias por tu compra/)).toBeNull();
    expect(JSON.parse(localStorage.getItem(CLAVE_STORAGE)!).length).toBe(2);
  });
  it("FCH-04: datos válidos confirman la compra y vacían el carrito", () => {
    guardarCarrito(CARRITO_EJEMPLO);
    renderConProveedores(<Checkout />, "/checkout");
    escribir("Nombre completo", "Ana Pérez");
    escribir("Correo electrónico", "ana@correo.cl");
    escribir("Teléfono", "+56 9 1234 5678");
    escribir("Dirección de despacho", "O'Higgins 123, Concepción");
    clic("Confirmar compra");
    expect(screen.getByText("¡Gracias por tu compra, Ana Pérez!")).toBeTruthy();
    expect(localStorage.getItem(CLAVE_STORAGE)).toBe("[]");
  });
});
