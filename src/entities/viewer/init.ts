import { sharedConfigLocale } from '@/shared/config';
import { sample } from 'effector';
import { once } from 'patronum';
import { initSession } from '@/entities/viewer/model/session';
import { sharedLibApp } from '@/shared/lib';
import locale_ru from './locales/ru.locale.json';
import locale_en from './locales/en.locale.json';
import { translationNS } from './config';

const { locale } = sharedConfigLocale;
const { AppGate } = sharedLibApp;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Init session
 */

sample({
    clock: once(AppGate.open),
    target: initSession,
});
