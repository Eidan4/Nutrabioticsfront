"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/services/productService";
import { Product } from "@/types/product";
import { useAuthStore } from "@/store/authStore";
import { ProductFormModalProps } from "@/types/product/productFormModalProps";

export default function ProductFormModal({ product, onClose, refreshProducts }: ProductFormModalProps) {
    const { token } = useAuthStore();
    const [formData, setFormData] = useState<Product>(
        product || { id: "", name: "", image: "", price: 0, stock: 0 }
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if(!token) return;
            if (product) {
                await updateProduct(product.id, formData, token);
            } else {
                await createProduct(formData, token);
            }
            refreshProducts();
            onClose();
        } catch (error) {
            console.error("Error al guardar el producto", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">{product ? "Editar Producto" : "Agregar Producto"}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="URL de Imagen"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="border p-2 rounded"
                        required
                    />

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`bg-${product ? "blue" : "green"}-500 text-white px-4 py-2 rounded hover:bg-${product ? "blue" : "green"}-700`}
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : product ? "Actualizar" : "Agregar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
