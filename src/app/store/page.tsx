"use client";
import { useState, useEffect } from "react";
import { getAllProducts } from "@/services/productService";
import { Product } from "@/types/product";
import Card from "@/components/card/Card";
import { useRouter } from "next/navigation";

export default function Store() {
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
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Tienda</h1>
      {loading ? (
        <p className="text-center text-gray-600">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              onDetailClick={() => router.push(`/store/${product.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
