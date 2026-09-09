import { NextRequest, NextResponse } from "next/server";
import getMongoClientPromise from "@/lib/mongodb";

const DB_NAME = "malwa_chemical_conclave";
const COLLECTION = "registrations";

interface RegistrationBody {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  organization?: string;
  designation?: string;
  duration?: string;
  accommodation?: string;
  photo?: string; // Base64 data URL
  paymentScreenshot?: string; // Base64 data URL
  transactionId?: string;
  message?: string;
  totalAmount?: number;
  website?: string; // Honeypot field for anti-bot protection
}

// Regex patterns
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_PATTERN = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

// In-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps outside the window
  const validTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, active);
      }
    }
  }

  return false;
}

// Basic input sanitizer to prevent XSS payloads in stored text
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "") // Strip raw angle brackets
    .trim();
}

export async function POST(request: NextRequest) {
  // 1. IP extraction & Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  // 2. Parse JSON body
  let body: RegistrationBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // 3. Honeypot check (anti-bot)
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ success: true, id: "bot_ignored" }, { status: 200 });
  }

  const {
    name,
    email,
    phone,
    category,
    organization,
    designation,
    duration,
    accommodation,
    photo,
    paymentScreenshot,
    transactionId,
    message,
    totalAmount,
  } = body;

  // 4. Required fields validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Email address is required." }, { status: 400 });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }
  if (!category || typeof category !== "string" || !category.trim()) {
    return NextResponse.json({ error: "Category is required." }, { status: 400 });
  }

  // 5. Length constraints & pattern validation
  const cleanName = sanitize(name);
  if (cleanName.length < 2 || cleanName.length > 100) {
    return NextResponse.json({ error: "Name must be between 2 and 100 characters." }, { status: 400 });
  }

  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail.length > 100 || !EMAIL_PATTERN.test(cleanEmail)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const cleanPhone = phone.trim().replace(/\D/g, "");
  if (cleanPhone.length !== 10) {
    return NextResponse.json({ error: "Please provide a valid 10-digit phone number." }, { status: 400 });
  }

  const cleanCategory = sanitize(category).slice(0, 150);
  const cleanOrg = organization && typeof organization === "string" ? sanitize(organization).slice(0, 150) : "";
  const cleanDesignation = designation && typeof designation === "string" ? sanitize(designation).slice(0, 100) : "";
  const cleanDuration = duration && typeof duration === "string" ? sanitize(duration).slice(0, 100) : "";
  const cleanAccommodation = accommodation && typeof accommodation === "string" ? sanitize(accommodation).slice(0, 150) : "";
  const cleanTransactionId = transactionId && typeof transactionId === "string" ? sanitize(transactionId).slice(0, 100) : "";
  const cleanMessage = message && typeof message === "string" ? sanitize(message).slice(0, 1000) : "";

  // 6. Validate numerical amount
  const validAmount = typeof totalAmount === "number" && totalAmount >= 0 && totalAmount <= 1000000 ? totalAmount : 0;

  // 7. Validate Photo (if provided)
  if (photo && typeof photo === "string") {
    // Base64 check: must not exceed ~3 MB in base64 (~2 MB raw file)
    if (photo.length > 3.5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Photo size exceeds the maximum limit (2 MB). Please reduce the photo size to under 1 MB." },
        { status: 400 }
      );
    }
  }

  // 8. Generate Human-Readable Registration ID
  const regId = `MCC-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  // 9. Write to MongoDB
  try {
    const clientPromise = getMongoClientPromise();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const docToInsert = {
      registrationId: regId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      category: cleanCategory,
      organization: cleanOrg,
      designation: cleanDesignation,
      duration: cleanDuration,
      accommodation: cleanAccommodation,
      totalAmount: validAmount,
      photo: photo || null,
      hasPhoto: Boolean(photo),
      paymentScreenshot: paymentScreenshot || null,
      hasPaymentScreenshot: Boolean(paymentScreenshot),
      transactionId: cleanTransactionId || null,
      message: cleanMessage,
      submittedAt: new Date(),
    };

    const result = await db.collection(COLLECTION).insertOne(docToInsert);

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
        registrationId: regId,
        message: "Registration submitted successfully! Your details have been securely recorded in the conclave database.",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Registration submission failed:", errorMessage);
    return NextResponse.json(
      {
        error: "Could not save your registration right now. " + errorMessage,
      },
      { status: 500 }
    );
  }
}
