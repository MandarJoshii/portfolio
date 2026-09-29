"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

// A demo secret. On a real server, the webhook secret never leaves the backend.
const DEMO_SECRET = "demo_webhook_secret";

const ORIGINAL_BODY = JSON.stringify(
  {
    event: "payment.captured",
    payload: {
      payment: { id: "pay_demo_4Xk2", amount: 49900, currency: "INR", status: "captured" },
    },
  },
  null,
  2,
);

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

type Status = "pending" | "verified" | "rejected";

export function WebhookProof() {
  const [body, setBody] = useState(ORIGINAL_BODY);
  const [sentSignature, setSentSignature] = useState<string | null>(null);
  const [computedSignature, setComputedSignature] = useState<string | null>(null);

  // The signature Razorpay would send: computed once, over the original body.
  useEffect(() => {
    let cancelled = false;
    void hmacSha256Hex(DEMO_SECRET, ORIGINAL_BODY).then((signature) => {
      if (!cancelled) setSentSignature(signature);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The signature the server computes: over whatever body actually arrived.
  useEffect(() => {
    let cancelled = false;
    void hmacSha256Hex(DEMO_SECRET, body).then((signature) => {
      if (!cancelled) setComputedSignature(signature);
    });
    return () => {
      cancelled = true;
    };
  }, [body]);

  const status: Status =
    sentSignature === null || computedSignature === null
      ? "pending"
      : sentSignature === computedSignature
        ? "verified"
        : "rejected";

  const rejected = status === "rejected";

  return (
    <div className="rounded-instrument border-rule border">
      <p className="border-rule text-muted border-b px-4 py-3 font-mono text-xs">
        POST /webhooks/razorpay
      </p>

      <div className="grid gap-5 p-4 sm:p-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Request body. Try changing the amount.</span>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            spellCheck={false}
            rows={10}
            className="rounded-instrument border-rule bg-panel w-full resize-y border p-3 font-mono text-xs leading-relaxed"
          />
        </label>

        <dl className="grid gap-4 font-mono text-xs">
          <div>
            <dt className="text-muted">Signature sent with the request</dt>
            <dd className="mt-1 break-all">{sentSignature ?? "Computing…"}</dd>
          </div>
          <div>
            <dt className="text-muted">Signature the server computes from the body it received</dt>
            <dd className={cn("mt-1 break-all", rejected && "text-signal")}>
              {computedSignature ?? "Computing…"}
            </dd>
          </div>
        </dl>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-2 font-medium",
            rejected ? "text-signal" : "text-ink",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("size-2 shrink-0 rounded-full", rejected ? "bg-signal" : "bg-ink")}
          />
          {status === "pending" && "Verifying…"}
          {status === "verified" && "Signatures match. Payment is marked as paid."}
          {status === "rejected" && "Signatures don't match. Request rejected; nothing changes."}
        </p>

        <div>
          <Button variant="secondary" onClick={() => setBody(ORIGINAL_BODY)}>
            Reset body
          </Button>
        </div>
      </div>
    </div>
  );
}
