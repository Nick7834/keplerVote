import { AuthComponent } from "@/components/shared/AuthComponent";
import { getUserSession } from "@/entities/get-user-session";
import { redirect } from "next/navigation";

export default async function Auth() {
      const session = await getUserSession();
    
      if(session) redirect('/');

    return (
        <div>
            <AuthComponent />
        </div>
    );
}