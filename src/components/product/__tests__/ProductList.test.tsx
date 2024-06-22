import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "../../../utils/test-utils";
import ProductList from "../ProductList";

describe("ProductList Component", () => {
  it("should renders appropriately", () => {
    renderWithProviders(<ProductList />);
    expect(screen.getByText(/chat/i)).toBeInTheDocument();
  });
});
