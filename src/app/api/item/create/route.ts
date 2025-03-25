import { getUserSession } from "@/entities/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { put } from '@vercel/blob';
import { NextResponse } from "next/server";
import type { Category } from "@prisma/client" 

export async function POST(request: Request) {

    const user = await getUserSession();

    if(!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();  
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as Category;
    const file = formData.get('image') as File;

    if(!title || !category || !file) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    try {

        const blob = await put(file.name, file, {
            access: 'public',
        });

        if(!blob) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }

        const create = await prisma.item.create({
            data: {
                title,
                description,
                category,
                poster: blob.url,
                authorId: parseInt(user.id),
            }
        });

        return NextResponse.json({ create }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }

}