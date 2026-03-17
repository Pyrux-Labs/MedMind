import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import { ArticleLocaleProvider } from "@/components/common/ArticleLocaleContext";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.medmind.com.ar";

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
    const otherLocale = locale === "es" ? "en" : "es";

    return {
        metadataBase: new URL(BASE_URL),
        title: t("title"),
        description: t("description"),
        keywords: [
            "medical translation",
            "traducción médica",
            "health translation",
            "educational translation",
            "traducción educativa",
            "English Spanish translation",
            "traducción inglés español",
            "MedMind",
        ],
        icons: {
            icon: [
                {
                    url: "/icons/favicon.svg",
                    type: "image/svg+xml",
                },
                {
                    url: "/icons/favicon-32x32.png",
                    sizes: "32x32",
                    type: "image/png",
                },
                {
                    url: "/icons/favicon-16x16.png",
                    sizes: "16x16",
                    type: "image/png",
                },
            ],
            apple: "/icons/apple-touch-icon.png",
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `${BASE_URL}/${locale}`,
            siteName: "MedMind",
            locale: locale === "es" ? "es_AR" : "en_US",
            type: "website",
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "MedMind — Linguistic Solutions",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: ["/og-image.png"],
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}`,
            languages: {
                es: `${BASE_URL}/es`,
                en: `${BASE_URL}/en`,
                [otherLocale]: `${BASE_URL}/${otherLocale}`,
            },
        },
        robots: { index: true, follow: true },
    };
}

function OrganizationJsonLd({ locale }: { locale: string }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MedMind",
        url: BASE_URL,
        logo: `${BASE_URL}/icons/logo.svg`,
        description:
            locale === "es"
                ? "Soluciones lingüísticas especializadas en salud y educación entre inglés y español."
                : "Specialized linguistic solutions in health and education between English and Spanish.",
        contactPoint: {
            "@type": "ContactPoint",
            email: "info@medmind.com.ar",
            contactType: "customer service",
            availableLanguage: ["English", "Spanish"],
        },
        sameAs: [
            "https://www.linkedin.com/in/medmind-linguistic-solutions",
            "https://www.instagram.com/medmindls",
        ],
        address: {
            "@type": "PostalAddress",
            addressCountry: "AR",
        },
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
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
        <html lang={locale} className="overflow-x-hidden">
            <head>
                <link
                    rel="preload"
                    href="/fonts/Butler-Medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/CooperHewitt-Medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </head>
            <body className="overflow-x-hidden max-w-full" suppressHydrationWarning>
                <OrganizationJsonLd locale={locale} />
                <NextIntlClientProvider messages={messages}>
                    <ArticleLocaleProvider>
                        <NavBar />
                        <main className="px-5 md:px-8 lg:mx-[8%] xl:mx-auto xl:max-w-7xl xl:px-6 animate-page-in">
                            {children}
                        </main>
                        <Footer />
                    </ArticleLocaleProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
