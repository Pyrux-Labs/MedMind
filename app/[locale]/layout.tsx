import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.home" });

    return {
        title: t("title"),
        description: t("description"),
        icons: {
            icon: "/favicon.svg",
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Params;
}) {
    const { locale } = await params;

    // Validate that the locale is supported
    if (!routing.locales.includes(locale as "es" | "en")) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale}>
            {" "}
            <body className="overflow-x-hidden">
                <NextIntlClientProvider messages={messages}>
                    <NavBar />
                    <main className="mx-30">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
