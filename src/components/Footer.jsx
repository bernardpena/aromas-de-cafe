import React from 'react';
<<<<<<< HEAD
import '../assets/css/footer.css';

function Footer() {
    return (
        <footer className="text-light text-center navbar-dark bg-dark py-4 ">
            <div className="container navbar-dark bg-dark">
=======

function Footer() {
    return (
        <footer className="colorFondo text-light text-center py-4 ">
            <div className="container">
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
                <p>&copy; 2024 Aromas de Café</p>
                <p>Todos los derechos reservados.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
<<<<<<< HEAD
                        <a href="/politica-privacidad" className="text-light">Política de Privacidad</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terminos-de-servicio" className="text-light">Términos de Servicio</a>
=======
                        <a href="/privacy" className="text-light">Política de Privacidad</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terms" className="text-light">Términos de Servicio</a>
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;