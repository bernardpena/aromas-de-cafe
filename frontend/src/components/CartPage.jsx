// import React, { useContext, useState } from 'react';
// import { CartContext } from '../context/CartContext';
// import { UserContext } from '../context/UserProvider';
// import '../assets/css/cart.css';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';

// const stripePromise = loadStripe('TU_PUBLIC_KEY_DE_STRIPE');

// const CartPage = () => {
//     console.log("pagina de Carrito");
//     const { cart, removeFromCart } = useContext(CartContext);
//     const { user } = useContext(UserContext);
//     const [isPayment, setIsPayment] = useState(false);

//     const handleCheckout = () => {
//         if (cart.length === 0) {
//             alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
//             return;
//         }

//         setIsPayment(true);
//     };

//     const saveCartToDatabase = async () => {
//         if (!user) return;

//         const response = await fetch('/api/cart/save-on-login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token}`
//             },
//             body: JSON.stringify({
//                 usuario_id: user.id,
//                 items: cart.map(item => ({
//                     producto_id: item.id,
//                     cantidad: item.cantidad
//                 })),
//             }),
//         });

//         if (response.ok) {
//             console.log('Carrito guardado exitosamente');
//         } else {
//             const errorMsg = await response.text();
//             console.error('Error al guardar el carrito:', errorMsg);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Carrito</h2>
//             {cart.length === 0 ? (
//                 <p>No tienes productos en tu carrito.</p>
//             ) : (
//                 <div>
//                     <div className="row">
//                         {cart.map(item => (
//                             <div className="col-md-4" key={item.id}>
//                                 <div className="card mb-4">
//                                     <img src={item.imagen} alt={`Café: ${item.nombre}`} className="card-img-top" />
//                                     <div className="card-body">
//                                         <h5 className="card-title">Café: {item.nombre}</h5>
//                                         <p className="card-text">Cantidad: {item.cantidad}</p>
//                                         <p className="card-text">Precio: ${item.precio}</p>
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() => removeFromCart(item.id)}
//                                         >
//                                             Eliminar
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <button
//                         className="btn btn-primary"
//                         onClick={handleCheckout}
//                     >
//                         Pagar
//                     </button>


//                     {isPayment && user && (
//                         <Elements stripe={stripePromise}>
//                             <CheckoutForm cart={cart} />
//                         </Elements>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartPage;