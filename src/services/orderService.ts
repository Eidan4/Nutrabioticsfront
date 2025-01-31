import { Order } from "@/types/order/order";
import { OrderData } from "@/types/order/orderData";
import axios from "axios";

export const createOrder = async (orderData: OrderData, token: string): Promise<void> => {
    try {
        const response = await axios.post("http://localhost:9000/api/orders", orderData, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
        });
  
        console.log("Orden creada:", response.data);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        throw error;
    }
};

export const getAllOrders = async (token: string): Promise<Order[]> => {
    try {
        const response = await axios.get("http://localhost:9000/api/orders",{
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        throw error;
    }
};
  

export const getOrderById = async (orderId: string,token: string): Promise<Order> => {
    try {
        const response = await axios.get(`http://localhost:9000/api/orders/${orderId}`,{
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la orden con ID ${orderId}:`, error);
        throw error;
    }
};