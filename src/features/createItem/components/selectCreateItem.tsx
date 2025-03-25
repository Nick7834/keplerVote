import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { FormCreateItemShema } from "../shema";

interface Props {
  control: Control<FormCreateItemShema>;
}

const category = [
  {
    value: "MOVIE",
    label: "Movie",
  },
  {
    value: "GAME",
    label: "Game",
  },
  {
    value: "BOOK",
    label: "Book",
  },
];

export const SelectCreateItem: React.FC<Props> = ({ control }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <div>
          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
            <SelectTrigger className="min-h-12 w-full border border-solid border-neutral-800/30">
              <SelectValue placeholder="Category" className="text-[#171717]"  />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#171717] cursor-pointer">
              {category.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="cursor-pointer hover:bg-[#efefef]"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-red-500 text-sm mt-2">
            {errors?.category?.message as string}
          </p>
        </div>
      )}
    />
  );
};
