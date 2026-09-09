"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, CheckCircle2, X, Maximize2 } from "lucide-react";
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
    setIsPreviewOpen(false);
    onChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="hidden"
        disabled={disabled}
      />

      {/* Initial State: Compact rectangular button with zero wasted space */}
      {!screenshotData ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white hover:border-navy hover:bg-gray-50 px-4 py-2.5 text-xs font-semibold text-navy-950 transition-all cursor-pointer shadow-xs hover:shadow-sm",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <Upload size={15} className="text-navy" />
          <span>Upload Screenshot</span>
        </button>
      ) : (
        /* Small preview shown only after upload */
        <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2.5 shadow-xs">
          {/* Small Clickable Thumbnail (Opens Pop-up Modal) */}
          <div
            onClick={() => setIsPreviewOpen(true)}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-navy/20 bg-gray-100 cursor-pointer group"
            title="Click to expand screenshot"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotData}
              alt="Payment Screenshot"
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 size={13} className="text-white" />
            </div>
          </div>

          <div className="space-y-1 pr-2 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                <CheckCircle2 size={11} /> Screenshot Uploaded
              </span>
            </div>

            {fileName && (
              <p className="text-[10px] font-mono text-gray-500 truncate max-w-[180px]">
                {fileName}
              </p>
            )}

            {!disabled && (
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="text-[11px] font-semibold text-gray-600 hover:text-navy hover:underline cursor-pointer"
                >
                  View
                </button>
                <span className="text-gray-300">•</span>
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
                  onClick={handleRemove}
                  className="text-[11px] font-semibold text-red-600 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pop-up Lightbox Modal when user clicks the small image */}
      {isPreviewOpen && screenshotData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[85vh] rounded-2xl bg-white p-4 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <span className="text-xs font-bold text-navy-950 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-green-600" />
                Payment Screenshot
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-auto max-h-[70vh] flex items-center justify-center bg-gray-50 rounded-xl p-2 border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshotData}
                alt="Payment Screenshot Large Preview"
                className="max-h-[65vh] max-w-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
