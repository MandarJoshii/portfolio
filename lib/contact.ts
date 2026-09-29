import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Keep your name under 100 characters.")
    .regex(/^[^\r\n]*$/, "Enter your name on one line."),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Write a little more, at least 10 characters.")
    .max(5000, "Keep the message under 5,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name?: string }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<ContactField, string>>;
      values: Record<ContactField, string>;
    };

export const initialContactState: ContactState = { status: "idle" };
