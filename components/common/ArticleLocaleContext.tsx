"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Mapea código de locale → slug del artículo actual en ese idioma
type LocaleSlugMap = Record<string, string>;

interface ContextValue {
	slugMap: LocaleSlugMap;
	setSlugMap: (map: LocaleSlugMap) => void;
}

const ArticleLocaleContext = createContext<ContextValue>({
	slugMap: {},
	setSlugMap: () => {},
});

// Va en el layout, envuelve NavBar + children para que el dropdown pueda leer el mapa
export function ArticleLocaleProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [slugMap, setSlugMap] = useState<LocaleSlugMap>({});
	return (
		<ArticleLocaleContext.Provider value={{ slugMap, setSlugMap }}>
			{children}
		</ArticleLocaleContext.Provider>
	);
}

// Va en el page del artículo — sincroniza el mapa al contexto y lo limpia al salir
export function SyncArticleLocaleMap({ slugMap }: { slugMap: LocaleSlugMap }) {
	const { setSlugMap } = useContext(ArticleLocaleContext);
	useEffect(() => {
		setSlugMap(slugMap);
		return () => setSlugMap({});
	}, [JSON.stringify(slugMap)]); // eslint-disable-line react-hooks/exhaustive-deps
	return null;
}

export function useArticleLocaleMap(): LocaleSlugMap {
	return useContext(ArticleLocaleContext).slugMap;
}
