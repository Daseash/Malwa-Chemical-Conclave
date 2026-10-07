import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Delegate registrations for Malwa Chemical Conclave 2026 are officially closed." },
    { status: 403 }
  );
}

export async function GET() {
  return NextResponse.json(
    { status: "closed", message: "Registrations for Malwa Chemical Conclave 2026 are officially closed." },
    { status: 200 }
  );
}
