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

const { UsFlagIcon, RuFlagIcon } = sharedUiIcons;

export const IconButton: FunctionComponent = () => {
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
                <Button size="md" isIconOnly startContent={languageFlag} />
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
                    English
                </DropdownItem>
                <DropdownItem
                    key="ru"
                    startContent={<RuFlagIcon />}
                    onPress={() => onChangeLanguage('ru')}
                >
                    Русский
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
