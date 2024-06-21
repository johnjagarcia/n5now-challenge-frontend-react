import React from "react";
import CurrencyFormat from "react-currency-format";
import { CartItem } from "../../models/cartItem";

const CartProduct = ({ cartItem }: { cartItem: CartItem }) => {
  return (
    <div className="shelf-item">
      <div className="shelf-item__details">
        <p className="title">{cartItem.name}</p>
        <div className="shelf-item__price">
          <div className="val">
            <CurrencyFormat
              className="val"
              value={cartItem.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
        </div>
        <p className="desc">Cantidad: {cartItem.quantity}</p>
      </div>
    </div>
  );
};

export default CartProduct;
