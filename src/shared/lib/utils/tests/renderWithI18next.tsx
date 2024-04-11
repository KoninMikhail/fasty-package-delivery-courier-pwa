import type React from "react";
import { I18nextProvider } from "react-i18next";
import { sharedConfigLocale } from "@/shared/config/locale";

const { locale } = sharedConfigLocale;

export const withLocale = (children: React.ReactNode) => (
  <I18nextProvider i18n={locale}>{children}</I18nextProvider>
);