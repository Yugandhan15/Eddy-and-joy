"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Tag } from "lucide-react";
import { createBooking, validateCoupon, type BookingFormState, type CouponState } from "@/lib/booking/actions";

interface ServiceOption {
  id: string;
  name: string;
  price_from: number;
}

interface BookingFormProps {
  services: ServiceOption[];
  defaultName?: string;
  defaultMobile?: string;
}

const initialState: BookingFormState = {};
const initialCouponState: CouponState = {};

export function BookingForm({ services, defaultName, defaultMobile }: BookingFormProps) {
  const params = useSearchParams();
  const preselectedName = params.get("service") ?? "";
  const [state, formAction, pending] = useActionState(createBooking, initialState);
  const [couponState, couponAction, couponPending] = useActionState(
    validateCoupon,
    initialCouponState
  );
  const [mobile, setMobile] = useState(defaultMobile ?? "");

  const preselected = services.find(
    (s) => s.name.toLowerCase() === preselectedName.toLowerCase()
  )?.id;
  const [selectedServiceId, setSelectedServiceId] = useState(preselected ?? "");
  const selectedService = services.find((s) => s.id === selectedServiceId);
  const couponInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultMobile) setMobile(defaultMobile);
  }, [defaultMobile]);

  if (state.success) {
    return (
      <div className="card-luxury flex flex-col items-center p-10 text-center">
        <CheckCircle2 className="text-accent" size={44} />
        <h3 className="mt-5 font-display text-2xl text-ink">Thank You!</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Thank you for choosing Eddy and Joy. Your booking request has been successfully
          submitted. Our team will contact you shortly to confirm your appointment.
        </p>
        <div className="mt-6 w-full rounded-xl bg-accent-tint px-5 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Booking Reference</span>
            <span className="font-semibold text-ink">
              {state.success.bookingId.slice(0, 8).toUpperCase()}
            </span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-muted">Status</span>
            <span className="font-semibold text-ink">Pending Confirmation</span>
          </div>
        </div>
        <div className="mt-7 flex gap-3">
          <Link href="/" className="btn-pill btn-secondary">
            Return Home
          </Link>
          <Link href="/account" className="btn-pill btn-primary">
            View My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-luxury space-y-5 p-8">
      <Field label="Full Name" htmlFor="fullName" required>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          defaultValue={defaultName}
          className="input-field"
          placeholder="Your full name"
        />
      </Field>

      <Field label="Mobile Number" htmlFor="mobile" required>
        <div className="mt-2 flex overflow-hidden rounded-xl border border-line bg-bg focus-within:border-accent">
          <span className="flex items-center gap-2 border-r border-line bg-white px-3 text-sm font-medium text-ink-soft">
            🇮🇳 +91
          </span>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            required
            value={mobile}
            placeholder="10-digit number"
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          />
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Preferred Date" htmlFor="date" required>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className="input-field"
          />
        </Field>
        <Field label="Preferred Time" htmlFor="time" required>
          <input id="time" name="time" type="time" required className="input-field" />
        </Field>
      </div>

      <Field label="Select Service" htmlFor="service" required>
        <select
          id="service"
          name="service"
          required
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
          className="input-field"
        >
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — From ₹{s.price_from}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Coupon Code (Optional)" htmlFor="coupon_code">
        <div className="flex gap-2">
          <input
            ref={couponInputRef}
            id="coupon_code"
            name="coupon_code_input"
            type="text"
            placeholder="Enter coupon code"
            className="input-field uppercase"
            defaultValue={couponState.success?.code ?? ""}
          />
          <button
            type="button"
            disabled={couponPending}
            onClick={() => {
              const value = couponInputRef.current?.value ?? "";
              const fd = new FormData();
              fd.set("coupon_code", value);
              couponAction(fd);
            }}
            className="btn-pill btn-secondary shrink-0 text-sm disabled:opacity-60"
          >
            {couponPending ? "Checking…" : "Apply"}
          </button>
        </div>
        {couponState.error && <p className="mt-2 text-sm text-red-600">{couponState.error}</p>}
        {couponState.success && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-green-700">
            <Tag size={14} aria-hidden /> {couponState.success.code} applied — ₹
            {couponState.success.discountAmount} off
          </p>
        )}
        <input
          type="hidden"
          name="coupon_code"
          value={couponState.success?.code ?? ""}
        />
      </Field>

      {selectedService && (
        <div className="rounded-xl bg-accent-tint px-5 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Service price (from)</span>
            <span className="font-semibold text-ink">₹{selectedService.price_from}</span>
          </div>
          {couponState.success && (
            <div className="mt-2 flex justify-between">
              <span className="text-muted">Discount ({couponState.success.code})</span>
              <span className="font-semibold text-green-700">
                −₹{couponState.success.discountAmount}
              </span>
            </div>
          )}
          <div className="mt-2 flex justify-between border-t border-accent/30 pt-2">
            <span className="font-semibold text-ink">Estimated total</span>
            <span className="font-semibold text-ink">
              ₹
              {Math.max(
                0,
                selectedService.price_from - (couponState.success?.discountAmount ?? 0)
              )}
            </span>
          </div>
        </div>
      )}

      <Field label="Additional Message (Optional)" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={3}
          className="input-field resize-none"
          placeholder="Anything we should know?"
        />
      </Field>

      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn-pill btn-primary w-full disabled:opacity-60">
        {pending ? "Submitting…" : "Submit Booking"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className={!htmlFor.includes("mobile") ? "mt-2" : ""}>{children}</div>
    </div>
  );
}
