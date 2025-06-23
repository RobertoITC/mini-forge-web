// src/Types/Cart.ts
export interface CartItem {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
    quantity: number;
}