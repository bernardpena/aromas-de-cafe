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
    <div className="container product mt-5">
      <h2 className="text-center titulo">Nuestros Cafés</h2>
      <div className="row mt-4">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img src={product.imagen} alt={product.nombre} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">${product.precio.toFixed(2)}</p>
                <button
                  className="btn add-button"
                  onClick={() => handleAddToCart(product)}
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

