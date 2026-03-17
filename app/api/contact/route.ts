import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Honeypot: si este campo tiene valor, es un bot
        const honeypot = (formData.get("honeypot") as string | null) ?? "";
        if (honeypot) {
            return NextResponse.json({ ok: true }); // respuesta falsa para no alertar al bot
        }

        const name = (formData.get("name") as string | null)?.trim() ?? "";
        const phone = (formData.get("phone") as string | null)?.trim() ?? "";
        const email = (formData.get("email") as string | null)?.trim() ?? "";
        const country =
            (formData.get("country") as string | null)?.trim() ?? "";
        const message =
            (formData.get("message") as string | null)?.trim() ?? "";
        const file = formData.get("file") as File | null;

        if (!name || !email || !message) {
            return NextResponse.json(
                { ok: false, error: "Missing required fields" },
                { status: 400 },
            );
        }

        if (!EMAIL_RE.test(email)) {
            return NextResponse.json(
                { ok: false, error: "Invalid email format" },
                { status: 400 },
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const attachments: nodemailer.SendMailOptions["attachments"] = [];
        if (file && file.size > 0) {
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { ok: false, error: "File too large (max 10MB)" },
                    { status: 400 },
                );
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            attachments.push({
                filename: file.name,
                content: buffer,
            });
        }

        await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME ?? "MedMind Contact"}" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
            to: process.env.SMTP_TO ?? "pyrux@pyrux.com.ar",
            replyTo: email,
            subject: `New contact from ${escapeHtml(name)}`,
            html: `
                <h2>Nuevo formulario!</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Country:</strong> ${escapeHtml(country)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            `,
            attachments,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
