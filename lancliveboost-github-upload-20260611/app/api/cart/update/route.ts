import { NextResponse } from "next/server";
import { updateCart } from "@/lib/shopify/client";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const cartId = String(body.cartId || "");
    const lineId = String(body.lineId || "");
    const quantity = Math.max(0, Number(body.quantity || 0));

    if (!cartId || !lineId) {
      return NextResponse.json({ error: "Missing cart line." }, { status: 400 });
    }

    const cart = await updateCart(cartId, [{ id: lineId, quantity }]);
    return NextResponse.json({ cartId: cart?.id || cartId, cart });
  } catch {
    return NextResponse.json(
      { error: "Shopify checkout is temporarily unavailable. Please order on WhatsApp." },
      { status: 503 }
    );
  }
}
