"use client";

import { useEffect, useState } from "react";
import { getAllOrders, getOrderById } from "@/services/orderService";
import { useAuthStore } from "@/store/authStore";
import { Order } from "@/types/order/order";
import OrderDetailModal from "@/components/modal/OrderDetailModal";

export default function OrdersPage() {
    const { token } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (!token) return;
        getAllOrders(token)
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [token]);

    const handleOpenModal = async (orderId: string) => {
        
        try {
            if (!orderId || !token ) return;
            const orderDetail = await getOrderById(orderId, token);
            setSelectedOrder(orderDetail);
        } catch (error) {
            console.error("Error al obtener el detalle de la orden", error);
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-purple-900 mb-6">Órdenes</h1>

            {loading ? (
                <p className="text-center">Cargando órdenes...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-purple-900 text-white">
                            <th className="border p-2">Usuario</th>
                            <th className="border p-2">Producto</th>
                            <th className="border p-2">Cantidad</th>
                            <th className="border p-2">Total</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border">
                                <td className="border p-2">{order.user.name}</td>
                                <td className="border p-2">{order.product.name}</td>
                                <td className="border p-2">{order.quantity}</td>
                                <td className="border p-2">${order.total.toFixed(2)}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleOpenModal(order.id)}
                                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
                                    >
                                        Ver Detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
        </div>
    );
}
