import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "MedMind Linguistic Solutions",
        short_name: "MedMind",
        description:
            "Professional medical and educational translation and linguistic services.",
        start_url: "/",
        display: "standalone",
        background_color: "#F5F0EB",
        theme_color: "#2D5F5D",
        icons: [
            {
                src: "/icons/logo.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}
