"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({
  action,
  confirmLabel = "Delete this item?",
}: {
  action: () => Promise<{ error?: string } | undefined>;
  confirmLabel?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted">{confirmLabel}</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              const result = await action();
              if (result?.error) {
                setError(result.error);
                setConfirming(false);
              }
            })
          }
          className="font-semibold text-red-600 hover:underline"
        >
          {isPending ? <Loader2 size={13} className="inline animate-spin" /> : "Yes, delete"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="font-semibold text-muted hover:underline"
        >
          Cancel
        </button>
        {error && <span className="text-red-600">{error}</span>}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
    >
      <Trash2 size={13} aria-hidden /> Delete
    </button>
  );
}
