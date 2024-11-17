import React, { useState } from 'react';
import '../assets/css/register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [calle, setCalle] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [comuna, setComuna] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setNombre(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'calle':
        setCalle(value);
        break;
      case 'ciudad':
        setCiudad(value);
        break;
      case 'comuna':
        setComuna(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          calle,
          ciudad,
          comuna
        }),
      });

      // Verificar la respuesta
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en el registro:', errorText);
        throw new Error('Error en el registro');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className="container registro mt-5 my-5">
      <h2 className="text-center mb-2">Registro</h2>
      <form onSubmit={handleSubmit} className="p-4 rounded">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nombre"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
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
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="calle"
            className="form-control"
            placeholder="Calle"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="ciudad"
            className="form-control"
            placeholder="Ciudad"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="comuna"
            className="form-control"
            placeholder="Comuna"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;