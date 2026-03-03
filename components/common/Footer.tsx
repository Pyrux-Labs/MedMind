"use client";

import { useTranslations } from "next-intl";
import SocialsButton from "../ui/SocialsButton";

function Footer() {
	const t = useTranslations("footer");

	return (
		<div>
			<p>{t("tagline")}</p>
			<div>
				<h4>{t("sections")}</h4>
			</div>
			<div>
				<p>{t("email")}</p>
				<p>{t("location")}</p>
				<p>{t("country")}</p>
			</div>
			<SocialsButton />
			<SocialsButton />
			<SocialsButton />
		</div>
	);
}

export default Footer;
