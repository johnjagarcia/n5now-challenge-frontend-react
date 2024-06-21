import React from "react";
import FloatCart from "../components/cart";
import ProductList from "../components/product-list";

function Home() {
  return (
    <>
      <ProductList />
      <FloatCart />
    </>
  );
}

export default Home;
