import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one digit",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  });

export const formLoginShema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const formRegisterSchema = formLoginShema.merge(z.object({
    username: z.string()
    .min(2, { message: 'Username must be at least 2 characters' })
    .max(20, { message: 'Username must be at most 20 characters' }),
    repeatPassword: passwordSchema,
})).refine(data => data.password === data.repeatPassword, { message: 'Passwords do not match', path: ['repeatPassword'] });


export type FormLoginShema = z.infer<typeof formLoginShema>;
export type FormRegisterShema = z.infer<typeof formRegisterSchema>;