"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/types/database";

export interface ActionState {
  error?: string;
  success?: boolean;
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, isAdmin: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { supabase, user, isAdmin: profile?.role === "admin" };
}

// ---------- BOOKINGS ----------

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);

  if (error) return { error: error.message };

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  return { success: true };
}

// ---------- SERVICES ----------

export async function saveService(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priceFrom = Number(formData.get("price_from") || 0);
  const durationMinutes = Number(formData.get("duration_minutes") || 30);
  const imageUrl = String(formData.get("image_url") || "").trim();
  const isActive = formData.get("is_active") === "on";

  if (!name) return { error: "Service name is required." };
  if (!category) return { error: "Category is required." };
  if (Number.isNaN(priceFrom) || priceFrom < 0) return { error: "Enter a valid price." };
  if (Number.isNaN(durationMinutes) || durationMinutes <= 0)
    return { error: "Enter a valid duration." };

  const payload = {
    name,
    category,
    description: description || null,
    price_from: priceFrom,
    duration_minutes: durationMinutes,
    image_url: imageUrl || null,
    is_active: isActive,
  };

  const { error } = id
    ? await supabase.from("services").update(payload).eq("id", id)
    : await supabase.from("services").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/booking");
  revalidatePath("/services");
  return { success: true };
}

export async function deleteService(serviceId: string) {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const { error } = await supabase.from("services").delete().eq("id", serviceId);
  if (error) return { error: error.message };

  revalidatePath("/admin/services");
  revalidatePath("/booking");
  revalidatePath("/services");
  return { success: true };
}

// ---------- GALLERY ----------

export async function saveGalleryItem(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const id = String(formData.get("id") || "");
  const category = String(formData.get("category") || "").trim();
  const imageUrl = String(formData.get("image_url") || "").trim();
  const caption = String(formData.get("caption") || "").trim();
  const displayOrder = Number(formData.get("display_order") || 0);

  if (!category) return { error: "Category is required." };
  if (!imageUrl) return { error: "Please upload an image." };
  if (Number.isNaN(displayOrder)) return { error: "Enter a valid display order." };

  const payload = {
    category,
    image_url: imageUrl,
    caption: caption || null,
    display_order: displayOrder,
  };

  const { error } = id
    ? await supabase.from("gallery_items").update(payload).eq("id", id)
    : await supabase.from("gallery_items").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

export async function deleteGalleryItem(itemId: string) {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const { error } = await supabase.from("gallery_items").delete().eq("id", itemId);
  if (error) return { error: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

// ---------- COUPONS ----------

export async function saveCoupon(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const id = String(formData.get("id") || "");
  const code = String(formData.get("code") || "").trim().toUpperCase();
  const discountAmount = Number(formData.get("discount_amount") || 0);
  const expiresAt = String(formData.get("expires_at") || "").trim();
  const isActive = formData.get("is_active") === "on";

  if (!code) return { error: "Coupon code is required." };
  if (Number.isNaN(discountAmount) || discountAmount <= 0)
    return { error: "Enter a valid discount amount." };

  const payload = {
    code,
    discount_amount: discountAmount,
    expires_at: expiresAt || null,
    is_active: isActive,
  };

  const { error } = id
    ? await supabase.from("coupons").update(payload).eq("id", id)
    : await supabase.from("coupons").insert(payload);

  if (error) {
    if (error.code === "23505") return { error: "A coupon with this code already exists." };
    return { error: error.message };
  }

  revalidatePath("/admin/coupons");
  return { success: true };
}

export async function deleteCoupon(couponId: string) {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const { error } = await supabase.from("coupons").delete().eq("id", couponId);
  if (error) return { error: error.message };

  revalidatePath("/admin/coupons");
  return { success: true };
}

// ---------- SITE CONTENT (hero) ----------

export async function saveSiteContent(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const keys = [
    "hero_eyebrow",
    "hero_heading_line1",
    "hero_heading_accent",
    "hero_heading_line2",
    "hero_subheading",
    "hero_image_url",
  ];

  const rows = keys.map((key) => ({ key, value: String(formData.get(key) || "").trim() }));

  const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
  if (error) return { error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { success: true };
}

// ---------- TEAM MEMBERS ----------

export async function saveTeamMember(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const photoUrl = String(formData.get("photo_url") || "").trim();
  const displayOrder = Number(formData.get("display_order") || 0);
  const isActive = formData.get("is_active") === "on";

  if (!name) return { error: "Name is required." };
  if (!role) return { error: "Role is required." };
  if (Number.isNaN(displayOrder)) return { error: "Enter a valid display order." };

  const payload = {
    name,
    role,
    photo_url: photoUrl || null,
    display_order: displayOrder,
    is_active: isActive,
  };

  const { error } = id
    ? await supabase.from("team_members").update(payload).eq("id", id)
    : await supabase.from("team_members").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/about");
  return { success: true };
}

export async function deleteTeamMember(memberId: string) {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) return { error: "Not authorized." };

  const { error } = await supabase.from("team_members").delete().eq("id", memberId);
  if (error) return { error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/about");
  return { success: true };
}

// ---------- ADMIN SETTINGS (own profile) ----------

export async function updateAdminProfile(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase, user } = await requireAdmin();
  if (!user) return { error: "Not authorized." };

  const fullName = String(formData.get("full_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  if (!fullName) return { error: "Name is required." };
  if (phone && !/^\d{10}$/.test(phone)) return { error: "Mobile number must be 10 digits." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone: phone || null })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  revalidatePath("/account");
  return { success: true };
}
