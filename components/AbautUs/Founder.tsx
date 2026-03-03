interface FounderProps {
	name: string;
	bio: string;
}

const Founder = ({ name, bio }: FounderProps) => {
	return (
		<div>
			<h3>{name}</h3>
			<p>{bio}</p>
		</div>
	);
};

export default Founder;
