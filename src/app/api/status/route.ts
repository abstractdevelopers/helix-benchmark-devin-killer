import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function GET() {
  let database: string;
  try {
    await prisma.$queryRaw`SELECT 1`;
    database = "connected";
  } catch (e) {
    database = "disconnected";
  }

  const stripeConfigured = stripe && process.env.STRIPE_SECRET_KEY ? "configured" : "missing";

  return NextResponse.json({
    status: database === "connected" ? "ok" : "degraded",
    database,
    stripe: stripeConfigured,
  });
}
