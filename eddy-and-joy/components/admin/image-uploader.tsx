"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/storage/upload";

export function ImageUploader({
  bucket,
  name,
  initialUrl,
}: {
  bucket: "services" | "gallery" | "site";
  name: string;
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    const result = await uploadImage(bucket, file);
    setUploading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setUrl(result.url ?? "");
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-line bg-bg">
          {url ? (
            <Image src={url} alt="" fill sizes="80px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">
              <Upload size={18} aria-hidden />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-pill btn-secondary text-xs disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden /> Uploading…
              </>
            ) : (
              <>
                <Upload size={14} aria-hidden /> {url ? "Replace image" : "Upload image"}
              </>
            )}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
            >
              <X size={13} aria-hidden /> Remove
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
