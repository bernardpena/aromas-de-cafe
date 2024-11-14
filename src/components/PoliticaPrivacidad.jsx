import React from 'react';
import '../assets/css/politicaPrivacidad.css';

const PoliticaPrivacidad = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Política de Privacidad</h1>
            <p>Última actualización: [Fecha]</p>

            <h2>1. Introducción</h2>
            <p>
                Esta Política de Privacidad describe cómo Aromas de Cafe nosotros, recopila, utiliza y comparte información sobre ti cuando utilizas nuestro sitio web www.Aromas de Cafe.com.
            </p>

            <h2>2. Información que Recopilamos</h2>
            <p>
                Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico,
                y otros detalles al registrarte o interactuar con nuestro sitio.
            </p>

            <h2>3. Cómo Usamos tu Información</h2>
            <p>
                Utilizamos la información que recopilamos para mejorar nuestros servicios.
            </p>

            {/* Agrega el resto del contenido de la política aquí */}

            <h2>8. Contacto</h2>
            <p>
                Si tienes preguntas sobre esta Política de Privacidad, contáctanos en
                <a href="mailto:aromasdecafe@email.com"> aromasdecafe@email.com</a>.
            </p>
        </div>
    );
};

export default PoliticaPrivacidad;