import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import type { Validador } from "../utils/validaciones";

type Valores = Record<string, string>;

/**
 * Hook genérico para formularios controlados con validación.
 * - valores / tocados / enviado viven en estado de React; los errores se derivan de los valores.
 * - Los errores solo se muestran tras salir del campo (blur) o al intentar enviar.
 */
export function useFormulario<T extends Valores>(
  inicial: T,
  validadores: { [K in keyof T]?: Validador },
) {
  const [valores, setValores] = useState<T>(inicial);
  const [tocados, setTocados] = useState<Record<string, boolean>>({});
  const [enviado, setEnviado] = useState(false);

  const errores = Object.keys(inicial).reduce<Record<string, string>>((acc, campo) => {
    const validar = validadores[campo as keyof T];
    acc[campo] = validar ? validar(valores[campo]) : "";
    return acc;
  }, {});

  const esValido = Object.values(errores).every((e) => e === "");

  const alCambiar = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const alSalir = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTocados((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const errorVisible = (campo: keyof T & string): string =>
    tocados[campo] || enviado ? errores[campo] : "";

  /** Envuelve tu función: solo se ejecuta si el formulario es válido. */
  const manejarEnvio = (alEnviar: (v: T) => void) => (e: FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    if (esValido) alEnviar(valores);
  };

  const reiniciar = () => {
    setValores(inicial);
    setTocados({});
    setEnviado(false);
  };

  return { valores, errores, esValido, alCambiar, alSalir, errorVisible, manejarEnvio, reiniciar };
}
