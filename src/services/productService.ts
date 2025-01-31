import axios from "axios";
import { Product } from "@/types/product";

const API_URL = "http://localhost:9000/api/products";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map((item: Product) => ({
      id: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
      stock: item.stock,
    }));
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return {
      id: response.data.id,
      image: response.data.image,
      name: response.data.name,
      price: response.data.price,
      stock: Number(response.data.stock) ,
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
};

export const createProduct = async (productData: Product, token: string): Promise<Product> => {
  try {
    const response = await axios.post(API_URL, {...productData, stock: Number(productData.stock), price: Number(productData.price)}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};


export const updateProduct = async (id: string, productData: Product, token: string): Promise<void> => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { ...productData, stock: Number(productData.stock),  price: Number(productData.price) },
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      }
    );

    console.log("Producto actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};