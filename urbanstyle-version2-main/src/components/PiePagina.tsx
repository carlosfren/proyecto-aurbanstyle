import { Link } from "react-router-dom";
import { PAGINAS } from "../data/Paginas";

function PiePagina() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 border-top border-danger border-3">
      <ul className="nav justify-content-center border-bottom border-secondary border-opacity-25 pb-3 mb-3">
        {PAGINAS.map((pag) => (
          <li className="nav-item" key={pag.ruta}>
            <Link className="nav-link px-3 text-white fw-medium" to={pag.ruta}>
              {pag.nombre}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center mb-0">
        <span className="brand-logo fs-6">
          URBAN<span className="brand-accent">STYLE</span>
        </span>
      </p>
    </footer>
  );
}

export default PiePagina;
