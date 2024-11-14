<<<<<<< HEAD
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import '../assets/css/login.css';

function Login({ onClose }) {
  const user = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

=======
// frontend/src/components/Login.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App.jsx';

function Login() {
  const user = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();


>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        navigate('/');
<<<<<<< HEAD
        onClose();
=======
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
      } else {
        const errorText = await response.text();
        alert(errorText || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Hubo un problema al iniciar sesión');
    }
  };

  return (
    <div className="container mt-5">
<<<<<<< HEAD
      <h3 className='text-center'>{`Hola`}</h3>
=======
      <h3 className='text-center'>{`Hola ${user}`}</h3>
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
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
<<<<<<< HEAD
        <button type="submit" className="btn add-button w-100">Entrar</button>
=======
        <button type="submit" className="btn add-button w-100">Iniciar Sesión</button>
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
      </form>
    </div>
  );
}

export default Login;
