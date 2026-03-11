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
        <div className={`w-130 flex flex-col gap-10 ${className ?? ""}`}>
            <Image
                src={imageSrc}
                alt={name}
                width={529}
                height={529}
                className="object-cover rounded-2xl shadow-custom"
            />
            <Title text={name} noMargin />
            <p className="text">{bio}</p>
            <div className="flex gap-4">
                <SocialButton src="/social/linkedin.svg" href={linkedIn} />
                <SocialButton src="/social/email.svg" email={email} />
            </div>
        </div>
    );
};

export default Founder;
