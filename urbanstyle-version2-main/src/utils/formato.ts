/** Formatea un número como precio chileno: 29990 -> "$29.990". */
export function formatearPrecio(valor: number): string {
  const entero = Math.round(valor);
  const signo = entero < 0 ? "-" : "";
  const texto = Math.abs(entero)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${signo}$${texto}`;
}
