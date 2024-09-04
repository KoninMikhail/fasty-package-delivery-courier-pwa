import { sharedConfigLocale } from '@/shared/config';
import locale_ru from './locales/ru.locale.json';
import locale_en from './locales/en.locale.json';
import { translationNS } from './config';

const { locale } = sharedConfigLocale;

/**
 * locales
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);
