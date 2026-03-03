import { useState } from "react";

const languages = [
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
];

export const useLanguageDropdown = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(languages[0]);

    const toggleOpen = () => setOpen((v) => !v);

    const selectLanguage = (lang: (typeof languages)[0]) => {
        setSelected(lang);
        setOpen(false);
    };

    return {
        open,
        selected,
        languages,
        toggleOpen,
        selectLanguage,
    };
};
