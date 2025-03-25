import { getUserSession } from "@/entities/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id: postId } = await params;

    if (!postId) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const voteLike = await prisma.vote.findUnique({
      where: {
        authorId_itemId: {
          itemId: Number(postId),
          authorId: parseInt(user.id),
        },
      },
    });

    if (voteLike) return NextResponse.json({ error: "Already voted" }, { status: 400 });

    await prisma.vote.create({
        data: {
          authorId: parseInt(user.id),
          itemId: Number(postId),
        },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
