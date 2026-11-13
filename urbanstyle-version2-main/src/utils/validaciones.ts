// Funciones puras de validación. Devuelven un mensaje de error o "" si el valor es válido.
export type Validador = (valor: string) => string;

export const validarNombre: Validador = (valor) => {
  const v = valor.trim();
  if (v === "") return "El nombre es obligatorio.";
  if (v.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/.test(v)) return "El nombre solo puede contener letras.";
  return "";
};

export const validarCorreo: Validador = (valor) => {
  const v = valor.trim();
  if (v === "") return "El correo es obligatorio.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Ingresa un correo válido (ej: nombre@correo.cl).";
  return "";
};

// Teléfono chileno: 9 dígitos comenzando con 9, con o sin +56 / espacios.
export const validarTelefono: Validador = (valor) => {
  const limpio = valor.replace(/[\s-]/g, "");
  if (limpio === "") return "El teléfono es obligatorio.";
  if (!/^(\+?56)?9\d{8}$/.test(limpio)) return "Ingresa un celular chileno válido (ej: +56 9 1234 5678).";
  return "";
};

export const validarMensaje: Validador = (valor) => {
  const v = valor.trim();
  if (v === "") return "El mensaje es obligatorio.";
  if (v.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
  if (v.length > 500) return "El mensaje no puede superar los 500 caracteres.";
  return "";
};

export const validarDireccion: Validador = (valor) => {
  const v = valor.trim();
  if (v === "") return "La dirección es obligatoria.";
  if (v.length < 6) return "Ingresa una dirección más completa.";
  return "";
};
