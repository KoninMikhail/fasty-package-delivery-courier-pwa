import {
    Button as NextUiButton,
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
 * @name Button
 * @constructor
 */
export const Button = (): JSX.Element => {
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
                <NextUiButton
                    variant="light"
                    size="md"
                    className={
                        'data-[hover=true]:bg-transparent" px-unit-0 bg-transparent bg-none capitalize'
                    }
                    endContent={<RiArrowDownSFill />}
                >
                    {t('language_name')}
                </NextUiButton>
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
