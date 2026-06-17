import { NextResponse } from "next/server";
import { addToCart, createCart } from "@/lib/shopify/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const merchandiseId = String(body.merchandiseId || "");
    const quantity = Math.max(1, Number(body.quantity || 1));
    const cartId = body.cartId ? String(body.cartId) : "";

    if (!merchandiseId || merchandiseId.startsWith("fallback-")) {
      return NextResponse.json(
        { error: "Shopify checkout is temporarily unavailable. Please order on WhatsApp." },
        { status: 400 }
      );
    }

    const cart = cartId
      ? await addToCart(cartId, [{ merchandiseId, quantity }])
      : await createCart([{ merchandiseId, quantity }]);

    if (!cart) {
      throw new Error("Unable to load cart.");
    }

    return NextResponse.json({ cartId: cart.id, cart });
  } catch {
    return NextResponse.json(
      { error: "Shopify checkout is temporarily unavailable. Please order on WhatsApp." },
      { status: 503 }
    );
  }
}
