import LanguageDropdown from "../ui/LanguageDropdown";
import Link from "next/link";

const NavBar = () => {
    return (
        <aside className="w-full h-1/16 flex items-center justify-between px-12">
            <img src="mainLogo.svg" alt="mainLogo" className="h-16" />
            <div className="flex items-center gap-8 w-fit h-full">
                <nav className="flex w-fit h-full justify-between gap-17 label items-center">
                    <Link href="/">INICIO</Link>
                    <Link href="/news">NOTICIAS</Link>
                    <Link href="/abaut_us">SOBRE MEDMIND</Link>
                    <Link href="/contact_us">CONTACTO</Link>
                    <LanguageDropdown />
                </nav>
            </div>
        </aside>
    );
};

export default NavBar;
