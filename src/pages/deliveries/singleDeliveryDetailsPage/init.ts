import { sharedConfigLocale } from '@/shared/config';
import './middleware/persist';
import { translationNS } from './config';
import locale_en from './locales/en.locale.json';
import locale_ru from './locales/ru.locale.json';
import 'leaflet/dist/leaflet.css';

const { locale } = sharedConfigLocale;

locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);
