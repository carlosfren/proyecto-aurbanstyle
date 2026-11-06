export interface Pagina {
  nombre: string;
  ruta: string;
}

// Fuente única de verdad para la navegación (navbar y footer).
export const PAGINAS: Pagina[] = [
  { nombre: "Inicio", ruta: "/" },
  { nombre: "Productos", ruta: "/productos" },
  { nombre: "Blog", ruta: "/blog" },
  { nombre: "Suscripción", ruta: "/suscripcion" },
  { nombre: "Contacto", ruta: "/contacto" },
  { nombre: "Sobre nosotros", ruta: "/nosotros" },
];
