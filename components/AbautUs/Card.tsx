interface CardProps {
    title: string;
    description: string;
}

const Card = ({ title, description }: CardProps) => {
    return (
        <div className="group w-80 h-44 perspective-[1000px]">
            <div className="relative w-full h-full transition-transform duration-700 transform-3d group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center p-4 [backface-visibility:hidden] border-2 border-main-color shadow-custom rounded-3xl">
                    <h3 className="contact_us">{title}</h3>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-main-color shadow-custom rounded-3xl">
                    <p className="text">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
