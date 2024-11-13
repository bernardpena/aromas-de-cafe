import { useState, useEffect } from 'react';
import '../assets/card.css';

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
  };

  return (
    <div className="container">
      <h2>Carrito</h2>
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
    </div>
  );
}

export default Cart;

