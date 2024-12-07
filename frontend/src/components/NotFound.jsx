import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Página No Encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/">Volver a la página principal</Link>
        </div>
    );
};

export default NotFound;