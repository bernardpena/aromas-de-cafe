import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserProvider';
import '../assets/css/cart.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Cart({ onRequestLogin }) {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    
    const itemCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

    const saveCartToDatabase = async (direccion, isGuest) => {
        // Validando carrito
        cart.forEach(item => {
            const valor = item.valor;

            console.log("Valor del producto:", item.valor); 

            if (typeof item.valor !== 'number' || isNaN(item.valor) || item.valor < 0) {
                console.error("Error: Precio inválido para el producto", item);
                // alert(`El precio es inválido para el producto ${item.nombre}`);
            }
            if (typeof item.cantidad !== 'number' || isNaN(item.cantidad) || item.cantidad <= 0) {
                console.error("Error: Cantidad inválida para el producto", item);
                // alert(`La cantidad es inválida para el producto ${item.nombre}`);
            }
        });
    
        const payload = isGuest
    ? {
        invitado: {
            nombre_completo: direccion.nombre,
            email: direccion.correo,
            telefono: direccion.telefono,
            calle: direccion.calle,
            numero: direccion.numero,
            ciudad: direccion.ciudad,
        },
        items: cart.map(item => ({
            producto: item.nombre,
            cantidad: item.cantidad,
            valor: parseFloat(item.precio) * item.cantidad 
        }))
    }
    : {
        usuario_id: user.id,
        items: cart.map(item => {
            const precioNumerico = typeof item.precio === 'string' ? parseFloat(item.precio) : item.precio;
            const valor = precioNumerico * item.cantidad;

            return {
                producto_id: item.id,
                cantidad: item.cantidad,
                descripcion: item.descripcion,
                imagen: item.imagen,
                nombre: item.nombre,
                valor: valor 
            };
        })
    };

console.log("Payload enviado:", JSON.stringify(payload)); 
    
        const response = await fetch('http://localhost:5001/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user ? `Bearer ${user.token}` : undefined
            },
            body: JSON.stringify(payload),
        });
    
        if (response.ok) {
            const responseData = await response.json();
            console.log('Carrito guardado exitosamente:', responseData);
            return true; 
        } else {
            const errorData = await response.json(); 
            console.error('Error al guardar el carrito:', errorData);
            return false; 
        }
    };

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
            return;
        }
    
        if (!user) {
            const { value: confirmPaymentMethod } = await Swal.fire({
                title: 'Continuar como invitado',
                text: '¿Deseas continuar como invitado?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Inicio de sesión'
            });
    
            if (confirmPaymentMethod) {
                const { value: formValues = {} } = await Swal.fire({
                    title: 'Datos de Envío',
                    html: `
                        <input id="nombre" class="swal2-input" placeholder="Nombre Completo">
                        <input id="correo" class="swal2-input" placeholder="Correo Electrónico">
                        <input id="telefono" class="swal2-input" placeholder="Teléfono">
                        <input id="calle" class="swal2-input" placeholder="Calle">
                        <input id="numero" class="swal2-input" placeholder="Número">
                        <input id="ciudad" class="swal2-input" placeholder="Ciudad">
                    `,
                    focusConfirm: false,
                    preConfirm: () => {
                        return {
                            nombre: document.getElementById('nombre').value,
                            correo: document.getElementById('correo').value,
                            telefono: document.getElementById('telefono').value,
                            calle: document.getElementById('calle').value,
                            numero: document.getElementById('numero').value,
                            ciudad: document.getElementById('ciudad').value,
                        };
                    }
                });
    
                if (formValues) {
                    const saved = await saveCartToDatabase(formValues, true); 
                    if (saved) {
                        Swal.fire(
                            '¡Éxito!',
                            'Productos pagados satisfactoriamente! Estamos preparando su pedido para que llegue lo más pronto posible.',
                            'success'
                        );
                        clearCart(); 
                    }
                }
            } else {
                const loggedInUser = await onRequestLogin();
                if (loggedInUser) {
                    const saved = await saveCartToDatabase(); 
                    if (saved) {
                        Swal.fire(
                            '¡Éxito!',
                            'Productos pagados satisfactoriamente! Estamos preparando su pedido para que llegue lo más pronto posible.',
                            'success'
                        );
                        clearCart();
                    }
                }
            }
        } else {
            
            const saved = await saveCartToDatabase(); 
            if (saved) {
                Swal.fire(
                    '¡Éxito!',
                    'Productos pagados satisfactoriamente! Estamos preparando su pedido para que llegue lo más pronto posible.',
                    'success'
                );
                clearCart(); 
            }
        }
    };
    
    return (
        <div className="container">
            <h2>Carrito</h2>
            <div className="cart-icon">
                <span role="img" aria-label="carrito">🛒</span>
                {itemCount > 0 && <span className="item-count">{itemCount}</span>}
            </div>
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
                </div>
            )}
        </div>
    );
}

export default Cart;
