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
import { PropsWithChildren, useMemo, useState } from 'react';
import { translationNS } from '../config';

const { UsFlagIcon, RuFlagIcon } = sharedUiIcons;

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

    const memoizedCurrentLanguageValue = useMemo(
        () => [selectedLanguage],
        [selectedLanguage],
    );

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
