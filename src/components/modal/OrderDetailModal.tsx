"use client";

import { Order } from "@/types/order/order";

interface OrderDetailModalProps {
    order: Order | null;
    onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
    if (!order) return null; // No renderizar si no hay orden seleccionada

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-purple-900 mb-4">Detalle de la Orden</h2>
                <p><strong>Usuario:</strong> {order.user.name}</p>
                <p><strong>Producto:</strong> {order.product.name}</p>
                <p><strong>Cantidad:</strong> {order.quantity}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-800"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
