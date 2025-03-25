import { signIn } from "next-auth/react";
import { FormLoginShema } from "../shema";
import toast from "react-hot-toast";

export const autchUser = async (data: FormLoginShema) => {
    try {
        
        const resp = await signIn("credentials", { ...data, redirect: false });
  
        if (!resp?.ok) {
          throw Error();
        }
  
        if(resp?.status === 200) {
          toast.success("Login successful");
          return true;
        }
      } catch (err) {
        console.warn(err);
        toast.error("Something went wrong");
        return false;
    }
}