"use client";

import Image from "next/image";
import { useState } from "react";

interface CardProps {
	title: string;
	description: string;
	imageSrc: string;
}

const Card = ({ title, description, imageSrc }: CardProps) => {
	const [flipped, setFlipped] = useState(false);

	return (
		<div
			className="group w-full md:w-72 lg:w-91 h-52 md:h-60 lg:h-67 perspective-[1000px]"
			onClick={() => setFlipped((v) => !v)}
		>
			<div
				className={`w-full h-full duration-700 transform-3d ${flipped ? "transform-[rotateY(180deg)]" : ""} md:group-hover:transform-[rotateY(180deg)]`}
			>
				<div className="absolute inset-0 flex items-center justify-center backface-hidden transform-[rotateY(0deg)] border-2 border-main-color shadow-custom rounded-3xl flex-col gap-3.5">
					<Image src={imageSrc} alt="" height={60} width={60} />
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
