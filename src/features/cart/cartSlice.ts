import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../models/cartState";
import data from "../../data/products.json";

const initialState: CartState = {
  products: data.products,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.amount) {
          existingItem.quantity = product.amount;
        } else {
          existingItem.quantity += product.quantity;
        }
      } else {
        state.items.push(product);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    purchase: (state) => {
      state.items.forEach((element) => {
        const product = state.products.find((p) => p.id === element.id);
        if (product) {
          product.amount -= element.quantity;
        }
      });
      state.items = [];
      alert("Compra realizada con éxito!");
    },
    createProduct: (state, action) => {
      const product = action.payload;

      const existingItemWithSameName = state.products.find(
        (item) => item.name === product.name
      );

      if (existingItemWithSameName) {
        alert("Ya existe el producto con el mismo nombre!");
        return;
      }

      state.products.push({
        ...product,
        id: state.products.length + 1,
      });

      alert("Producto creado de forma correcta!");
    },
  },
});

export const { addItemToCart, clearCart, purchase, createProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
