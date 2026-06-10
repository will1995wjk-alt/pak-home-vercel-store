"use server";

import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from "@/lib/shopify/client";

export async function createCartAction(merchandiseId: string, quantity: number) {
  return createCart([{ merchandiseId, quantity }]);
}

export async function addToCartAction(cartId: string, merchandiseId: string, quantity: number) {
  return addToCart(cartId, [{ merchandiseId, quantity }]);
}

export async function getCartAction(cartId: string) {
  return getCart(cartId);
}

export async function updateCartAction(cartId: string, lineId: string, quantity: number) {
  return updateCart(cartId, [{ id: lineId, quantity }]);
}

export async function removeFromCartAction(cartId: string, lineId: string) {
  return removeFromCart(cartId, [lineId]);
}
