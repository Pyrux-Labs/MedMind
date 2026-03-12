export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-secondary-color border-t-transparent rounded-full animate-spin" />
            </div>
        </div>
    );
}
