import React from 'react';
import '../assets/css/footer.css';

function Footer() {
    return (
        <footer className="text-light text-center navbar-dark colorFondo py-4 ">
            <div className="container navbar-dark colorFondo">
                <p>&copy; 2024 Aromas de Café</p>
                <p>Todos los derechos reservados.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/politica-privacidad" className="text-light">Política de Privacidad</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terminos-de-servicio" className="text-light">Términos de Servicio</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;