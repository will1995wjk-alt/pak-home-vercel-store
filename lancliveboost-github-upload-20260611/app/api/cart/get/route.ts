import { NextResponse } from "next/server";
import { getCart } from "@/lib/shopify/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get("cartId");

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch {
    return NextResponse.json(
      { error: "Shopify checkout is temporarily unavailable. Please order on WhatsApp." },
      { status: 503 }
    );
  }
}
