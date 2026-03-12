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
            className="flex flex-col gap-7.5 items-center rounded-lg shadow-custom p-9.5 py-15 mx-[10%]"
        >
            {/* Row 1: Name + Phone */}
            <div className="flex gap-6 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("name.label")}</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder={t("name.placeholder")}
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("phone.label")}</label>
                    <input
                        name="phone"
                        type="tel"
                        placeholder={t("phone.placeholder")}
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    />
                </div>
            </div>

            {/* Row 2: Email + Country */}
            <div className="flex gap-6 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("email.label")}</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder={t("email.placeholder")}
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("country.label")}</label>
                    <select
                        name="country"
                        defaultValue=""
                        className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
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
                    className="w-full rounded-lg p-2 bg-white text placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
                />
            </div>

            {/* Row 4: File upload */}
            <div className="flex gap-6 w-full items-end">
                <div className="flex flex-col gap-2 w-full">
                    <label className="label">{t("file.label")}</label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-secondary-color label rounded-xl px-4 py-2 hover:bg-secondary-color hover:text-white transition-colors cursor-pointer"
                        >
                            {t("file.button")}
                        </button>
                        <span className="label">
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
                    className="button w-27 h-10 rounded-4xl bg-main-color flex items-center justify-center hover:border hover:border-main-color hover:bg-main-bg group-hover:border group-hover:border-main-color group-hover:bg-main-bg transition-colors duration-200"
                >
                    {status === "loading" ? "..." : t("submit").toUpperCase()}
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
