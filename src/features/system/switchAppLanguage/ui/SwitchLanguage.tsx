import { sharedConfigLocale } from '@/shared/config';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name SwitchLanguage
 * @constructor
 */

export const SwitchLanguage = (): JSX.Element => {
    const { i18n } = useTranslation();
    const onChangeLanguage = (code: string): void => {
        void i18n.changeLanguage(code);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="flat" size="sm">
                    {i18n.language}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="flat"
                aria-label="Dropdown menu with shortcut"
            >
                <DropdownItem
                    key="new"
                    shortcut="⌘N"
                    onPress={() => onChangeLanguage('en')}
                >
                    English
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    shortcut="⌘C"
                    onPress={() => onChangeLanguage('ru')}
                >
                    Русский
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
