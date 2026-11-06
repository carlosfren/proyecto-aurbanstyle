# UrbanStyle · Tienda React + TypeScript + Bootstrap

Migración de la plantilla HTML/CSS/JS de UrbanStyle a **React 19** (Vite + TypeScript) con
**React Router**, **Bootstrap 5** (diseño responsivo) y pruebas unitarias con **Jasmine + Karma**.

## Requisitos
- Node.js 20 o superior
- Google Chrome instalado (Karma lo abre en modo *headless*)

## Comandos
| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo (http://localhost:5173) |
| `npm run build` | Compila TypeScript y genera `dist/` |
| `npm run lint` | Revisa el código con ESLint |
| `npm test` | Ejecuta todas las pruebas (Jasmine + Karma, una vez) |
| `npm run test:watch` | Pruebas en modo observador |
| `npm run test:coverage` | Pruebas + informe de cobertura en `coverage/index.html` |
| `npm run typecheck:test` | Verifica los tipos de los archivos `.spec` |

## Estructura
```
src/
├── components/   Boton, Contenedor, Tarjeta, TarjetaCuerpo, TarjetaProducto,
│                 CampoFormulario, BarraNavegacion, PiePagina, MenuCarrito (+ .spec)
├── pages/        Inicio, Productos, ProductoDetalle, Checkout, Contacto,
│                 Suscripcion, Blog, Nosotros, NoEncontrado (+ .spec)
├── context/      CarritoContext (Provider + hook) y carritoReducer (lógica pura)
├── hooks/        useFormulario (formularios controlados + validación)
├── utils/        validaciones, formato de precios, filtros
├── data/         Producto, Paginas, Blog
├── test/         Utilidades compartidas de prueba
└── styles/       app.css (solo estilos propios; el resto es Bootstrap)
docs/             Matriz de casos de prueba
```
