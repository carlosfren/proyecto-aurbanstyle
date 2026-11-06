// Modelo de datos del catálogo. El precio es numérico para poder calcular totales del carrito.
export type Categoria = "Polerones" | "Poleras" | "Gorras" | "Shorts";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  urlImagen: string;
  altImagen: string;
}

export const CATEGORIAS: Categoria[] = ["Polerones", "Poleras", "Gorras", "Shorts"];

export const PRODUCTOS: Producto[] = [
  {
    id: "A1",
    nombre: "Polerón Emotion",
    descripcion: "Polerón de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
    precio: 29990,
    categoria: "Polerones",
    urlImagen: "/imagen/images.pgn.jpg",
    altImagen: "Polerón Emotion oversize",
  },
  {
    id: "B2",
    nombre: "Polerón Valley United",
    descripcion: "Polerón de alta calidad 100% algodón.",
    precio: 32990,
    categoria: "Polerones",
    urlImagen: "/imagen/imagen3.pgn.jpg",
    altImagen: "Polerón Valley United",
  },
  {
    id: "C3",
    nombre: "Polerón Valley Dream Edición Especial",
    descripcion: "Edición especial en color único con acabados de primera calidad.",
    precio: 34990,
    categoria: "Polerones",
    urlImagen: "/imagen/imagenes2.pgn.jpg",
    altImagen: "Polerón Valley Dream edición especial",
  },
  {
    id: "D4",
    nombre: "Polerón Valley Dream",
    descripcion: "Polerón de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
    precio: 29990,
    categoria: "Polerones",
    urlImagen: "/imagen/imagen4.pgn.webp",
    altImagen: "Polerón Valley Dream",
  },
  {
    id: "E5",
    nombre: "Gorra Supreme",
    descripcion: "Gorra marca Supreme de alta calidad, disponible en todas sus tallas.",
    precio: 19990,
    categoria: "Gorras",
    urlImagen: "/imagen/imagengorra5.pgn.jpg",
    altImagen: "Gorra Supreme",
  },
  {
    id: "F6",
    nombre: "Short Valley Dream",
    descripcion: "Short de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
    precio: 29990,
    categoria: "Shorts",
    urlImagen: "/imagen/pantalon-brillo.avif",
    altImagen: "Short Valley Dream",
  },
  {
    id: "G7",
    nombre: "Polera Valley Dream",
    descripcion: "Polera de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
    precio: 24990,
    categoria: "Poleras",
    urlImagen: "/imagen/polera-valley-dreams.avif",
    altImagen: "Polera Valley Dream",
  },
  {
    id: "H8",
    nombre: "Gorra Corteiz",
    descripcion: "Gorra marca Corteiz de alta calidad, disponible en todas sus tallas.",
    precio: 19990,
    categoria: "Gorras",
    urlImagen: "/imagen/gorra-corteiz.avif",
    altImagen: "Gorra Corteiz",
  },
];
