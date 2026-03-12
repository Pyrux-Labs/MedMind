import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const country = formData.get("country") as string;
        const message = formData.get("message") as string;
        const file = formData.get("file") as File | null;

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
            subject: `New contact from ${name}`,
            html: `
                <h2>New contact form submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
            attachments,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
