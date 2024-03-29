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
import { useMemo, useState } from 'react';
import { translationNS } from '../config';

const { UsFlagIcon, RuFlagIcon } = sharedUiIcons;

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

    const memoizedCurrentLanguageValue = useMemo(
        () => [selectedLanguage],
        [selectedLanguage],
    );

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="light"
                    size="md"
                    endContent={<RiArrowDownSFill />}
                >
                    {t('language_name')}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Change language"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={memoizedCurrentLanguageValue}
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
