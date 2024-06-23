// eslint-disable-next-line
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { clearCart, purchase } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { selectTotalPrice } from "../../store/selectors";
import "../../styles/cart.scss";
import CartProductItem from "./CartItem";

const FloatCart = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const priceTotal = useAppSelector((state: RootState) =>
    selectTotalPrice(state)
  );

  const [cartIsOpen, setCartIsOpen] = useState(false);

  const openFloatCart = () => {
    setCartIsOpen(true);
  };

  const closeFloatCart = () => {
    setCartIsOpen(false);
  };

  let classes = ["float-cart"];

  if (!!cartIsOpen) {
    classes.push("float-cart--open");
  }

  const products = cartItems.map((ci) => {
    return <CartProductItem key={ci.id} cartItem={ci} />;
  });

  const proceedToCheckout = () => {
    dispatch(purchase());
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return (
    <div className={classes.join(" ")}>
      {/* If cart open, show close (x) button */}
      {cartIsOpen && (
        <div onClick={closeFloatCart} className="float-cart__close-btn">
          X
        </div>
      )}

      {/* If cart is closed, show bag with quantity of product and open cart action */}
      {!cartIsOpen && (
        <span onClick={openFloatCart} className="bag bag--float-cart-closed">
          <span className="bag__quantity">{cartItems.length}</span>
        </span>
      )}

      <div className="float-cart__content">
        <div className="float-cart__header">
          <span className="bag">
            <span className="bag__quantity">{cartItems.length}</span>
          </span>
          <span className="header-title">Cart</span>
        </div>

        <div className="float-cart__shelf-container">
          {products}
          {!products.length && (
            <p className="shelf-empty">
              Agrega algún producto al carrito <br />
              :)
            </p>
          )}
        </div>

        <div className="float-cart__footer">
          <div className="sub">SUBTOTAL</div>
          <div className="sub-price">
            <p className="sub-price__val">
              <CurrencyFormat
                className="val"
                value={priceTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
          </div>
          <button
            type="button"
            className="buy-btn"
            disabled={!products.length}
            onClick={proceedToCheckout}
          >
            Comprar
          </button>

          <button
            type="button"
            className="clean-btn"
            disabled={!products.length}
            onClick={clear}
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatCart;
