<<<<<<< HEAD
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../App.jsx';
import '../assets/css/cart.css';
import { useNavigate } from 'react-router-dom';

function Cart({ onRequestLogin }) {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useContext(CartContext);
  const user = useContext(UserContext);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
      return;
    }

    const confirmPaymentMethod = window.confirm('¿Deseas continuar como invitado? Pulsa "Aceptar" para continuar o "Cancelar" para iniciar sesión o registrarte.');

    if (confirmPaymentMethod) {
      alert('Continúas como invitado. Listo para el pago.');
      // lógica para proceder al pago como invitado
    } else {
      //  inicia sesión, llamar a onRequestLogin
      onRequestLogin();
    }
=======
import { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = 1; // Aquí debes obtener el ID del usuario actual.
    fetch(`/api/cart/${userId}`)
      .then(response => response.json())
      .then(data => setCartItems(data));
  }, []);

  // Función para eliminar un producto del carrito
  const removeFromCart = (producto_id) => {
    const userId = 1; // obtener el ID del usuario actual.

    fetch(`/api/cart/${userId}/${producto_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Actualizar el estado del carrito eliminando el producto
          setCartItems(cartItems.filter(item => item.id !== producto_id));
        } else {
          alert('Error al eliminar el producto del carrito.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error en la conexión.');
      });
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
  };

  return (
    <div className="container">
      <h2>Carrito</h2>
<<<<<<< HEAD
      {cart.length === 0 ? (
        <p>No tienes productos en tu carrito.</p>
      ) : (
        <div>
          <div className="row">
            {cart.map(item => (
              <div className="col-md-4" key={item.id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Café: {item.nombre}</h5>
                    <p className="card-text">Cantidad: {item.cantidad}</p>
                    <p className="card-text">Precio: ${item.precio.toFixed(2)}</p>
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
            onClick={handleCheckout} // Maneja el pago
          >
            Pagar
          </button>
        </div>
      )}
=======
      <div className="row">
        {cartItems.map(item => (
          <div className="col-md-4" key={item.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Café: {item.nombre}</h5>
                <p className="card-text">Cantidad: {item.cantidad}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.producto_id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
    </div>
  );
}

<<<<<<< HEAD
export default Cart;
=======
export default Cart;

>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
