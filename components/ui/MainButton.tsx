const MainButton = ({ label = "Button" }: { label?: string }) => {
    return (
        <div className="w-60 h-16 rounded-full bg-main-color flex items-center justify-center">
            <p className="button">{label.toUpperCase()}</p>
        </div>
    );
};

export default MainButton;
