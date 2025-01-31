"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/services/productService";
import { Product } from "@/types/product";
import { useAuthStore } from "@/store/authStore";
import ProductFormModal from "@/components/modal/ProductFormModal";

export default function ProductsPage() {
    const { token } = useAuthStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                if (!token) {
                    return
                }
                await deleteProduct(id, token);
                fetchProducts();
            } catch (error) {
                console.error("Error al eliminar el producto", error);
            }
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-purple-900">Productos</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Agregar Producto
                </button>
            </div>

            {loading ? (
                <p className="text-center">Cargando productos...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-purple-900 text-white">
                            <th className="border p-2">Imagen</th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Precio</th>
                            <th className="border p-2">Stock</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border">
                                <td className="border p-2">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="border p-2">{product.name}</td>
                                <td className="border p-2">${product.price.toFixed(2)}</td>
                                <td className="border p-2">{product.stock}</td>
                                <td className="border p-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <ProductFormModal
                    product={selectedProduct}
                    onClose={() => setIsModalOpen(false)}
                    refreshProducts={fetchProducts}
                />
            )}
        </div>
    );
}