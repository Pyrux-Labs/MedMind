export interface ImageFormat {
	name: string;
	width: number;
	height: number;
	url: string;
	size: number; // en KB
}

export interface Cover {
	id: number;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	url: string;
	formats: {
		thumbnail?: ImageFormat;
		small?: ImageFormat;
		medium?: ImageFormat;
		large?: ImageFormat;
		xlarge?: ImageFormat;
	};
}

export interface Article {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	content: string;
	author: string;
	locale: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	cover: Cover | null;
	localizations?: Array<{ slug: string; locale: string }>;
}

export interface StrapiResponse<T> {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
