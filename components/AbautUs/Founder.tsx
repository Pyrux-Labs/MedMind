import Image from "next/image";
import Title from "../common/Title";

interface FounderProps {
    name: string;
    bio: string;
    imageSrc: string;
    email: string;
    linkedIn: string;
}

const Founder = ({ name, bio, imageSrc, email, linkedIn }: FounderProps) => {
    const namespace = name;

    return (
        <div className="w-130 flex flex-col gap-10">
            <Image
                src={imageSrc}
                alt={namespace}
                width={529}
                height={529}
                className="object-cover rounded-2xl shadow-custom"
            />
            <Title text={name} align="left" />
            <p className="text">{bio}</p>
            <div className="flex gap-4">
                <Image
                    src="/social/linkedin.svg"
                    alt="LinkedIn"
                    height={28}
                    width={28}
                />
                <Image
                    src="/social/email.svg"
                    alt="Email"
                    height={28}
                    width={28}
                />
            </div>
        </div>
    );
};

export default Founder;
