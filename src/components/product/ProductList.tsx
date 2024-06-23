// eslint-disable-next-line
import React from "react";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = useAppSelector((state: RootState) => state.cart.products);

  if (!products || products.length === 0)
    return <span>No hay productos disponibles :(</span>;

  return (
    <div className="container">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
