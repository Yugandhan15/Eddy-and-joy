import { createClient } from "@/lib/supabase/client";

export async function uploadImage(
  bucket: "services" | "gallery" | "site",
  file: File
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl };
}
