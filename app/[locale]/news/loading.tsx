export default function NewsLoading() {
    return (
        <div className="py-20">
            <div className="h-10 w-48 bg-secondary-bg/50 rounded animate-pulse mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-sm shadow-custom overflow-hidden animate-pulse"
                    >
                        <div className="h-48 bg-secondary-bg/40" />
                        <div className="p-5 space-y-3">
                            <div className="h-5 bg-secondary-bg/50 rounded w-3/4" />
                            <div className="h-4 bg-secondary-bg/30 rounded w-full" />
                            <div className="h-4 bg-secondary-bg/30 rounded w-2/3" />
                            <div className="h-3 bg-secondary-bg/20 rounded w-1/3 mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
