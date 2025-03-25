import { prisma } from "@/prisma/prisma-client";
import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashSync(body.password, 10),
      },
    });

    return NextResponse.json({ user: newUser }, { status: 200 });
  } catch (error) {
    console.warn(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}