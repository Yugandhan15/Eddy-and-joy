"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthFormState {
  error?: string;
  success?: boolean;
  alreadyRegistered?: boolean;
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const fullName = String(formData.get("full_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  if (!fullName || !email || !password) {
    return { error: "Please fill in all required fields." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }
  if (phone && !/^\d{10}$/.test(phone)) {
    return { error: "Mobile number must be exactly 10 digits." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone },
    },
  });

  if (error) {
    if (/already registered|already exists/i.test(error.message)) {
      return {
        alreadyRegistered: true,
        error: "This email is already registered. Please sign in instead.",
      };
    }
    return { error: error.message };
  }

  // Supabase returns a user object with an empty `identities` array (instead of an
  // error) when the email already belongs to a confirmed account — this avoids
  // leaking which emails exist via error messages, but we still want to tell the
  // person clearly rather than silently "succeeding".
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      alreadyRegistered: true,
      error: "This email is already registered. Please sign in instead.",
    };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
