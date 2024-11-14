<<<<<<< HEAD
import { useContext } from 'react';
import products from '../data';
import { CartContext } from '../context/CartContext';
import '../assets/css/productList.css';

function ProductList() {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.nombre} ha sido agregado al carrito.`);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center titulo">Nuestros Cafés</h2>
      <div className="row mt-4">
        {products.map(product => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
=======
import { useState, useEffect, useContext } from 'react';
import products from '../data';
import { UserContext } from '../App.jsx';
import '../assets/card.css'

function ProductList() {
  const user = useContext(UserContext);

  const addToCart = (product) => {
    const userId = user.id; // Suponiendo que user contiene un id
    fetch(`/api/cart/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ producto_id: product.id, cantidad: 1 }),
    })
      .then(response => {
        if (response.ok) {

          alert(`${product.nombre} ha sido agregado al carrito.`);
        } else {
          alert('Error al agregar al carrito.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error en la conexión.');
      });
  };

  return (

    <div className="container mt-5">
      <h3 className="text-center"> {`Hola ${user?.name || 'Invitado'}!`}</h3>
      {/* <h3 className="text-center"> {`Hola ${user.name || 'Invitado'}!`}</h3> */}
      <h2 className="text-center titulo">Nuestros Cafés</h2>
      <div className="row mt-4">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
            <div className="card h-100">
              <img src={product.imagen} alt={product.nombre} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">${product.precio.toFixed(2)}</p>
<<<<<<< HEAD
                <button
                  className="btn add-button"
                  onClick={() => handleAddToCart(product)}
=======

                <button
                  className="btn add-button"
                  onClick={() => addToCart(product)}
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
<<<<<<< HEAD

=======
>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
