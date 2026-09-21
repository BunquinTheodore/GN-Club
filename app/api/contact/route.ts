import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const TEAM_INBOX = site.contact.email;

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — inquiry from",
      data.email,
      "was not delivered:",
      data
    );
    return NextResponse.json(
      { error: "Email delivery is not configured yet" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "GN Club Website <onboarding@resend.dev>",
    to: TEAM_INBOX,
    replyTo: data.email,
    subject: `New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.company ? `Company / brand: ${data.company}` : null,
      data.service ? `Service: ${data.service}` : null,
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend failed to send GN Club inquiry:", error, data);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
