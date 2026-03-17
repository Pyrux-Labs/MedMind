import Image from "next/image";
import Title from "../common/Title";
import SocialButton from "../common/SocialButton";

interface FounderProps {
    name: string;
    bio: string;
    imageSrc: string;
    email: string;
    linkedIn: string;
    className?: string;
}

const Founder = ({
    name,
    bio,
    imageSrc,
    email,
    linkedIn,
    className,
}: FounderProps) => {
    return (
        <div
            className={`w-full lg:w-130 flex flex-col gap-6 lg:gap-10 items-start text-left ${className ?? ""}`}
        >
            <Title text={name} noMargin />
            <Image
                src={imageSrc}
                alt={name}
                width={529}
                height={529}
                sizes="(max-width: 1024px) 80vw, 529px"
                className="object-cover rounded-2xl shadow-custom w-full max-w-md lg:max-w-none"
            />
            <p className="text">{bio}</p>
            <div className="flex gap-4">
                <SocialButton src="/social/linkedin.svg" href={linkedIn} />
                <SocialButton src="/social/email.svg" email={email} />
            </div>
        </div>
    );
};

export default Founder;
