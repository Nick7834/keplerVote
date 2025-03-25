import { autchOptions } from "@/entities/autch";
import NextAuth from "next-auth";

const handler = NextAuth(autchOptions);

export { handler as GET, handler as POST };
