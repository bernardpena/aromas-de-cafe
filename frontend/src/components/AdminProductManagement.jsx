import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
const path = require("path");
import '../assets/css/productList.css';

function AdminProductManagement() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    if (!user || user.rol !== 'admin') {
        return <div>No tienes permiso para acceder a esta página.</div>;
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://backend-585p.onrender.com/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleToggleProductStatus = async (productId, currentStatus) => {
        try {
            // const response = await fetch(`https://backend-585p.onrender.com/api/products/${productId}`, {
            const response = await fetch(`https://backend-585p.onrender.com/api/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activo: !currentStatus }),
            });
            console.log(`Actualizando el producto con ID: ${productId}`);
            
            if (response.ok) {
                setProducts(products.map(product =>
                    product.id === productId ? { ...product, activo: !currentStatus } : product
                ));
            } else {
                const errorText = await response.text();
                console.error('Error al actualizar el estado del producto:', errorText);
                alert('No se pudo actualizar el estado del producto. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            alert('Error inesperado al intentar actualizar el producto. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5">Administrar Productos</h2>
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
                                    className="btn toggle-button mt-auto"
                                    onClick={() => handleToggleProductStatus(product.id, product.activo)}
                                >
                                    {product.activo ? 'Desactivar' : 'Activar'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProductManagement;