const MainButton = ({ label = "Button" }: { label?: string }) => {
    return (
        <div className="group/button w-60 h-16 rounded-full bg-main-color flex items-center justify-center hover:border hover:border-main-color hover:bg-main-bg group-hover:border group-hover:border-main-color group-hover:bg-main-bg transition-colors duration-200">
            <p className="button group-hover/button:text-main-color group-hover:text-main-color">
                {label.toUpperCase()}
            </p>
        </div>
    );
};

export default MainButton;
