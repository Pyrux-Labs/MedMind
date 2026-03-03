import "./globals.css";

// Root layout is intentionally minimal.
// The [locale] layout handles html, body, NavBar, Footer, and i18n.
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
