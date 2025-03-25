import { getUserSession } from "@/entities/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getUserSession();

    if(!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {

        const items = await prisma.item.findMany({
           include: {
                author: { select: { id: true, username: true } },
                votes: true, 
                _count: { select: { votes: true } }
           }
        });

        const userVotes = await prisma.vote.findMany({
            where: { authorId: parseInt(user.id) },
            select: { itemId: true } 
        });

        const votedItemIds = new Set(userVotes.map(vote => vote.itemId));

        const itemsWithVoteStatus = items.map(item => ({
            ...item,
            hasVoted: votedItemIds.has(item.id),
        }));

        return NextResponse.json({ itemsWithVoteStatus }, { status: 200 });

    }  catch(error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } 
}