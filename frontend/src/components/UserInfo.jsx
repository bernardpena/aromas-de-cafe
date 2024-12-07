import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/');
    };

    if (!user) {
        return <div>Por favor, inicia sesión para ver tu información.</div>;
    }

    return (
        <div className="user-info">
            <h1>Información del Usuario</h1>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.rol}</p>
            {/* mas campos para agregar */}
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default UserInfo;