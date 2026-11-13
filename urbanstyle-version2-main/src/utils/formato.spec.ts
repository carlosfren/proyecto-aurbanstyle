import { formatearPrecio } from "./formato";

describe("formatearPrecio", () => {
  it("FMT-01: agrega separador de miles con punto", () => {
    expect(formatearPrecio(29990)).toBe("$29.990");
  });
  it("FMT-02: no agrega separador a números menores a 1000", () => {
    expect(formatearPrecio(990)).toBe("$990");
  });
  it("FMT-03: maneja millones", () => {
    expect(formatearPrecio(1234567)).toBe("$1.234.567");
  });
  it("FMT-04: maneja cero", () => {
    expect(formatearPrecio(0)).toBe("$0");
  });
  it("FMT-05: redondea decimales", () => {
    expect(formatearPrecio(1999.6)).toBe("$2.000");
  });
  it("FMT-06: conserva el signo en negativos", () => {
    expect(formatearPrecio(-5000)).toBe("-$5.000");
  });
});
