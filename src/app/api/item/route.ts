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
           }
        });

        return NextResponse.json({ items }, { status: 200 });

    }  catch(error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } 
}