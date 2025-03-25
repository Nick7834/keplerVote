"use clinet";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../../components/shared/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formLoginShema, FormLoginShema } from "../shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { autchUser } from "../api/autchUser";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export const Login: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const login = useForm<FormLoginShema>({
    resolver: zodResolver(formLoginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormLoginShema) => {
    const success = await autchUser(data);

    if (success) {
      router.replace("/");
    } else {
      console.error("Authentication failed");
    }
  };

  return (
    <FormProvider {...login}>
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form
        className={cn("flex flex-col gap-4 w-full", className)}
        onSubmit={login.handleSubmit(onSubmit)}
      >
        <Form name="email" label="Email" required />
        <Form name="password" label="Password" required type="password" />
        <Button
          loading={login.formState.isSubmitting}
          className="w-full bg-[#171717] hover:bg-[#2c2c2c] text-white"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
