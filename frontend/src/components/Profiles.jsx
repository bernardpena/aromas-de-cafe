import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    calle: '',
    ciudad: '',
    comuna: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://backend-585p.onrender.com/api/auth/profiles`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFormData(userData);
          setIsLoaded(true);
        } else {
          const errorText = await response.text();
          setError(errorText || 'Error al cargar los datos del perfil');
        }
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
        setError('Hubo un problema al cargar el perfil: ' + error.message);
      }
    };

    // Solo si existe user se realiza la llamada
    if (user && !isLoaded) {
      fetchUserData();
    }
  }, [user, setUser, isLoaded]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`);
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-585p.onrender.com/api/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setMessage('Perfil actualizado correctamente');
        setError('');
      } else {
        const errorText = await response.text();
        setError(errorText || 'Error al actualizar el perfil');
        setMessage('');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setError('Hubo un problema al actualizar el perfil: ' + error.message);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h1>Perfil de Usuario</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="calle" className="form-label">Calle</label>
          <input
            type="text"
            className="form-control"
            id="calle"
            name="calle"
            value={formData.calle || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">Ciudad</label>
          <input
            type="text"
            className="form-control"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comuna" className="form-label">Comuna</label>
          <input
            type="text"
            className="form-control"
            id="comuna"
            name="comuna"
            value={formData.comuna || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default Profile;