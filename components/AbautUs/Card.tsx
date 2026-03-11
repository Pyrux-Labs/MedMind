import Image from "next/image";

interface CardProps {
    title: string;
    description: string;
    imageSrc: string;
}

const Card = ({ title, description, imageSrc }: CardProps) => {
    return (
        <div className="group w-91 h-67 perspective-[1000px]">
            <div className="w-full h-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">
                <div className="absolute inset-0 flex items-center justify-center backface-hidden border-2 border-main-color shadow-custom rounded-3xl flex-col gap-3.5">
                    <Image src={imageSrc} alt="check" height={60} width={60} />
                    <h3 className="contact_us">{title}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-5 transform-[rotateY(180deg)] backface-hidden border-2 border-main-color shadow-custom rounded-3xl">
                    <p className="text border-l-2 pl-5">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
