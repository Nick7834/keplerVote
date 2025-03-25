"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../../components/shared/form";
import { Button } from "@/components/ui/button";
import { formRegisterSchema, FormRegisterShema } from "../shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUser } from "../api/RegisterUser";

interface Props {
  className?: string;
}

export const Register: React.FC<Props> = ({ className }) => {
  const register = useForm<FormRegisterShema>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  return (
    <FormProvider {...register}>
      <h1 className="text-3xl font-bold text-center">Register</h1>
      <form
        className={cn("flex flex-col gap-4 w-full", className)}
        onSubmit={register.handleSubmit(RegisterUser)}
      >
        <Form name="email" label="Email" required />
        <Form name="username" label="Name" required />
        <Form name="password" label="Password" required type="password" />
        <Form
          name="repeatPassword"
          label="Repeat  Password"
          required
          type="password"
        />
        <Button
          loading={register.formState.isSubmitting}
          className="w-full bg-[#171717] hover:bg-[#2c2c2c] text-white"
        >
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
