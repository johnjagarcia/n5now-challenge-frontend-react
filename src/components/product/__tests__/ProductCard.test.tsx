import "@testing-library/jest-dom";
import { fireEvent, prettyDOM, screen } from "@testing-library/react";
import React from "react";
import { Product } from "../../../models/product";
import { renderWithProviders } from "../../../utils/test-utils";
import ProductCard from "../ProductCard";

describe("ProductCard Component", () => {
  it("Debe renderizar los atributos de un producto", () => {
    const product: Product = {
      id: 1,
      name: "Leche",
      amount: 20,
      price: 10000,
    };

    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByText(/leche/i)).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 0")).toBeInTheDocument();
    expect(screen.getByText("Disponible: 20")).toBeInTheDocument();
  });

  it("Debe aumentar la cantidad de un producto", () => {
    const product: Product = {
      id: 1,
      name: "Leche",
      amount: 20,
      price: 10000,
    };

    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByText("Cantidad: 0")).toBeInTheDocument();

    const plusButton = screen.getByRole("button", {
      name: "+",
    });

    fireEvent.click(plusButton);

    expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();

    fireEvent.click(plusButton);

    expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();
  });

  it("Debe disminuir la cantidad de un producto siempre y cuando sea mayor a 0", () => {
    const product: Product = {
      id: 1,
      name: "Leche",
      amount: 20,
      price: 10000,
    };

    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByText("Cantidad: 0")).toBeInTheDocument();

    const minusButton = screen.getByRole("button", {
      name: "-",
    });
    const plusButton = screen.getByRole("button", {
      name: "+",
    });

    fireEvent.click(minusButton);
    expect(screen.getByText("Cantidad: 0")).toBeInTheDocument();

    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();
  });
});
