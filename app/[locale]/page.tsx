import { setRequestLocale } from "next-intl/server";
import Contact from "@/components/Landing/Contact";
import Content from "@/components/Landing/Content";
import Service from "@/components/Landing/Service";
import Top from "@/components/Landing/Top";
import Values from "@/components/Landing/Values";

type Params = Promise<{ locale: string }>;

export default async function Home({ params }: { params: Params }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div>
            <Top />
            <Content
                namespace="health"
                imageSrc="/landing_content_health.jpg"
            />
            <Content
                namespace="education"
                imageSrc="/landing_content_education.jpg"
                imageLeft
            />
            <Service />
            <Values />
            <Contact />
        </div>
    );
}
