import React from "react";
import FloatCart from "../components/cart/FloatCart";
import ProductList from "../components/product/ProductList";

function Home() {
  return (
    <>
      <ProductList />
      <FloatCart />
    </>
  );
}

export default Home;
