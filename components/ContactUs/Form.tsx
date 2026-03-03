"use client";

import { useTranslations } from "next-intl";

const Form = () => {
	const t = useTranslations("contact.form");

	return (
		<div>
			<form>
				<div>
					<label>{t("name.label")}</label>
					<input placeholder={t("name.placeholder")} />
				</div>
				<div>
					<label>{t("phone.label")}</label>
					<input placeholder={t("phone.placeholder")} />
				</div>
				<div>
					<label>{t("email.label")}</label>
					<input placeholder={t("email.placeholder")} />
				</div>
				<div>
					<label>{t("country.label")}</label>
					<input placeholder={t("country.placeholder")} />
				</div>
				<div>
					<label>{t("message.label")}</label>
					<textarea placeholder={t("message.placeholder")} />
				</div>
				<button type="submit">{t("submit")}</button>
			</form>
		</div>
	);
};

export default Form;
