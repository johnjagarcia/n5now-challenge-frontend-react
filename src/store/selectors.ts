import { RootState } from ".";

export const selectTotalPrice = (state: RootState) => {
  return state.cart.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};
