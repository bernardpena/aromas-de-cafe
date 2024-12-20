// import React, { useContext } from 'react';
// import { UserContext } from '../context/UserProvider';
// import { useNavigate } from 'react-router-dom';
// import '../assets/css/UserInfo.css';

// const UserInfo = () => {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/');
//     };

//     if (!user) {
//         return <div className="not-found">Por favor, inicia sesión para ver tu información.</div>;
//     }

//     return (
//         <div className="user-info-container">
//             <h1>Información del Usuario</h1>
//             <div className="user-info-card">
//                 <h2>{user.nombre}</h2>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Calle:</strong> {user.calle}</p>
//                 <p><strong>Ciudad:</strong> {user.ciudad}</p>
//                 <p><strong>Comuna:</strong> {user.comuna}</p>
//                 {/* <p><strong>Rol:</strong> {user.rol}</p> */}
//                 <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
//             </div>
//         </div>
//     );
// };


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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://backend-585p.onrender.com/api/user/profile`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); 
          setFormData(userData); 
        } else {
          const errorText = await response.text();
          alert(errorText || 'Error al cargar los datos del perfil');
        }
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
        alert('Hubo un problema al cargar el perfil: ' + error.message);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, setUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-585p.onrender.com/api/user/update`, {
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
        alert('Perfil actualizado correctamente');
      } else {
        const errorText = await response.text();
        alert(errorText || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un problema al actualizar el perfil: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Perfil de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
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
            value={formData.email}
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
            value={formData.calle}
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
            value={formData.ciudad}
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
            value={formData.comuna}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
}
export default UserInfo;