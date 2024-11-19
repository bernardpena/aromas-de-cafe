import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserProvider';
import '../assets/css/cart.css';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('TU_PUBLIC_KEY_DE_STRIPE');

function Cart({ onRequestLogin }) {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const saveCartToDatabase = async () => {
        if (!user) return;

        console.log('Usuario:', user);
        console.log('Datos a enviar:', {
            usuario_id: user.id,
            items: cart.map(item => ({
                producto_id: item.id,
                cantidad: item.cantidad,
                email: user.email,
                descripcion: item.descripcion,
                imagen: item.imagen,
                nombre: item.nombre,
            })),
        });

        const response = await fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                usuario_id: user.id,
                items: cart.map(item => ({
                    producto_id: item.id,
                    cantidad: item.cantidad,
                    email: user.email,
                    descripcion: item.descripcion,
                    imagen: item.imagen,
                    nombre: item.nombre,
                })),
            }),
        });

        console.log('Response Status:', response.status);

        if (response.ok) {
            const responseData = await response.json();
            console.log('Carrito guardado exitosamente:', responseData);
        } else {
            const errorData = await response.text();
            console.error('Error al guardar el carrito:', errorData);
        }
    };

    // Manejo del proceso de checkout
    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
            return;
        }

        if (!user) {
            const confirmPaymentMethod = window.confirm('¿Deseas continuar como invitado? Pulsa "Aceptar" para continuar o "Cancelar" para iniciar sesión o registrarte.');
            if (confirmPaymentMethod) {
                alert('Continúas como invitado.');
                await saveCartToDatabase();
            } else {
                const loggedInUser = await onRequestLogin();
                if (loggedInUser) {
                    await saveCartToDatabase();
                }
            }
        } else {
            await saveCartToDatabase();
        }
    };

    return (
        <div className="container">
            <h2>Carrito</h2>
            {cart.length === 0 ? (
                <p>No tienes productos en tu carrito.</p>
            ) : (
                <div>
                    <div className="row">
                        {cart.map(item => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card mb-4">
                                    <img src={item.imagen} alt={`Café: ${item.nombre}`} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">Café: {item.nombre}</h5>
                                        <p className="card-text">Cantidad: {item.cantidad}</p>
                                        <p className="card-text">Precio: ${item.precio}</p>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleCheckout}
                    >
                        Pagar
                    </button>

                    {user && (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm cart={cart} />
                        </Elements>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;
