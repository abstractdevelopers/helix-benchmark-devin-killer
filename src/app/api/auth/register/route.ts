import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  teamName: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password, teamName } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      memberships: {
        create: {
          role: "admin",
          team: {
            create: {
              name: teamName,
              subscriptions: { create: {} },
              snapshots: {
                create: {
                  period: new Date().toISOString().slice(0, 7),
                  units: 0,
                  costCents: 0,
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
