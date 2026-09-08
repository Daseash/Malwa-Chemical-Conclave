import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getMongoClientPromise from "@/lib/mongodb";

const DB_NAME = "malwa_chemical_conclave";
const COLLECTION = "registrations";
const ADMIN_PASSWORD = "mcc@@iitindore2026";

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-admin-password");
  const authQuery = request.nextUrl.searchParams.get("token");
  return authHeader === ADMIN_PASSWORD || authQuery === ADMIN_PASSWORD;
}

// GET: Fetch all registrations
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized. Invalid secretariat access key." }, { status: 401 });
  }

  try {
    const clientPromise = getMongoClientPromise();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const registrations = await db
      .collection(COLLECTION)
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, count: registrations.length, registrations }, { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Admin fetch error:", msg);
    return NextResponse.json({ error: "Could not fetch registrations: " + msg }, { status: 500 });
  }
}

// DELETE: Remove a test or invalid registration
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Record ID is required." }, { status: 400 });
    }

    const clientPromise = getMongoClientPromise();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    let query: Record<string, unknown> = {};
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      query = { registrationId: id };
    }

    const result = await db.collection(COLLECTION).deleteOne(query);

    return NextResponse.json({ success: true, deletedCount: result.deletedCount }, { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Could not delete record: " + msg }, { status: 500 });
  }
}
