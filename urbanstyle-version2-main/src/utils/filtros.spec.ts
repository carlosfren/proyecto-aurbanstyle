import { PRODUCTOS } from "../data/Producto";
import { filtrarProductos } from "./filtros";

describe("filtrarProductos", () => {
  it("FIL-01: sin filtros devuelve todo el catálogo", () => {
    expect(filtrarProductos("", "Todas").length).toBe(PRODUCTOS.length);
  });
  it("FIL-02: filtra por texto sin distinguir mayúsculas", () => {
    const r = filtrarProductos("GORRA", "Todas");
    expect(r.length).toBe(2);
    expect(r.every((p) => p.nombre.toLowerCase().includes("gorra"))).toBeTrue();
  });
  it("FIL-03: filtra por categoría", () => {
    const r = filtrarProductos("", "Poleras");
    expect(r.map((p) => p.id)).toEqual(["G7"]);
  });
  it("FIL-04: combina texto y categoría", () => {
    expect(filtrarProductos("corteiz", "Gorras").length).toBe(1);
    expect(filtrarProductos("corteiz", "Shorts").length).toBe(0);
  });
  it("FIL-05: ignora espacios alrededor del texto", () => {
    expect(filtrarProductos("  short  ", "Todas").length).toBe(1);
  });
  it("FIL-06: devuelve vacío si no hay coincidencias", () => {
    expect(filtrarProductos("zapatillas", "Todas")).toEqual([]);
  });
});

describe("datos del catálogo", () => {
  it("DAT-01: todos los ids son únicos", () => {
    const ids = PRODUCTOS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("DAT-02: precios numéricos positivos y rutas de imagen absolutas", () => {
    for (const p of PRODUCTOS) {
      expect(p.precio).toBeGreaterThan(0);
      expect(p.urlImagen.startsWith("/imagen/")).withContext(p.id).toBeTrue();
    }
  });
});
