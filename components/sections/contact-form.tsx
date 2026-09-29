"use client";

import { useActionState, type ReactNode } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { initialContactState } from "@/lib/contact";

const inputClass =
  "w-full rounded-instrument border border-rule bg-panel px-3 py-3 text-base aria-invalid:border-signal";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-signal text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-instrument border-rule border p-6">
        <p className="font-display text-2xl font-bold tracking-tight">Message sent</p>
        <p className="text-muted mt-2">
          Thanks{state.name ? `, ${state.name}` : ""}. I&apos;ll reply to your email soon.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : undefined;

  return (
    <form action={formAction} noValidate className="relative flex flex-col gap-5">
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="contact-name" label="Name" error={errors.name}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="contact-email" label="Email" error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          defaultValue={values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {state.status === "error" && (
        <p role="alert" className="text-signal">
          {state.message}
        </p>
      )}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
