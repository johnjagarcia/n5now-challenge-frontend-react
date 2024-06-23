import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { addItemToCart } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks";
import { Product } from "../../models/product";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();

  const [itemQty, setItemQty] = useState(0);

  const handleOnIncrease = () => {
    setItemQty(itemQty + 1);
  };

  const handleOnDecrease = () => {
    if (itemQty <= 0) return;

    setItemQty(itemQty - 1);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart({ ...product, quantity: itemQty }));
    setItemQty(0);
  };

  return (
    <div className="item">
      <p className="item__title" data-testid="paragraph-product-name">
        {product.name}
      </p>
      <div className="item__price">
        <div className="val">
          <CurrencyFormat
            className="val"
            value={product.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
      </div>
      <p className="desc">Disponible: {product.amount}</p>
      <p className="desc">Cantidad: {itemQty}</p>
      <div>
        <button
          onClick={handleOnDecrease}
          disabled={itemQty === 1 ? true : false}
          className="change-product-button"
        >
          -
        </button>
        <button
          onClick={handleOnIncrease}
          className="change-product-button"
          disabled={itemQty === product.amount}
        >
          +
        </button>
      </div>
      <button
        className="item__buy-btn"
        disabled={itemQty === 0}
        onClick={() => handleAddToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
