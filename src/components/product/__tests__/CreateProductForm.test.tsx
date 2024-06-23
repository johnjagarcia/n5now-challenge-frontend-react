import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import cartSlice from "../../../features/cart/cartSlice";
import CreateProductForm from "../CreateProductForm";

jest.mock("../../../hooks", () => ({
  ...jest.requireActual("../../../hooks"),
  useAppDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("CreateProductForm Component", () => {
  it("renders properly", () => {
    renderWithProviders(<CreateProductForm />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByRole("spinbutton").length).toBe(2);
    expect(screen.getAllByRole("button").length).toBe(2);
  });

  it("El boton guardar no hace nada cuando el form no es válido", () => {
    const mockHandler = jest.fn();

    renderWithProviders(<CreateProductForm />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("El boton guardar es llamado cuando se ingresan todos los inputs", async () => {
    window.alert = jest.fn();

    const mockDispatch = jest.fn();
    const { useAppDispatch } = require("../../../hooks");
    useAppDispatch.mockReturnValue(mockDispatch);

    const consoleSpy = jest.spyOn(require("../../../hooks"), "useAppDispatch");

    renderWithProviders(<CreateProductForm />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Hola Mundo" },
    });

    fireEvent.change(
      screen.getByRole("spinbutton", {
        name: "price",
      }),
      {
        target: { value: 10000 },
      }
    );

    fireEvent.change(
      screen.getByRole("spinbutton", {
        name: "amount",
      }),
      {
        target: { value: 20 },
      }
    );

    const saveButton = screen.getByRole("button", {
      name: "Guardar",
    });

    fireEvent.click(saveButton);

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockClear();
  });
});
