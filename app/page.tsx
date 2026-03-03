import Contact from "@/components/Landing/Contact";
import Content from "@/components/Landing/Content";
import Service from "@/components/Landing/Service";
import Top from "@/components/Landing/Top";
import Values from "@/components/Landing/Values";

export default function Home() {
    return (
        <div>
            <Top />
            <Content />
            <Content />
            <Service />
            <Values />
            <Contact />
        </div>
    );
}
