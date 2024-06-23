import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "../../../utils/test-utils";
import ProductList from "../ProductList";
import { Product } from "../../../models/product";

describe("ProductList Component", () => {
  it("Debe mostrar un mensaje cuando no hay productos", () => {
    renderWithProviders(<ProductList />, {
      preloadedState: {
        cart: {
          products: [],
          items: [],
        },
      },
    });
    expect(
      screen.getByText("No hay productos disponibles :(")
    ).toBeInTheDocument();
  });

  it("debe mostrar el contenedor de productos cuando hay productos disponibles", () => {
    const products: Product[] = [
      { id: 1, name: "Producto 1", price: 100, amount: 10 },
    ];

    renderWithProviders(<ProductList />, {
      preloadedState: {
        cart: {
          products,
          items: [],
        },
      },
    });

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });
});
