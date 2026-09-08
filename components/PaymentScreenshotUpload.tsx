"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, CheckCircle2, X, Receipt, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaymentScreenshotUploadProps {
  value?: string; // Base64 data URL
  onChange: (dataUrl: string | undefined) => void;
  disabled?: boolean;
}

export function PaymentScreenshotUpload({
  value,
  onChange,
  disabled,
}: PaymentScreenshotUploadProps) {
  const [screenshotData, setScreenshotData] = useState<string | undefined>(value);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setScreenshotData(value);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setScreenshotData(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setScreenshotData(undefined);
    setFileName(null);
    onChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="hidden"
        disabled={disabled}
      />

      {!screenshotData ? (
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={cn(
            "group cursor-pointer rounded-2xl border-2 border-dashed border-navy/30 bg-blue-50/20 p-6 text-center transition-all hover:border-navy hover:bg-blue-50/40 hover:shadow-md",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-navy/20 text-navy shadow-xs transition-transform group-hover:scale-110 mb-3">
            <Receipt size={28} className="text-navy" />
          </div>

          <h5 className="text-sm font-bold text-navy-950">
            Upload Payment Screenshot / Transaction Receipt
          </h5>
          <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
            Attach a screenshot of your successful transaction or bank confirmation receipt.
          </p>

          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-5 py-2.5 text-xs font-bold text-white shadow-xs group-hover:bg-navy-900 transition-all">
              <Upload size={14} />
              <span>Browse Receipt / Screenshot</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-green-200 bg-green-50/30 p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Thumbnail */}
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-xl border border-green-300 bg-white shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshotData}
                alt="Payment Screenshot"
                className="h-full w-full object-contain p-1"
              />
            </div>

            {/* Content & Options */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-800 bg-green-100 px-2.5 py-0.5 rounded-full border border-green-300">
                  <CheckCircle2 size={13} /> Payment Screenshot Attached
                </span>
              </div>

              {fileName && (
                <p className="text-xs font-mono text-gray-600 truncate max-w-xs">
                  {fileName}
                </p>
              )}

              <p className="text-xs text-gray-600 leading-relaxed">
                Your transaction proof is linked to this registration. The secretariat will verify it against the banking portal.
              </p>

              {!disabled && (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Upload size={12} />
                    <span>Replace Screenshot</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemove}
                    className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    <X size={12} />
                    <span>Remove</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
