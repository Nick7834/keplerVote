import { HomeComponent } from "@/components/shared/HomeComponent";
import { getUserSession } from "@/entities/get-user-session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getUserSession();

  if(!session) redirect('/auth');

  return (
    <div>
        <HomeComponent />
    </div>
  );
}
