"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useMemo } from "react";
import countries from "i18n-iso-countries";
import localeEN from "i18n-iso-countries/langs/en.json";
import localeES from "i18n-iso-countries/langs/es.json";

countries.registerLocale(localeEN);
countries.registerLocale(localeES);

const Form = ({ locale }: { locale: string }) => {
    const t = useTranslations("contact.form");
    const lang = locale === "es" ? "es" : "en";
    const countryList = useMemo(() => {
        const names = countries.getNames(lang, { select: "official" });
        return Object.values(names).sort((a, b) => a.localeCompare(b, lang));
    }, [lang]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : "");
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                setStatus("success");
                form.reset();
                setFileName("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 md:gap-7.5 items-center rounded-lg shadow-custom p-5 py-8 md:p-9.5 md:py-15 mx-0 md:mx-[5%] lg:mx-[10%]"
        >
            {/* Row 1: Name + Phone */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("name.label")}</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder={t("name.placeholder")}
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color transition-shadow duration-200"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("phone.label")}</label>
                    <input
                        name="phone"
                        type="tel"
                        placeholder={t("phone.placeholder")}
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color transition-shadow duration-200"
                    />
                </div>
            </div>

            {/* Row 2: Email + Country */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("email.label")}</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder={t("email.placeholder")}
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color transition-shadow duration-200"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("country.label")}</label>
                    <select
                        name="country"
                        defaultValue=""
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color transition-shadow duration-200"
                    >
                        <option value="" disabled>
                            {t("country.placeholder")}
                        </option>
                        {countryList.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Row 3: Message */}
            <div className="flex flex-col gap-2 w-full">
                <label className="label">{t("message.label")}</label>
                <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={t("message.placeholder")}
                    className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color transition-shadow duration-200"
                />
            </div>

            {/* Row 4: File upload + Submit */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full items-start sm:items-end">
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("file.label")}</label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-secondary-color label rounded-xl px-4 py-2 hover:bg-secondary-color hover:text-white transition-colors duration-200 cursor-pointer shrink-0"
                        >
                            {t("file.button")}
                        </button>
                        <span className="label truncate">
                            {fileName || t("file.noFile")}
                        </span>
                        <input
                            ref={fileInputRef}
                            name="file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {/* Submit */}
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="button w-full sm:w-40 h-12 rounded-4xl bg-main-color flex items-center justify-center hover:border hover:border-main-color hover:bg-main-bg transition-all duration-300 ease-out disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                    {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-main-bg border-t-transparent rounded-full animate-spin" />
                    ) : (
                        t("submit").toUpperCase()
                    )}
                </button>
            </div>

            {/* Feedback messages */}
            {status === "success" && (
                <p className="text-secondary-color text-sm font-medium">
                    {t("success")}
                </p>
            )}
            {status === "error" && (
                <p className="text-red text-sm font-medium">{t("error")}</p>
            )}
        </form>
    );
};

export default Form;
