import { Product } from "../product";
import { User } from "../user/user";

export interface Order {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    total: number;
    user: User,
    product: Product
}