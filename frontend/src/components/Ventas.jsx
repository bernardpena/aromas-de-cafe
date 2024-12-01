import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
require("dotenv").config();

function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVentas = async () => {
            setLoading(true);
            setError(null);
            try {
                // const response = await fetch('http://localhost:5001/api/sales');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sales`);
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.message || `Error al obtener ventas (${response.status})`;
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                setVentas(data);
                setTotal(data.reduce((acc, item) => acc + Number(item.valor), 0));
            } catch (error) {
                setError(error);
                console.error("Error al cargar las ventas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVentas();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Ventas Realizadas</h1>
            {loading && <div>Cargando...</div>}
            {error && <div className="alert alert-danger">Error: {error.message}</div>}
            {!loading && !error && (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID Compra</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.length > 0 ? ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>{venta.id}</td>
                                    <td>{venta.nombre}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>${(!isNaN(venta.valor) && !isNaN(venta.cantidad) && venta.cantidad > 0
                                        ? (Number(venta.valor) / Number(venta.cantidad)).toFixed(2)
                                        : 'N/A')}</td>
                                    <td>${(!isNaN(venta.valor) ? Number(venta.valor).toFixed(2) : 'N/A')}</td>
                                    <td>{new Date(venta.created_at).toLocaleString()}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6">No hay ventas disponibles.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <h2>Total Ventas: ${total.toFixed(2)}</h2>
                </>
            )}
        </div>
    );
}

export default Ventas;