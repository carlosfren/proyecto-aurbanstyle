import { validarCorreo, validarDireccion, validarMensaje, validarNombre, validarTelefono } from "./validaciones";

describe("validarNombre", () => {
  it("VAL-01: rechaza vacío o solo espacios", () => {
    expect(validarNombre("")).toBe("El nombre es obligatorio.");
    expect(validarNombre("   ")).toBe("El nombre es obligatorio.");
  });
  it("VAL-02: rechaza menos de 3 caracteres", () => {
    expect(validarNombre("Al")).toContain("al menos 3");
  });
  it("VAL-03: rechaza números y símbolos", () => {
    expect(validarNombre("Ana123")).toContain("solo puede contener letras");
  });
  it("VAL-04: acepta nombres con tildes, ñ y espacios", () => {
    expect(validarNombre("María Peña")).toBe("");
  });
});

describe("validarCorreo", () => {
  it("VAL-05: rechaza vacío", () => {
    expect(validarCorreo("")).toBe("El correo es obligatorio.");
  });
  it("VAL-06: rechaza formatos inválidos", () => {
    for (const malo of ["ana", "ana@", "ana@correo", "ana@correo.c", "a na@correo.cl"]) {
      expect(validarCorreo(malo)).withContext(malo).not.toBe("");
    }
  });
  it("VAL-07: acepta un correo válido", () => {
    expect(validarCorreo("ana@correo.cl")).toBe("");
  });
});

describe("validarTelefono", () => {
  it("VAL-08: rechaza vacío", () => {
    expect(validarTelefono("")).toBe("El teléfono es obligatorio.");
  });
  it("VAL-09: rechaza números que no son celular chileno", () => {
    for (const malo of ["12345678", "812345678", "+56 2 2345 6789", "9123"]) {
      expect(validarTelefono(malo)).withContext(malo).not.toBe("");
    }
  });
  it("VAL-10: acepta formatos válidos (con y sin +56, espacios o guiones)", () => {
    for (const bueno of ["912345678", "+56912345678", "+56 9 1234 5678", "9-1234-5678"]) {
      expect(validarTelefono(bueno)).withContext(bueno).toBe("");
    }
  });
});

describe("validarMensaje", () => {
  it("VAL-11: rechaza vacío", () => {
    expect(validarMensaje("")).toBe("El mensaje es obligatorio.");
  });
  it("VAL-12: rechaza menos de 10 caracteres", () => {
    expect(validarMensaje("hola")).toContain("al menos 10");
  });
  it("VAL-13: rechaza más de 500 caracteres", () => {
    expect(validarMensaje("a".repeat(501))).toContain("500");
  });
  it("VAL-14: acepta largo válido (límites 10 y 500)", () => {
    expect(validarMensaje("a".repeat(10))).toBe("");
    expect(validarMensaje("a".repeat(500))).toBe("");
  });
});

describe("validarDireccion", () => {
  it("VAL-15: rechaza vacío y direcciones muy cortas", () => {
    expect(validarDireccion("")).toBe("La dirección es obligatoria.");
    expect(validarDireccion("Av 1")).toContain("más completa");
  });
  it("VAL-16: acepta una dirección completa", () => {
    expect(validarDireccion("O'Higgins 123, Concepción")).toBe("");
  });
});
