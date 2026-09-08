"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Camera, Upload, X, RefreshCw, AlertTriangle, AlertCircle, CheckCircle2, User } from "lucide-react";
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

  // Camera capture modal state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mobileCameraInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPhotoData(value);
  }, [value]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

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
        // Estimate size from base64 string
        const sizeBytes = Math.round((compressed.length * 3) / 4);
        const sizeMB = parseFloat((sizeBytes / (1024 * 1024)).toFixed(2));
        resolve({ dataUrl: compressed, sizeMB });
      };
      img.src = dataUrl;
    });
  };

  // Process a selected or captured file
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
        // Between 1 MB and 2 MB: Accepted ("take till 2 MB okey"), but notice shown to reduce
        setSizeNotice({
          type: "warning",
          message: `Your photo size is ${sizeInMB} MB. Please reduce the size to less than 1 MB for optimal badge printing. (Photos up to 2 MB are still accepted).`,
        });
        setPhotoData(base64);
        onChange(base64);
      } else {
        // Above 2 MB: Blocked, asks to reduce to less than 1 MB
        setSizeNotice({
          type: "error",
          message: `Photo size is ${sizeInMB} MB, exceeding the 2 MB limit. Please reduce your photo size to less than 1 MB before uploading.`,
        });
        // We do not save >2MB unless compressed
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

  // Start Camera
  const startCamera = async () => {
    setIsCameraOpen(true);
    setCameraError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Could not open desktop webcam directly, using mobile capture fallback:", err);
      setCameraError("Camera permission denied or camera unavailable. You can upload an image or use mobile camera.");
      // Fallback: trigger file input with capture="user"
      if (mobileCameraInputRef.current) {
        mobileCameraInputRef.current.click();
      }
    }
  };

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
  }, []);

  // Capture Snapshot from Camera
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      const sizeBytes = Math.round((dataUrl.length * 3) / 4);
      const sizeMB = parseFloat((sizeBytes / (1024 * 1024)).toFixed(2));
      setFileSizeMB(sizeMB);

      if (sizeMB <= 1.0) {
        setSizeNotice(null);
        setPhotoData(dataUrl);
        onChange(dataUrl);
      } else if (sizeMB <= 2.0) {
        setSizeNotice({
          type: "warning",
          message: `Captured photo is ${sizeMB} MB. Please reduce size to less than 1 MB. (Up to 2 MB is accepted).`,
        });
        setPhotoData(dataUrl);
        onChange(dataUrl);
      } else {
        setSizeNotice({
          type: "error",
          message: `Captured photo is ${sizeMB} MB. Please reduce size to less than 1 MB.`,
        });
        setPhotoData(dataUrl);
        onChange(undefined);
      }
    }
    stopCamera();
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setPhotoData(undefined);
    setFileSizeMB(null);
    setSizeNotice(null);
    onChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (mobileCameraInputRef.current) mobileCameraInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        disabled={disabled}
      />
      <input
        type="file"
        ref={mobileCameraInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        capture="user"
        className="hidden"
        disabled={disabled}
      />

      {/* Main Container */}
      {!photoData ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/70 p-5 text-center transition-all hover:border-navy hover:bg-blue-50/20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy shadow-xs mb-3">
            <User size={28} className="text-navy" />
          </div>

          <h5 className="text-sm font-bold text-navy-950">
            Delegate Identification Photo
          </h5>
          <p className="mt-1 text-xs text-gray-500 max-w-xs mx-auto">
            Upload your passport-style headshot or take a live photo for your conference pass badge.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-navy-900 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Upload size={14} />
              <span>Upload Photo</span>
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={startCamera}
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy/30 bg-white px-4 py-2.5 text-xs font-bold text-navy shadow-2xs hover:bg-gray-50 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Camera size={14} className="text-navy" />
              <span>Take Photo</span>
            </button>
          </div>
        </div>
      ) : (
        /* Preview Card */
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar Image */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-navy/30 bg-gray-100 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoData}
                alt="Delegate Photo"
                className="h-full w-full object-cover object-center"
              />
              {fileSizeMB && (
                <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white">
                  {fileSizeMB} MB
                </span>
              )}
            </div>

            {/* Info & Controls */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    <CheckCircle2 size={12} /> Photo Attached
                  </span>
                  <p className="mt-1 text-xs text-gray-600">
                    This photo will be printed on your official MCC 2026 conference badge.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {!disabled && (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-navy"
                  >
                    <Upload size={12} />
                    <span>Change</span>
                  </button>

                  <button
                    type="button"
                    onClick={startCamera}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-navy"
                  >
                    <Camera size={12} />
                    <span>Retake</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
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

      {/* Notice Section: Shows only when > 1 MB */}
      {sizeNotice && (
        <div
          className={cn(
            "rounded-lg p-3.5 text-xs flex items-start gap-2.5 transition-all",
            sizeNotice.type === "warning"
              ? "bg-amber-50 border border-amber-200 text-amber-900"
              : "bg-red-50 border border-red-200 text-red-900"
          )}
        >
          {sizeNotice.type === "warning" ? (
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <p className="leading-relaxed font-medium">{sizeNotice.message}</p>
            <div className="mt-2">
              <button
                type="button"
                onClick={handleAutoCompress}
                disabled={isCompressing}
                className="inline-flex items-center gap-1 rounded-md bg-white border border-gray-300 px-3 py-1 font-bold text-gray-800 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer"
              >
                <RefreshCw size={11} className={cn("text-navy", isCompressing && "animate-spin")} />
                <span>{isCompressing ? "Compressing..." : "Auto-Reduce Size to < 1 MB"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Webcam Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h4 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <Camera size={16} className="text-navy" /> Take Live Photo
              </h4>
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            {cameraError ? (
              <div className="rounded-lg bg-amber-50 p-4 text-xs text-amber-900 border border-amber-200 space-y-3">
                <p>{cameraError}</p>
                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    mobileCameraInputRef.current?.click();
                  }}
                  className="rounded-md bg-navy px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                >
                  Use Device Camera
                </button>
              </div>
            ) : (
              <div className="relative aspect-square overflow-hidden rounded-xl bg-black shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover"
                />
                {/* Viewfinder Target Guidelines */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-44 w-44 rounded-full border-2 border-dashed border-white/60 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              {!cameraError && (
                <button
                  type="button"
                  onClick={captureSnapshot}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-navy-900 transition-all cursor-pointer hover:scale-105"
                >
                  <Camera size={14} />
                  <span>Snap Photo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
