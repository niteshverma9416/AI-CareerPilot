import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  });

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Full name is required").trim(),
    email: z.string().email("Invalid email address").trim(),
    password: passwordSchema,
    role: z.enum(["user", "admin"]).optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional().or(z.literal("")),
    skills: z.array(z.string()).optional(),
    targetRole: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(1, "Password is required"),
  }),
});
