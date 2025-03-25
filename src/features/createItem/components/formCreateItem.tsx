"use client";
import { Form } from "@/components/shared/form";
import { Button } from "@/components/ui/button";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SelectCreateItem } from "./selectCreateItem";
import { cn } from "@/lib/utils";
import { formCreateItemSchema, FormCreateItemShema } from "../shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageCreateItem } from "./imageCreateItem";
import { createItem } from "../api/сreacteItem";

interface Props {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormCreateItem: React.FC<Props> = ({ className, setOpen }) => {
  
  const create = useForm<FormCreateItemShema>({
    resolver: zodResolver(formCreateItemSchema),
    defaultValues: {
      image: null, 
      title: "",
      description: "",
      category: "",
    },
  });

  return (
    <FormProvider {...create}>
      <form
        onSubmit={create.handleSubmit((data) => createItem(data, setOpen))}
        className={cn("flex flex-col gap-4 w-full", className)}
      >
        <ImageCreateItem />

        <Form name="title" label="Title" required />
        <Form name="description" label="Description" />

        <SelectCreateItem control={create.control} />

        <Button
          loading={create.formState.isSubmitting}
          type="submit"
          className="w-full bg-[#171717] hover:bg-[#2c2c2c] text-white"
        >
          Create
        </Button>
      </form>
    </FormProvider>
  );
};
