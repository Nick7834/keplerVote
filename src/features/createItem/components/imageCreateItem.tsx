"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoImage } from "react-icons/io5";
import { FormCreateItemShema } from "../shema";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface Props {
  className?: string;
}

export const ImageCreateItem: React.FC<Props> = ({ className }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormCreateItemShema>();

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    if (file) {
      setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPreview(null)
    setValue("image", undefined, { shouldValidate: true })
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <div>
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-[300px] object-contain"
          />
          <Button onClick={handleDelete} className="bg-[#efefef] absolute top-1 right-1 z-10 [&_svg]:size-[20px]">
            <MdOutlineDeleteOutline className="text-orange-700" />
          </Button>
        </div>
      )}
      {!preview && (
        <>
          <label className={className}>
            <input
              type="file"
              className="hidden"
              {...register("image")}
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="w-full h-[200px] bg-[#efefef] flex items-center justify-center cursor-pointer">
              <IoImage size={50} />
            </div>
          </label>
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">
              {errors.image.message as string}
            </p>
          )}
        </>
      )}
    </div>
  );
};
