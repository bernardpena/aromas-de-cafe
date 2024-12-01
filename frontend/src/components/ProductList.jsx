import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../assets/css/productList.css';

function ProductList() {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await fetch('http://localhost:5001/api/products');
                const response = await fetch(`${process.env.REACT_APP_API_URL}`);
                const data = await response.json();
                setProducts(data);
                console.log(data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        // alert(`${product.nombre} ha sido agregado al carrito.`);
    };

    return (
        <div className="container product mt-5">
            <h2 className="text-center titulo">Nuestros Cafés</h2>
            <div className="row mt-4">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card h-100 d-flex flex-column">
                            <img src={product.imagen} alt={product.nombre} className="card-img-top" />
                            <div className="card-body d-flex flex-column flex-grow-1">
                                <h5 className="card-title">{product.nombre}</h5>
                                <p className="card-text">{product.descripcion}</p>
                                <p className="card-text price">${product.precio}</p>
                                <button
                                    className="btn add-button mt-auto"
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

