import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, loadMessages } from "@mywell/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : defaultLocale;
  const messages = await loadMessages(locale);
  return { locale, messages };
});
