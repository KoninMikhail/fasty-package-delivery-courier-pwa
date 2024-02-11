import { sharedConfigLocale } from '@/shared/config';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { sharedUiIcons } from '@/shared/ui';
import { useState } from 'react';
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

/** \

/**
 * @name ChangeLanguageButton
 * @constructor
 */
export const ChangeLanguageIconButton = (): JSX.Element => {
    const { i18n } = useTranslation(translationNS);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        i18n.language,
    );
    const onChangeLanguage = (code: string): void => {
        void i18n.changeLanguage(code);
        setSelectedLanguage(code);
    };

    const languageFlag =
        i18n.language === 'en' ? <UsFlagIcon /> : <RuFlagIcon />;

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button size="md" isIconOnly>
                    {languageFlag}
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
                    <span>English</span>
                </DropdownItem>
                <DropdownItem
                    key="ru"
                    startContent={<RuFlagIcon />}
                    onPress={() => onChangeLanguage('ru')}
                >
                    <span>Русский</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
