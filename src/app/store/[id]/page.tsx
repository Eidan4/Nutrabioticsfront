"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import { getProductById } from "@/services/productService";
import { createOrder } from "@/services/orderService";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

export default function ProductDetail() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const user = useAuthStore((state) => state.user);
    const { token } = useAuthStore();

    useEffect(() => {
        if (id) {
            getProductById(id.toString())
                .then((data) => {
                setProduct(data);
                setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <p className="text-center">Cargando producto...</p>;
    if (!product) return <p className="text-center">Producto no encontrado.</p>;

    const handleAddToCart = async () => {
            if (!user) {
                alert("Debes iniciar sesión para realizar una compra.");
                return;
            }

            if (user.role !== "CLIENT") {
                alert("Solo los clientes pueden realizar compras.");
                return;
            }

            if (!token) {
                alert("No estás autenticado");
                return;
            }

            const orderData = {
                userId: user.id,
                productId: product.id,
                quantity,
                total: product.price * quantity,
            };

            try {
                await createOrder(orderData, token);
                alert(`Se ha creado la orden de ${quantity}x ${product.name}`);
            } catch (error) {
                alert("Hubo un error al procesar la orden");
            }
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-auto h-auto object-cover rounded-lg"
                    />
                </div>

                <div className="flex flex-col space-y-6">
                    <h1 className="text-4xl font-bold text-purple-900">{product.name}</h1>
                    <p className="text-2xl text-purple-600 font-semibold">${product.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-4">
                        <button
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="px-3 py-1 bg-purple-300 rounded-md hover:bg-gray-400 transition"
                        >
                        -
                        </button>
                        <span className="text-xl font-bold text-black">{quantity}</span>
                        <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="px-3 py-1 bg-purple-300 rounded-md hover:bg-purple-400 transition"
                        >
                        +
                        </button>
                    </div>


                    <button
                        className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                        user?.role === "ADMIN"
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                        onClick={handleAddToCart}
                        disabled={user?.role === "ADMIN"}
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}