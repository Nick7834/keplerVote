import { signIn } from "next-auth/react";
import { FormRegisterShema } from "../shema";
import toast from "react-hot-toast";
import axios from "axios";

export const RegisterUser = async (data: FormRegisterShema) => {
    try {
        const resp = await axios.post("/api/user/register", data);
  
        if(resp.status === 200) {
          await signIn("credentials", { email: data.email, password: data.password, callbackUrl: "/" });
          toast.success("Register successful");
        }
      } catch (err) {
        console.warn(err);
        toast.error("Something went wrong");
    }
}