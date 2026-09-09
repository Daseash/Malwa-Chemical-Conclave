"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, RefreshCw, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface PhotoUploadProps {
  value?: string; // Base64 data URL
  onChange: (dataUrl: string | undefined) => void;
  disabled?: boolean;
}

export function PhotoUpload({ value, onChange, disabled }: PhotoUploadProps) {
  const [photoData, setPhotoData] = useState<string | undefined>(value);
  const [fileSizeMB, setFileSizeMB] = useState<number | null>(null);
  const [sizeNotice, setSizeNotice] = useState<{ type: "warning" | "error"; message: string } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPhotoData(value);
  }, [value]);

  // Helper: Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Helper: Compress an image using HTML5 canvas
  const compressImage = (dataUrl: string, targetMaxMB = 0.8, quality = 0.82): Promise<{ dataUrl: string; sizeMB: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Scale down if dimensions are huge
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        const compressed = canvas.toDataURL("image/jpeg", quality);
        const sizeBytes = Math.round((compressed.length * 3) / 4);
        const sizeMB = parseFloat((sizeBytes / (1024 * 1024)).toFixed(2));
        resolve({ dataUrl: compressed, sizeMB });
      };
      img.src = dataUrl;
    });
  };

  // Process a selected file
  const handleFileProcess = async (file: File) => {
    const sizeInMB = parseFloat((file.size / (1024 * 1024)).toFixed(2));
    setFileSizeMB(sizeInMB);

    try {
      const base64 = await fileToBase64(file);

      if (sizeInMB <= 1.0) {
        // Less than or equal to 1 MB: Accepted without warning
        setSizeNotice(null);
        setPhotoData(base64);
        onChange(base64);
      } else if (sizeInMB <= 2.0) {
        // Between 1 MB and 2 MB: Accepted with note
        setSizeNotice({
          type: "warning",
          message: `Photo size is ${sizeInMB} MB. Please reduce to < 1 MB for optimal badge printing. (Photos up to 2 MB are accepted).`,
        });
        setPhotoData(base64);
        onChange(base64);
      } else {
        // Above 2 MB: Blocked, asks to reduce
        setSizeNotice({
          type: "error",
          message: `Photo size is ${sizeInMB} MB, exceeding the 2 MB limit. Please reduce to < 1 MB before uploading.`,
        });
        setPhotoData(base64);
        onChange(undefined);
      }
    } catch (err) {
      console.error("Error reading file:", err);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  // One-click Auto-compress handler
  const handleAutoCompress = async () => {
    if (!photoData) return;
    setIsCompressing(true);
    try {
      const result = await compressImage(photoData, 0.8, 0.75);
      setPhotoData(result.dataUrl);
      setFileSizeMB(result.sizeMB);
      if (result.sizeMB <= 1.0) {
        setSizeNotice(null);
        onChange(result.dataUrl);
      } else {
        setSizeNotice({
          type: "warning",
          message: `Compressed to ${result.sizeMB} MB. Photos up to 2 MB are accepted.`,
        });
        onChange(result.dataUrl);
      }
    } catch (err) {
      console.error("Compression error:", err);
    } finally {
      setIsCompressing(false);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setPhotoData(undefined);
    setFileSizeMB(null);
    setSizeNotice(null);
    onChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        disabled={disabled}
      />

      {/* Initial state: Compact rectangular button with zero wasted space */}
      {!photoData ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white hover:border-navy hover:bg-gray-50 px-4 py-2.5 text-xs font-semibold text-navy-950 transition-all cursor-pointer shadow-xs hover:shadow-sm"
        >
          <Upload size={15} className="text-navy" />
          <span>Upload Photo</span>
        </button>
      ) : (
        /* Small image preview shown only after upload */
        <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2.5 shadow-xs">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-navy/20 bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoData}
              alt="Delegate Photo"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="space-y-1 pr-2 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                <CheckCircle2 size={11} /> Photo Uploaded
              </span>
              {fileSizeMB && (
                <span className="text-[10px] font-mono text-gray-500 font-medium">
                  ({fileSizeMB} MB)
                </span>
              )}
            </div>

            {!disabled && (
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-semibold text-navy hover:underline cursor-pointer"
                >
                  Change
                </button>
                <span className="text-gray-300">•</span>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-[11px] font-semibold text-red-600 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notice & Compress Section: Shows only when > 1 MB */}
      {sizeNotice && (
        <div
          className={cn(
            "rounded-lg p-2.5 text-xs flex items-start gap-2 transition-all max-w-md",
            sizeNotice.type === "warning"
              ? "bg-amber-50 border border-amber-200 text-amber-900"
              : "bg-red-50 border border-red-200 text-red-900"
          )}
        >
          {sizeNotice.type === "warning" ? (
            <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={15} className="text-red-600 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-[11px]">
            <p className="leading-tight font-medium">{sizeNotice.message}</p>
            <div className="mt-1.5">
              <button
                type="button"
                onClick={handleAutoCompress}
                disabled={isCompressing}
                className="inline-flex items-center gap-1 rounded bg-white border border-gray-300 px-2 py-0.5 font-bold text-gray-800 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer text-[10px]"
              >
                <RefreshCw size={10} className={cn("text-navy", isCompressing && "animate-spin")} />
                <span>{isCompressing ? "Compressing..." : "Auto-Reduce Size to < 1 MB"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
