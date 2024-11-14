import { useState } from 'react';
<<<<<<< HEAD
import '../assets/css/register.css';
=======
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    calle: '',
    ciudad: '',
    comuna: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(response => {
      if (response.ok) {
        alert('Registro exitoso');
      } else {
        alert('Error en el registro');
      }
    });
  };

  return (
<<<<<<< HEAD
    <div className="container registro mt-5">
      <h2 className="text-center mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
=======
    <div className="container mt-5">
      <h2 className="text-center">Registro</h2>
      <form onSubmit={handleSubmit} className="mt-4">
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" name="password" className="form-control" placeholder="Contraseña" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="calle" className="form-control" placeholder="Calle" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="ciudad" className="form-control" placeholder="Ciudad" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="comuna" className="form-control" placeholder="Comuna" onChange={handleChange} required />
        </div>
<<<<<<< HEAD
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
=======
        <button type="submit" className="btn add-button w-100">Registrarse</button>
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
      </form>
    </div>
  );
}

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
