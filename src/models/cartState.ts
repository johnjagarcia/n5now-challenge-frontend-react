import { CartItem } from "./cartItem";
import { Product } from "./product";

export type CartState = { products: Product[]; items: CartItem[] };
