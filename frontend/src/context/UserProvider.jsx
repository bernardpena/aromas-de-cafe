import React, { createContext, useState } from 'react';

export const UserContext = createContext();

// Crear el UserProvider
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // Lógica para iniciar sesión
        setUser(userData);
    };

    const logout = () => {
        // Lógica para cerrar sesión
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;