import { sharedConfigLocale } from '@/shared/config';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { RiArrowDownSFill } from 'react-icons/ri';
import { sharedUiComponents } from '@/shared/ui';
import { translationNS } from '../config';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { Text } = sharedUiComponents;

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
    const { t, i18n } = useTranslation(translationNS);
    const onChangeLanguage = (code: string): void => {
        void i18n.changeLanguage(code);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="light" size="md">
                    {t('language_name')}
                    <RiArrowDownSFill />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with shortcut"
            >
                <DropdownItem
                    key="new"
                    shortcut="⌘N"
                    onPress={() => onChangeLanguage('en')}
                >
                    <Text as="span">English</Text>
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    shortcut="⌘C"
                    onPress={() => onChangeLanguage('ru')}
                >
                    <Text as="span">Русский</Text>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
