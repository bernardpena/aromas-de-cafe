import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import '../assets/css/UserInfo.css';

const UserInfo = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!user) {
        return <div className="not-found">Por favor, inicia sesión para ver tu información.</div>;
    }

    return (
        <div className="user-info-container">
            <h1>Información del Usuario</h1>
            <div className="user-info-card">
                <h2>{user.nombre}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.calle}</p>
                <p><strong>Rol:</strong> {user.ciudad}</p>
                <p><strong>Rol:</strong> {user.comuna}</p>
                {/* <p><strong>Rol:</strong> {user.rol}</p> */}
                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default UserInfo;