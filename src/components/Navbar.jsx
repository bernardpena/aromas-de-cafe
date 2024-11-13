import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="logo" src="../public/AromasdeCafe_LOGO.png" alt="Aromas de Café Logo"></img>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Inicio de Sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Carrito</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
