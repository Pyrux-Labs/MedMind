import { Link } from "@/i18n/navigation";

const MainButton = ({ label = "Button" }: { label?: string }) => {
    return (
        <Link
            href="/contact"
            className="group/button w-48 md:w-60 h-14 md:h-16 rounded-full bg-main-color flex items-center justify-center hover:bg-main-bg hover:border hover:border-main-color group-hover:bg-main-bg group-hover:border group-hover:border-main-color transition-all duration-300 ease-out hover:scale-105"
        >
            <p className="button group-hover/button:text-main-color group-hover:text-main-color transition-colors duration-300">
                {label.toUpperCase()}
            </p>
        </Link>
    );
};

export default MainButton;
