import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';

function Login({ onClose }) {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        onClose();
      } else {
        const errorText = await response.text();
        alert(errorText || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Hubo un problema al iniciar sesión: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;