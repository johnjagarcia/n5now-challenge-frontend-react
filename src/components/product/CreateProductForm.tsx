// eslint-disable-next-line
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks";
import "../../styles/form.scss";

type Inputs = {
  name: string;
  price: number;
  amount: number;
};

export default function CreateProductForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(createProduct(data));
    reset();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
        <input
          placeholder="Nombre"
          aria-label="name"
          {...register("name", { required: true })}
        />
        <input
          placeholder="Precio"
          aria-label="price"
          type="number"
          {...register("price", { required: true })}
        />
        <input
          placeholder="Inventario"
          aria-label="amount"
          type="number"
          {...register("amount", { required: true })}
        />
        <button type="submit" className="btn" name="save">
          Guardar
        </button>
        <button
          className="btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
