import "@testing-library/jest-dom";
import { fireEvent, prettyDOM, screen } from "@testing-library/react";
import React from "react";
import { Product } from "../../../models/product";
import { renderWithProviders } from "../../../utils/test-utils";
import FloatCart from "../FloatCart";

describe("FloatCart Component", () => {
  it("Debe mostrar un mensaje cuando no hay productos en el carrito", () => {
    renderWithProviders(<FloatCart />, {
      preloadedState: {
        cart: {
          products: [],
          items: [],
        },
      },
    });

    expect(
      screen.getByText(/agrega algún producto al carrito/i)
    ).toBeInTheDocument();
  });

  it("Debe renderizar los atributos de un producto", () => {
    renderWithProviders(<FloatCart />, {
      preloadedState: {
        cart: {
          products: [],
          items: [
            {
              id: 1,
              name: "Leche",
              price: 10000,
              quantity: 10,
            },
          ],
        },
      },
    });

    expect(screen.getByText(/leche/i)).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 10")).toBeInTheDocument();
  });

  it("Debe vacíar el carrito al presionar el botón de limpiar", () => {
    renderWithProviders(<FloatCart />, {
      preloadedState: {
        cart: {
          products: [],
          items: [
            {
              id: 1,
              name: "Leche",
              price: 10000,
              quantity: 10,
            },
          ],
        },
      },
    });

    expect(screen.getByText(/leche/i)).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 10")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", {
      name: "Limpiar",
    });

    fireEvent.click(clearButton);

    expect(
      screen.getByText(/agrega algún producto al carrito/i)
    ).toBeInTheDocument();
  });
});
