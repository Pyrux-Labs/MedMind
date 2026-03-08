const STRAPI_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Construir URL completa de la API de Strapi
 */
export function getStrapiURL(path: string = ""): string {
	return `${STRAPI_URL}${path}`;
}

/**
 * Construir URL completa de un archivo media de Strapi.
 * Las URLs de Strapi son relativas (/uploads/...), esta función las hace absolutas.
 */
export function getStrapiMediaURL(
	url: string | null | undefined,
): string | null {
	if (!url) return null;

	// Si ya es absoluta, devolverla tal cual
	if (url.startsWith("http")) return url;

	return `${STRAPI_URL}${url}`;
}
