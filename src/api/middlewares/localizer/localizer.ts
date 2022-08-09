import { I18n } from "i18n";

export const localizer = new I18n({
    defaultLocale: "en",
    locales: ["en", "es", "pt"],
    fallbacks: { "en-*": "en", "es-*": "es", "pt-*": "pt" },
    directory: "src/locales",
    queryParameter: "lang",
    preserveLegacyCase: false,
    retryInDefaultLocale: true,
    cookie: undefined,
});
