import { useState } from "react";
import { Link } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import { PRODUCTOS } from "../data/Producto";

const DESTACADOS = PRODUCTOS.slice(0, 4);

interface Garantia {
  id: string;
  titulo: string;
  detalle: string;
  icono: React.ReactNode;
}

const GARANTIAS: Garantia[] = [
  {
    id: "envios",
    titulo: "Envíos a todo Chile",
    detalle:
      "Despachos en 24 a 48 horas hábiles vía Starken o Bluexpress con seguimiento en línea. Retiro gratuito disponible en Concepción.",
    icono: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff2c3a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "cambios",
    titulo: "Cambios dentro de 10 días",
    detalle:
      "Si necesitas otra talla oversize o modelo, tienes 10 días corridos desde la recepción para solicitar cambio con la prenda sin uso y con su etiqueta.",
    icono: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff2c3a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    id: "pago",
    titulo: "Pago seguro",
    detalle:
      "Tus compras están protegidas bajo cifrado SSL. Aceptamos tarjetas de débito, crédito (Webpay) y transferencias electrónicas verificadas.",
    icono: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff2c3a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

function Inicio() {
  const [garantiaActiva, setGarantiaActiva] = useState<string | null>(null);
  const [inclinacion, setInclinacion] = useState({ rotateX: 0, rotateY: 0 });

  const alternarGarantia = (id: string) => {
    setGarantiaActiva((actual) => (actual === id ? null : id));
  };

  const manejarMovimientoMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centroX = rect.width / 2;
    const centroY = rect.height / 2;

    const rotateX = ((y - centroY) / centroY) * -16;
    const rotateY = ((x - centroX) / centroX) * 16;

    setInclinacion({ rotateX, rotateY });
  };

  const reiniciarInclinacion = () => {
    setInclinacion({ rotateX: 0, rotateY: 0 });
  };

  const estaInclinada = inclinacion.rotateX !== 0 || inclinacion.rotateY !== 0;

  return (
    <>
      <section className="hero text-center text-white rounded-4 p-4 p-md-5 my-4">
        <h1 className="display-5 fw-bold">Streetwear con identidad</h1>
        <p className="lead mb-4">
          Polerones, poleras, gorras y shorts oversize de algodón full brillo.
        </p>

        {/* Tarjeta visual dinámica sin navegación */}
        <div className="d-flex justify-content-center my-4">
          <div
            className="hero-showcase-card"
            onMouseMove={manejarMovimientoMouse}
            onMouseLeave={reiniciarInclinacion}
            style={{
              transform: estaInclinada
                ? `perspective(900px) rotateX(${inclinacion.rotateX}deg) rotateY(${inclinacion.rotateY}deg) scale3d(1.04, 1.04, 1.04)`
                : "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
              transition: estaInclinada
                ? "transform 0.08s ease-out, box-shadow 0.3s ease, border-color 0.3s ease"
                : "transform 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease",
            }}
          >
            <img src="/imagen/images.jpg" alt="Estilo urbano UrbanStyle" />
          </div>
        </div>

        <Link to="/productos" className="btn btn-danger btn-lg">
          Ver catálogo
        </Link>
      </section>

      <h2 className="h3 text-center my-4">Productos destacados</h2>
      {/* Grilla responsiva: 1 columna en móvil, 2 en tablet, 4 en escritorio */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {DESTACADOS.map((prod) => (
          <div className="col" key={prod.id}>
            <TarjetaProducto producto={prod} />
          </div>
        ))}
      </div>

      {/* Bloque interactivo de garantías */}
      <div className="row text-center g-3 mt-4 align-items-start">
        {GARANTIAS.map((item) => {
          const abierta = garantiaActiva === item.id;
          return (
            <div className="col-12 col-md-4" key={item.id}>
              <button
                type="button"
                onClick={() => alternarGarantia(item.id)}
                aria-expanded={abierta}
                className={`card w-100 p-4 text-center bg-white align-items-center ${
                  abierta ? "garantia-activa" : ""
                }`}
              >
                <div className="mb-2">{item.icono}</div>
                <p className="mb-1 fw-bold text-dark">{item.titulo}</p>
                <span className="small text-danger fw-semibold">
                  {abierta ? "Ocultar detalle ▴" : "Ver detalle ▾"}
                </span>

                {abierta && (
                  <div className="w-100 pt-3 mt-3 border-top text-muted small">
                    {item.detalle}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Inicio;
