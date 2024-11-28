import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../assets/css/footer.css';

function Footer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const handleAdminLogin = async (email, password) => {
        try {
            // const response = await fetch('http://localhost:5001/api/cart', {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }
            const data = await response.json();
            console.log("Inicio de sesión exitoso:", data);
            Swal.fire('Éxito!', 'Has iniciado sesión como administrador.', 'success');
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Swal.fire('Error!', error.message || 'No se pudo iniciar sesión.', 'error');
        }
    };
    const showModal = () => {
        Swal.fire({
            title: 'Bienvenido!',
            html: `
                <div>
                    <input type="text" id="email" class="swal2-input" placeholder="Correo electrónico" autofocus />
                    <input type="password" id="password" class="swal2-input" placeholder="Contraseña" />
                </div>
            `,
            focusConfirm: false,
            confirmButtonText: 'Iniciar Sesión',
            showCancelButton: true,
            cancelButtonText: 'Agregar Administrador',
            preConfirm: () => {
                const inputEmail = document.getElementById('email');
                const inputPassword = document.getElementById('password');
                if (!inputEmail || !inputPassword) {
                    Swal.showValidationMessage('Por favor, llena todos los campos');
                    return false;
                }
                const emailValue = inputEmail.value.trim();
                const passwordValue = inputPassword.value.trim();
                console.log("Valores capturados:", { emailValue, passwordValue });
                if (!emailValue || !passwordValue) {
                    Swal.showValidationMessage('Por favor, llena todos los campos');
                    return false;
                } else {
                    handleAdminLogin(emailValue, passwordValue);
                    return true;
                }
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    };

    return (
   <footer className="text-light text-center navbar-dark colorFondo py-4">
            <div className="container navbar-dark colorFondo">
                <p>&copy; 2024 Aromas de Café</p>
                <p>Todos los derechos reservados.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/politica-privacidad" className="text-light">Política de Privacidad</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terminos-de-servicio" className="text-light">Términos de Servicio</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#" onClick={showModal} className="text-light">Administración</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;