import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.teamId || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId } = await request.json();

  const sessionUrl = process.env.AUTH_URL || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${sessionUrl}/dashboard?success=true`,
    cancel_url: `${sessionUrl}/dashboard?canceled=true`,
    client_reference_id: session.user.teamId,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
