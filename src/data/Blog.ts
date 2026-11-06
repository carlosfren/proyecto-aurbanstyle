export interface Entrada {
  id: number;
  titulo: string;
  fecha: string;
  resumen: string;
}

export const ENTRADAS: Entrada[] = [
  {
    id: 1,
    titulo: "Cómo combinar un polerón oversize",
    fecha: "2026-10-12",
    resumen: "Tres looks simples para llevar tu polerón favorito a la universidad, al barrio o a una salida.",
  },
  {
    id: 2,
    titulo: "Cuidado de prendas de algodón full brillo",
    fecha: "2026-10-28",
    resumen: "Lava en frío, del revés y sin secadora para que el brillo dure más.",
  },
  {
    id: 3,
    titulo: "Gorras: guía de tallas y ajuste",
    fecha: "2026-11-03",
    resumen: "Aprende a medir tu cabeza y a elegir entre visera plana y curva.",
  },
];
