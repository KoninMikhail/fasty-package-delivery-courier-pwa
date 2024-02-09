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
import { sharedUiIcons } from '@/shared/ui';
import { PropsWithChildren, useState } from 'react';
import { translationNS } from '../config';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { UsFlagIcon, RuFlagIcon } = sharedUiIcons;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Components
 */
const LanguageLabel: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <span>{children}</span>
);

/**
 * @name ChangeLanguageButton
 * @constructor
 */
export const ChangeLanguageButton = (): JSX.Element => {
    const { t, i18n } = useTranslation(translationNS);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        i18n.language,
    );
    const onChangeLanguage = (code: string): void => {
        void i18n.changeLanguage(code);
        setSelectedLanguage(code);
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
                aria-label="Change language"
                variant="faded"
                selectionMode="single"
                selectedKeys={selectedLanguage}
            >
                <DropdownItem
                    key="en"
                    startContent={<UsFlagIcon />}
                    onPress={() => onChangeLanguage('en')}
                >
                    <LanguageLabel>English</LanguageLabel>
                </DropdownItem>
                <DropdownItem
                    key="ru"
                    startContent={<RuFlagIcon />}
                    onPress={() => onChangeLanguage('ru')}
                >
                    <LanguageLabel>Русский</LanguageLabel>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
