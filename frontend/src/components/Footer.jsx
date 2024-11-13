import React from 'react';
import '../assets/footer.css';

function Footer() {
    return (
        <footer className="colorFondo text-light text-center py-4 ">
            <div className="container">
                <p>&copy; 2024 Aromas de Café</p>
                <p>Todos los derechos reservados.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/privacy" className="text-light">Política de Privacidad</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terms" className="text-light">Términos de Servicio</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;