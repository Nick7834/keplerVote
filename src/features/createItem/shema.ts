import { z } from "zod";

const imageSchema = z
  .union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        {
          message: "File must be JPEG, PNG or WEBP",
        }
      ),
    z.null(),
    z.undefined(),
  ])
  .refine(
    (val) => {
      if (!val) {
        return false;
      }
      return true;
    },
    {
      message: "Please add an image",
    }
);

export const formCreateItemSchema = z.object({
  image: imageSchema,
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
  description: z
    .string()
    .max(100, { message: "Description must be at most 100 characters" }),
  category: z.string().nonempty({ message: "Category is required" }),
});

export type FormCreateItemShema = z.infer<typeof formCreateItemSchema>;
