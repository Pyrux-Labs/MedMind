import "./globals.css";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// next-intl middleware sets this header
	const headersList = await headers();
	const locale = headersList.get("x-next-intl-locale") ?? routing.defaultLocale;

	return children;
}
