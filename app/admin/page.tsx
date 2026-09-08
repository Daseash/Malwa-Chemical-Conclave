"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Search,
  Download,
  Trash2,
  RefreshCw,
  Eye,
  X,
  FileSpreadsheet,
  Users,
  CreditCard,
  Building,
  Calendar,
  AlertCircle,
  LogOut,
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface RegistrationRecord {
  _id: string;
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  organization: string;
  designation?: string;
  duration?: string;
  accommodation?: string;
  totalAmount: number;
  photo?: string;
  hasPhoto?: boolean;
  paymentScreenshot?: string;
  hasPaymentScreenshot?: boolean;
  transactionId?: string;
  message?: string;
  submittedAt: string;
}

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal Image Preview State
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; delegateName: string } | null>(null);

  // Check existing session token
  useEffect(() => {
    const savedToken = sessionStorage.getItem("mcc_admin_token");
    if (savedToken === "mcc@@iitindore2026") {
      setIsAuthenticated(true);
      fetchRegistrations(savedToken);
    }
  }, []);

  const fetchRegistrations = async (token: string) => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const res = await fetch("/api/admin/registrations", {
        headers: {
          "x-admin-password": token,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch registrations.");
      }

      setRegistrations(data.registrations || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFetchError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (passwordInput === "mcc@@iitindore2026") {
      sessionStorage.setItem("mcc_admin_token", passwordInput);
      setIsAuthenticated(true);
      fetchRegistrations(passwordInput);
    } else {
      setLoginError("Incorrect access key. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("mcc_admin_token");
    setIsAuthenticated(false);
    setPasswordInput("");
    setRegistrations([]);
  };

  // Delete Record
  const handleDeleteRecord = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the registration for ${name}?`)) {
      return;
    }

    const token = sessionStorage.getItem("mcc_admin_token") || "";
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": token,
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r._id !== id && r.registrationId !== id));
      } else {
        alert("Could not delete record.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting record.");
    }
  };

  // Helper: Download a Base64 Image directly to user's computer
  const downloadBase64Image = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper: Export to CSV (Excel)
  const exportToCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      "Registration ID",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Organization",
      "Designation",
      "Category",
      "Duration",
      "Accommodation",
      "Total Fee (INR)",
      "Transaction ID",
      "Has Photo",
      "Has Payment Screenshot",
      "Submission Date",
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${r.registrationId || ""}"`,
      `"${r.name || ""}"`,
      `"${r.email || ""}"`,
      `"${r.phone || ""}"`,
      `"${r.organization || ""}"`,
      `"${r.designation || ""}"`,
      `"${r.category || ""}"`,
      `"${r.duration || ""}"`,
      `"${r.accommodation || ""}"`,
      r.totalAmount || 0,
      `"${r.transactionId || ""}"`,
      r.photo ? "YES" : "NO",
      r.paymentScreenshot ? "YES" : "NO",
      `"${new Date(r.submittedAt).toLocaleString("en-IN")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MCC_2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const matchesSearch =
        searchTerm === "" ||
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone?.includes(searchTerm) ||
        r.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.registrationId?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || r.category?.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [registrations, searchTerm, categoryFilter]);

  // Total Revenue Sum
  const totalRevenue = useMemo(() => {
    return filteredRegistrations.reduce((acc, r) => acc + (r.totalAmount || 0), 0);
  }, [filteredRegistrations]);

  // ─────────────────────────────────────────────────────────────
  // 1. CLEAN LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 shadow-2xl space-y-7 relative z-10">
          {/* Official IIT Indore Chemical Engineering Logo */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/logos/iit-indore-logo.png"
                alt="IIT Indore"
                width={140}
                height={65}
                className="h-14 w-auto object-contain"
                priority
              />
              <div className="h-10 w-px bg-white/20" />
              <Image
                src="/logos/chemical-engineering-logo.png"
                alt="Chemical Engineering"
                width={140}
                height={65}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-gold-300">
                <Lock size={11} /> Secretariat Portal
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <input
                type="password"
                required
                autoFocus
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter Access Key"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-center tracking-wider"
              />
            </div>

            {loginError && (
              <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200 flex items-center justify-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gold hover:bg-gold-600 py-3.5 px-4 text-sm font-bold text-navy-950 shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Return to Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. AUTHENTICATED DASHBOARD VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/70 pb-20">
      
      {/* Sleek Top Navbar with IIT Indore Chemical Engineering Logo */}
      <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-navy-950 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          
          {/* Logo Brand Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logos/iit-indore-logo.png"
                alt="IIT Indore"
                width={120}
                height={50}
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
              <div className="h-7 w-px bg-white/20" />
              <Image
                src="/logos/chemical-engineering-logo.png"
                alt="Chemical Engineering"
                width={120}
                height={50}
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            <span className="ml-2 hidden sm:inline-block rounded-full bg-gold/20 border border-gold/40 px-2.5 py-0.5 text-[10px] font-bold text-gold-300 uppercase tracking-wider">
              Secretariat
            </span>
          </div>

          {/* Controls on Right */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                const token = sessionStorage.getItem("mcc_admin_token") || "";
                fetchRegistrations(token);
              }}
              disabled={isLoading}
              title="Refresh Attendee List"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-all cursor-pointer"
            >
              <RefreshCw size={13} className={cn(isLoading && "animate-spin text-gold")} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportToCSV}
              disabled={filteredRegistrations.length === 0}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-700 px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
            >
              <FileSpreadsheet size={14} />
              <span>Export CSV (Excel)</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-xl border border-red-400/30 bg-red-950/40 hover:bg-red-900/60 px-3.5 py-2 text-xs font-bold text-red-200 transition-all cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-8 space-y-6">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Registered</span>
              <Users size={18} className="text-navy" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-mono">
              {filteredRegistrations.length}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Confirmed database entries</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Estimated Revenue</span>
              <CreditCard size={18} className="text-green-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-green-700 font-mono">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Pass fees + accommodation</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Photos Uploaded</span>
              <ImageIcon size={18} className="text-navy" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-mono">
              {filteredRegistrations.filter((r) => r.photo).length}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Badge photos ready</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Payment Slips</span>
              <CheckCircle2 size={18} className="text-navy" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-mono">
              {filteredRegistrations.filter((r) => r.paymentScreenshot).length}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Proofs attached</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, college, or ID..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-2 pl-10 pr-4 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15 outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { label: "All Categories", value: "all" },
              { label: "IIT Indore", value: "iit" },
              { label: "External Scholar", value: "external" },
              { label: "Academia", value: "academia" },
              { label: "Industry", value: "industry" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCategoryFilter(tab.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                  categoryFilter === tab.value
                    ? "bg-navy text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {fetchError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            MAIN REGISTRATIONS TABLE
        ───────────────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-gray-200 bg-white shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw size={28} className="mx-auto text-navy animate-spin" />
              <p className="text-sm font-semibold text-gray-600">
                Fetching attendee records from MongoDB...
              </p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Users size={36} className="mx-auto text-gray-300" />
              <h3 className="text-base font-bold text-navy-950">No Registrations Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No records match your search or filter criteria. New registrations will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                    <th className="py-3.5 px-4">Delegate Photo</th>
                    <th className="py-3.5 px-4">Registration ID</th>
                    <th className="py-3.5 px-4">Attendee Details</th>
                    <th className="py-3.5 px-4">Organization &amp; Role</th>
                    <th className="py-3.5 px-4">Category &amp; Pass</th>
                    <th className="py-3.5 px-4">Fee Paid</th>
                    <th className="py-3.5 px-4">Payment Proof</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRegistrations.map((record) => {
                    const cleanName = record.name.replace(/\s+/g, "_");

                    return (
                      <tr key={record._id} className="hover:bg-blue-50/20 transition-colors">
                        {/* Delegate Photo Preview & 1-Click Download */}
                        <td className="py-3.5 px-4">
                          {record.photo ? (
                            <div className="flex items-center gap-2">
                              {/* Thumbnail */}
                              <div
                                onClick={() =>
                                  setPreviewImage({
                                    url: record.photo!,
                                    title: "Official Delegate Identification Photo",
                                    delegateName: record.name,
                                  })
                                }
                                className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-2xs hover:scale-105 transition-transform"
                                title="Click to view full photo"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={record.photo}
                                  alt={record.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              {/* 1-Click Download Photo Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  downloadBase64Image(record.photo!, `${cleanName}_Badge_Photo.png`)
                                }
                                title="Download this photo to your computer"
                                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-navy hover:text-white text-gray-600 transition-all cursor-pointer shadow-2xs"
                              >
                                <Download size={13} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">No Photo</span>
                          )}
                        </td>

                        {/* Registration ID */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-navy bg-navy-50 px-2 py-1 rounded border border-navy/15 whitespace-nowrap">
                            {record.registrationId}
                          </span>
                          <span className="block text-[10px] text-gray-400 mt-1">
                            {new Date(record.submittedAt).toLocaleDateString("en-IN")}
                          </span>
                        </td>

                        {/* Name & Contact */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-navy-950 text-sm">{record.name}</div>
                          <div className="text-gray-500 font-mono text-[11px]">{record.email}</div>
                          <div className="text-gray-400 text-[11px]">{record.phone}</div>
                        </td>

                        {/* Organization */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-gray-800">{record.organization}</div>
                          {record.designation && (
                            <div className="text-gray-500 text-[11px]">{record.designation}</div>
                          )}
                        </td>

                        {/* Category & Duration */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block font-semibold text-navy">
                            {record.category}
                          </span>
                          <span className="block text-gray-500 text-[11px]">
                            {record.duration || "2 Days"}
                          </span>
                          {record.accommodation && (
                            <span className="block text-gray-400 text-[10px]">
                              {record.accommodation}
                            </span>
                          )}
                        </td>

                        {/* Fee */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-extrabold text-navy-950 text-sm">
                            ₹{record.totalAmount?.toLocaleString("en-IN") || "0"}
                          </span>
                        </td>

                        {/* Payment Proof Slip & 1-Click Download */}
                        <td className="py-3.5 px-4">
                          {record.paymentScreenshot ? (
                            <div className="flex items-center gap-2">
                              {/* Thumbnail */}
                              <div
                                onClick={() =>
                                  setPreviewImage({
                                    url: record.paymentScreenshot!,
                                    title: "Transaction Receipt / Bank Screenshot",
                                    delegateName: record.name,
                                  })
                                }
                                className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-green-300 bg-white shadow-2xs hover:scale-105 transition-transform"
                                title="Click to view payment slip"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={record.paymentScreenshot}
                                  alt="Payment Slip"
                                  className="h-full w-full object-contain p-0.5"
                                />
                              </div>

                              {/* 1-Click Download Receipt Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  downloadBase64Image(
                                    record.paymentScreenshot!,
                                    `${cleanName}_Payment_Slip.png`
                                  )
                                }
                                title="Download payment receipt"
                                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-green-600 hover:text-white text-gray-600 transition-all cursor-pointer shadow-2xs"
                              >
                                <Download size={13} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">None</span>
                          )}

                          {record.transactionId && (
                            <span className="block text-[10px] font-mono text-gray-500 mt-1">
                              UTR: {record.transactionId}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteRecord(record._id, record.name)}
                            title="Delete this record"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN IMAGE PREVIEW MODAL (For Photo / Receipt)
      ───────────────────────────────────────────────────────────── */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-navy-950">{previewImage.title}</h4>
                <p className="text-xs text-gray-500">Attendee: {previewImage.delegateName}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Display */}
            <div className="max-h-[70vh] overflow-auto rounded-2xl bg-gray-50 border border-gray-200 p-2 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() =>
                  downloadBase64Image(
                    previewImage.url,
                    `${previewImage.delegateName.replace(/\s+/g, "_")}_Attachment.png`
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-navy-900 transition-all cursor-pointer"
              >
                <Download size={14} />
                <span>Download Image File</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
