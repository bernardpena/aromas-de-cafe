import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const fetchVentas = async () => {
            try {
                // const response = await fetch('http://localhost:5001/api/cart',
                const response = await fetch('http://localhost:5001/api/cart');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de ventas');
                }
                const data = await response.json();
                setVentas(data);

                // Calcular el total
                const totalVentas = data.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
                setTotal(totalVentas);
            } catch (error) {
                console.error("Error al cargar las ventas:", error);
            }
        };

        fetchVentas();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Cafés Vendidos</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Café</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.nombre}</td>
                            <td>{venta.cantidad}</td>
                            <td>${venta.precio.toFixed(2)}</td>
                            <td>${(venta.cantidad * venta.precio).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2>Total Ventas: ${total.toFixed(2)}</h2>
        </div>
    );
}

export default Ventas;