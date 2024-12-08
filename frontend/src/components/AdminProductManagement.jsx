import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/productList.css';

function AdminProductManagement() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    // Verifica si el usuario tiene el rol de Admin
    if (!user || user.role !== 'Admin') {
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
            const response = await fetch(`https://backend-585p.onrender.com/api/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activo: !currentStatus }),
            });
            if (response.ok) {
                setProducts(products.map(product =>
                    product.id === productId ? { ...product, activo: !currentStatus } : product
                ));
            } else {
                console.error('Error al actualizar el estado del producto');
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
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