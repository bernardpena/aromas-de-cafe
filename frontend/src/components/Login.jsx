import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import '../assets/css/login.css';

function Login({ onClose }) {
  const user = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();


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
        console.log('Inicio de sesión exitoso:', data);
        onClose();
        navigate('/');
      } else {
        const errorText = await response.text();
        console.error('Error en el login:', errorText);
        alert(errorText || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Hubo un problema al iniciar sesión');
    }
  };

  return (
    <div className="container modal-box mt-5">
      <h3 className='text-center text-light'>Hola</h3>
      <h2 className="text-center">Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn add-button w-100">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
