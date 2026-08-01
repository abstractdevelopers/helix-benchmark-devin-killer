import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const teamId = session?.user?.teamId;
  if (!teamId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const period = new Date().toISOString().slice(0, 7);
  const snapshot = await prisma.usageSnapshot.upsert({
    where: {
      id: `${teamId}-${period}`,
    },
    update: {
      units: { increment: 1 },
      costCents: { increment: 5 },
    },
    create: {
      id: `${teamId}-${period}`,
      teamId,
      period,
      units: 1,
      costCents: 5,
    },
  });

  return NextResponse.json(snapshot);
}
