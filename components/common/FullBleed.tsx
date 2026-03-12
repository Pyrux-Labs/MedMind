// components/common/FullBleed.tsx
// for full w tops
const FullBleed = ({ children }: { children: React.ReactNode }) => (
	<div className="w-screen relative left-1/2 -translate-x-1/2">{children}</div>
);

export default FullBleed;
