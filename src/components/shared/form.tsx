"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
}

export const Form: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  placeholder,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errotText = errors?.[name]?.message as string;

  return (
    <div className={className}>
      <label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Input
        className="h-12 text-md bg-0 border border-solid border-neutral-800/30"
        id={name}
        {...register(name)}
        {...props}
        placeholder={placeholder}
      />
      {errotText && (
        <p className={cn("text-red-500 text-sm mt-2", className)}>
          {errotText}
        </p>
      )}
    </div>
  );
};
