import { getServerSession } from "next-auth";
import { autchOptions } from "./autch";

export const getUserSession = async () => {
  const session = await getServerSession(autchOptions);
  return session?.user ?? null;
}