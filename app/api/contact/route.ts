import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: wire up to an email/CRM provider (e.g. Resend, SendGrid, HubSpot)
  // once the user picks one. For now, log the inquiry server-side.
  console.log("New GN Club inquiry:", data);

  return NextResponse.json({ ok: true });
}
