import { modelView } from 'effector-factorio';
import { useMemo } from 'react';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { FaCar } from 'react-icons/fa';
import { GiGymBag } from 'react-icons/gi';
import { useUnit } from 'effector-react';
import { sharedConfigLocale } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { DeliveryType, factory } from '../model/model';

import { translationNS } from '../config';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;

const LABEL_UNSET_KEY = 'label.type.notSelected';
const LABEL_ONCAR_KEY = 'label.type.onCar';
const LABEL_ONFOOT_KEY = 'label.type.onFoot';
const LABEL_SELECT_TYPE_KEY = 'label.type.selectType';

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

type OptionsDictionary = {
    [key in DeliveryType]: {
        text: string;
        icon: JSX.Element | null;
    };
};

export const TypeSelector = modelView(factory, () => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);

    const [selectedKeys, onSelectKeys] = useUnit([
        model.$type,
        model.typeSelected,
    ]);
    const selectedValue = useMemo(
        () => [...selectedKeys].join(', ').replaceAll('_', ' '),
        [selectedKeys],
    );

    const options = useMemo<OptionsDictionary>(
        () => ({
            unset: { text: t(LABEL_UNSET_KEY), icon: null },
            car: { text: t(LABEL_ONCAR_KEY), icon: <FaCar /> },
            foot: { text: t(LABEL_ONFOOT_KEY), icon: <GiGymBag /> },
        }),
        [t],
    );

    const isSelected = selectedValue !== 'unset';
    const icon = isSelected ? options[selectedValue.toLowerCase()].icon : null;

    const label = isSelected
        ? options[selectedValue.toLowerCase()].text
        : t(LABEL_SELECT_TYPE_KEY);

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant={isSelected ? 'solid' : 'bordered'}
                    className="rounded-full normal-case"
                    size="sm"
                >
                    {icon}
                    {label}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={onSelectKeys}
            >
                {Object.keys(options).map((key) => (
                    <DropdownItem
                        key={key}
                        startContent={options[key as DeliveryType].icon}
                    >
                        {options[key as DeliveryType].text}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
});
