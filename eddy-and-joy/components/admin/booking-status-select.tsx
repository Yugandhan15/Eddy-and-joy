"use client";

import { useState, useTransition } from "react";
import { updateBookingStatus } from "@/lib/admin/actions";
import type { BookingStatus } from "@/lib/types/database";
import { cn } from "@/lib/utils";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

// Labels shown in the dropdown options. "cancelled" reads as the action
// "Cancel" in the option list, while the selected/current badge still
// displays "Cancelled" (handled separately below).
const STATUS_OPTION_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancel",
};

export function BookingStatusSelect({
  bookingId,
  status,
}: {
  bookingId: string;
  status: BookingStatus;
}) {
  const [current, setCurrent] = useState(status);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(next: BookingStatus) {
    const previous = current;
    setCurrent(next);
    setError(null);
    startTransition(async () => {
      const result = await updateBookingStatus(bookingId, next);
      if (result?.error) {
        setCurrent(previous);
        setError(result.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        value={current}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value as BookingStatus)}
        className={cn(
          "rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none transition-opacity",
          STATUS_STYLES[current],
          isPending && "opacity-60"
        )}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_OPTION_LABELS[s]}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
