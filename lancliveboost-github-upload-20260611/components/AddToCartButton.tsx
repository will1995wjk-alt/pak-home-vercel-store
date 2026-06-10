"use client";

import { useState } from "react";
import { addToCartAction, createCartAction } from "@/app/actions";

type Props = {
  merchandiseId: string;
  quantity?: number;
  disabled?: boolean;
  label?: string;
};

const CART_ID_KEY = "pak_home_cart_id";

export default function AddToCartButton({ merchandiseId, quantity = 1, disabled, label = "Add to Cart" }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleClick() {
    setLoading(true);
    setMessage("");
    try {
      const existingCartId = window.localStorage.getItem(CART_ID_KEY);
      if (existingCartId) {
        await addToCartAction(existingCartId, merchandiseId, quantity);
      } else {
        const cart = await createCartAction(merchandiseId, quantity);
        window.localStorage.setItem(CART_ID_KEY, cart.id);
      }
      setMessage("Added");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to add product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-1">
      <button className="button button-secondary" type="button" onClick={handleClick} disabled={disabled || loading}>
        {loading ? "Adding..." : label}
      </button>
      {message ? <p className="text-xs text-muted">{message}</p> : null}
    </div>
  );
}
