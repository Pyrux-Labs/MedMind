import type { Metadata } from "next";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "MedMind",
    description: "The future of translating",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                <main className="mx-30">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
