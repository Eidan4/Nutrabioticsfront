import { Product } from "../product";

export interface ProductFormModalProps {
    product?: Product | null;
    onClose: () => void;
    refreshProducts: () => void;
}