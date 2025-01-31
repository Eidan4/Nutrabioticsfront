"use client";

import Card from "@/components/card/Card";
import { getAllProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Carousel() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getAllProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">Colección Destacada</h1>

            {loading ? (
                <p className="text-center text-gray-600">Cargando productos...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
                    {products.slice(0, 4).map((product) => (
                        <Card
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            onDetailClick={() => alert(`Detalles del producto: ${product.name}`)}
                        />
                    ))}
                </div>
            )}
            <div className="pb-24">
                <button
                    onClick={() => router.push("/store")}
                    className="mt-6 px-6 py-3 bg-purple-600 text-white text-lg rounded-lg shadow-md hover:bg-purple-700 transition"
                >
                    Ver Más
                </button>
            </div>
        </div>
    );
}