export interface Entrada {
  id: number;
  titulo: string;
  fecha: string;
  categoria: string;
  tiempoLectura: string;
  resumen: string;
  contenido: string[];
  textoCatalogo: string;
}

export const ENTRADAS: Entrada[] = [
  {
    id: 1,
    titulo: "Cómo combinar un polerón oversize",
    fecha: "2026-10-12",
    categoria: "Estilo",
    tiempoLectura: "2 min de lectura",
    resumen:
      "Tres looks simples para llevar tu polerón favorito a la universidad, al barrio o a una salida.",
    contenido: [
      "1. Look diario / Universidad: Combina un polerón oversize negro o gris con pantalones cargo holgados y zapatillas urbanas de caña baja.",
      "2. Estilo relajado de barrio: Úsalo junto a shorts de algodón pesado y calcetines altos visibles para equilibrar las proporciones.",
      "3. Salida nocturna: Súmale una polera básica blanca que asome levemente por debajo del borde y una gorra estructurada.",
    ],
    textoCatalogo: "Ver polerones en el catálogo →",
  },
  {
    id: 2,
    titulo: "Cuidado de prendas de algodón full brillo",
    fecha: "2026-10-28",
    categoria: "Cuidados",
    tiempoLectura: "2 min de lectura",
    resumen:
      "Lava en frío, del revés y sin secadora para que el brillo dure más.",
    contenido: [
      "• Temperatura del agua: Lava siempre con agua fría (máximo 30 °C) en ciclo suave para evitar que la fibra pierda su acabado satinado.",
      "• Protección del estampado: Da vuelta la prenda antes de meterla a la lavadora para reducir el roce directo con otras telas.",
      "• Secado natural: Evita la secadora y el sol directo prolongado; cuelga el polerón o polera a la sombra en un colgador ancho.",
    ],
    textoCatalogo: "Explorar prendas de algodón →",
  },
  {
    id: 3,
    titulo: "Gorras: guía de tallas y ajuste",
    fecha: "2026-11-03",
    categoria: "Guía",
    tiempoLectura: "3 min de lectura",
    resumen: "Aprende a medir tu cabeza y a elegir entre visera plana y curva.",
    contenido: [
      "• Cómo medirte: Pasa una cinta métrica alrededor de tu cabeza, aproximadamente 1 cm por encima de las cejas y las orejas.",
      "• Referencia de ajuste: Entre 55 y 57 cm corresponde a ajuste S/M; entre 58 y 60 cm a ajuste L/XL (nuestros modelos incluyen broche trasero regulable).",
      "• Elección de visera: La visera plana aporta un corte streetwear más marcado, mientras que la visera curva entrega un calce clásico y versátil.",
    ],
    textoCatalogo: "Ver productos disponibles →",
  },
];
