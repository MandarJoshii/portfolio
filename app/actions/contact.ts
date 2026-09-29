"use server";

import { Resend } from "resend";
import { z } from "zod";
import { contactSchema, type ContactField, type ContactState } from "@/lib/contact";

function readField(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: people never see this field, so only bots fill it in.
  // Pretend it worked, so the bot doesn't learn to avoid it.
  if (readField(formData, "company")) {
    return { status: "success" };
  }

  const values: Record<ContactField, string> = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    message: readField(formData, "message"),
  };

  // Never trust the browser's validation; check again here.
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return {
      status: "error",
      message: "The form isn't working right now. Email me directly instead.",
      fieldErrors: {},
      values,
    };
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio contact <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\nFrom: ${name} (${email})`,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      message: "Your message couldn't be sent. Try again, or email me directly.",
      fieldErrors: {},
      values,
    };
  }

  return { status: "success", name };
}
