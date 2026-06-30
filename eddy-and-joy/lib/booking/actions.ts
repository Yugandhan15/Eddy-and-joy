"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface BookingFormState {
  error?: string;
  success?: { bookingId: string };
}

export interface CouponState {
  error?: string;
  success?: { code: string; discountAmount: number };
}

export async function validateCoupon(
  _prevState: CouponState,
  formData: FormData
): Promise<CouponState> {
  const supabase = await createClient();
  const code = String(formData.get("coupon_code") || "")
    .trim()
    .toUpperCase();

  if (!code) return { error: "Enter a coupon code." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in to apply a coupon." };

  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("code, discount_amount, is_active, expires_at")
    .eq("code", code)
    .maybeSingle();

  if (error || !coupon) return { error: "That coupon code isn't valid." };
  if (!coupon.is_active) return { error: "That coupon is no longer active." };
  if (coupon.expires_at && coupon.expires_at < new Date().toISOString().split("T")[0]) {
    return { error: "That coupon has expired." };
  }

  return { success: { code: coupon.code, discountAmount: coupon.discount_amount } };
}

export async function createBooking(
  _prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to book an appointment." };
  }

  const fullName = String(formData.get("fullName") || "").trim();
  const mobile = String(formData.get("mobile") || "").trim();
  const serviceId = String(formData.get("service") || "");
  const date = String(formData.get("date") || "");
  const time = String(formData.get("time") || "");
  const message = String(formData.get("message") || "").trim();
  const couponCodeInput = String(formData.get("coupon_code") || "")
    .trim()
    .toUpperCase();

  if (fullName.length < 2) return { error: "Please enter your full name." };
  if (!/^\d{10}$/.test(mobile)) return { error: "Enter a valid 10-digit mobile number." };
  if (!serviceId) return { error: "Please select a service." };
  if (!date) return { error: "Please select a preferred date." };
  if (!time) return { error: "Please select a preferred time." };

  // Re-validate the coupon server-side rather than trusting any client-supplied amount.
  let couponCode: string | null = null;
  let discountAmount = 0;

  if (couponCodeInput) {
    const { data: coupon } = await supabase
      .from("coupons")
      .select("code, discount_amount, is_active, expires_at")
      .eq("code", couponCodeInput)
      .maybeSingle();

    if (
      coupon &&
      coupon.is_active &&
      (!coupon.expires_at || coupon.expires_at >= new Date().toISOString().split("T")[0])
    ) {
      couponCode = coupon.code;
      discountAmount = coupon.discount_amount;
    }
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      service_id: serviceId,
      full_name: fullName,
      mobile,
      booking_date: date,
      booking_time: time,
      message: message || null,
      coupon_code: couponCode,
      discount_amount: discountAmount,
    })
    .select("id")
    .single();

  if (error) {
    return { error: "Something went wrong while saving your booking. Please try again." };
  }

  revalidatePath("/account");
  return { success: { bookingId: data.id } };
}

