"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const COUNTRIES_EN = [
    "Argentina",
    "Bolivia",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Dominican Republic",
    "Ecuador",
    "El Salvador",
    "Guatemala",
    "Honduras",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Paraguay",
    "Peru",
    "Puerto Rico",
    "Spain",
    "United States",
    "Uruguay",
    "Venezuela",
    "Other",
];

const COUNTRIES_ES = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Canadá",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "España",
    "Estados Unidos",
    "Guatemala",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "Puerto Rico",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
    "Otro",
];

const Form = ({ locale }: { locale: string }) => {
    const t = useTranslations("contact.form");
    const countries = locale === "es" ? COUNTRIES_ES : COUNTRIES_EN;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const form = e.currentTarget;
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
        <div className="w-full max-w-3xl mx-auto px-4 pb-20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-(family-name:--cooper-hewitt) text-text-color font-medium text-sm">
                            {t("name.label")}
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder={t("name.placeholder")}
                            className="border border-secondary-color rounded-md px-4 py-3 bg-transparent text-main-color placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-(family-name:--cooper-hewitt) text-text-color font-medium text-sm">
                            {t("phone.label")}
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            placeholder={t("phone.placeholder")}
                            className="border border-secondary-color rounded-md px-4 py-3 bg-transparent text-main-color placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        />
                    </div>
                </div>

                {/* Row 2: Email + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-(family-name:--cooper-hewitt) text-text-color font-medium text-sm">
                            {t("email.label")}
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder={t("email.placeholder")}
                            className="border border-secondary-color rounded-md px-4 py-3 bg-transparent text-main-color placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-(family-name:--cooper-hewitt) text-text-color font-medium text-sm">
                            {t("country.label")}
                        </label>
                        <select
                            name="country"
                            defaultValue=""
                            className="border border-secondary-color rounded-md px-4 py-3 bg-main-bg text-main-color focus:outline-none focus:ring-2 focus:ring-secondary-color"
                        >
                            <option value="" disabled>
                                {t("country.placeholder")}
                            </option>
                            {countries.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row 3: Message */}
                <div className="flex flex-col gap-2">
                    <label className="font-(family-name:--cooper-hewitt) text-text-color font-medium text-sm">
                        {t("message.label")}
                    </label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder={t("message.placeholder")}
                        className="border border-secondary-color rounded-md px-4 py-3 bg-transparent text-main-color placeholder:text-footer-labels focus:outline-none focus:ring-2 focus:ring-secondary-color resize-none"
                    />
                </div>

                {/* Row 4: File upload */}
                <div className="flex flex-col gap-2">
                    <label className="font-(family-name:--cooper-hewitt) text-text-color font-medium text-sm">
                        {t("file.label")}
                    </label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="border border-secondary-color text-text-color rounded-md px-4 py-2 text-sm hover:bg-secondary-color hover:text-white transition-colors cursor-pointer"
                        >
                            {t("file.button")}
                        </button>
                        <span className="text-sm text-footer-labels truncate">
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

                {/* Feedback messages */}
                {status === "success" && (
                    <p className="text-secondary-color text-sm font-medium">
                        {t("success")}
                    </p>
                )}
                {status === "error" && (
                    <p className="text-red text-sm font-medium">{t("error")}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="self-start border border-main-color text-main-color rounded-md px-10 py-3 font-(family-name:--cooper-hewitt) font-medium hover:bg-main-color hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {status === "loading" ? "..." : t("submit")}
                </button>
            </form>
        </div>
    );
};

export default Form;
