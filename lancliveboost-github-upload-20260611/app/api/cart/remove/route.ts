import { NextResponse } from "next/server";
import { removeFromCart } from "@/lib/shopify/client";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const cartId = String(body.cartId || "");
    const lineId = String(body.lineId || "");

    if (!cartId || !lineId) {
      return NextResponse.json({ error: "Missing cart line." }, { status: 400 });
    }

    const cart = await removeFromCart(cartId, [lineId]);
    return NextResponse.json({ cartId: cart?.id || cartId, cart });
  } catch {
    return NextResponse.json(
      { error: "Shopify checkout is temporarily unavailable. Please order on WhatsApp." },
      { status: 503 }
    );
  }
}
