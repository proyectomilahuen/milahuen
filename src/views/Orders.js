import React, { useState, useEffect } from "react";
import "../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de pedidos
    const fetchOrders = () => {
      setTimeout(() => {
        setOrders([
          {
            id: "1",
            date: "2024-11-19",
            status: "Entregado",
            total: "$15.000",
          },
          {
            id: "2",
            date: "2024-11-15",
            status: "En camino",
            total: "$12.000",
          },
          {
            id: "3",
            date: "2024-11-10",
            status: "Pendiente",
            total: "$9.500",
          },
        ]);
        setIsLoading(false);
      }, 1000); // Simulación de carga
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Mis Pedidos</h1>
      {isLoading ? (
        <p>Cargando pedidos...</p>
      ) : orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <p>
                <strong>ID Pedido:</strong> {order.id}
              </p>
              <p>
                <strong>Fecha:</strong> {order.date}
              </p>
              <p>
                <strong>Estado:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> {order.total}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes pedidos registrados.</p>
      )}
    </div>
  );
};

export default Orders;
