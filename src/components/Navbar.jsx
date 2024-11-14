import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css'; // Asegúrate de tener tus estilos aquí
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onLoginClick, cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="logo" src="../public/AromasdeCafe_LOGO.png" alt="Aromas de Café Logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register"><FontAwesomeIcon icon={faUserPlus} /> Registro</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onLoginClick}><FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión</a>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;