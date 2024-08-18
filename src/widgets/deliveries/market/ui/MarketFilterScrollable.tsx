import { HorizontalScroll } from '@/shared/ui/layouts';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Slider,
} from '@nextui-org/react';
import { FaCar, FaFireAlt } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { GiGymBag } from 'react-icons/gi';

import {
    EXPRESS_LABEL_KEY,
    LABEL_ONCAR_KEY,
    LABEL_ONFOOT_KEY,
    MAX_WEIGHT_KG,
    LABEL_SELECT_TYPE_KEY,
    LABEL_UNSET_KEY,
    VALUE_WRAPPER_KEY,
    LABEL_CARGO_WEIGHT_POPOVER_RANGE_LABEL_KEY,
    CONTENT_TEXT_WEIGHT_RANGE,
    CONTENT_TEXT_SELECT_WEIGHT,
    LABEL_CARGO_WEIGHT_POPOVER_TITLE_KEY,
    translationNS,
} from '../config';

import {
    $deliveryType,
    $express,
    $weight,
    deliveryTypeChanged,
    expressChanged,
    weightRangeSelected,
} from '../model/stores';

/**
 * Types
 */

type OptionsDictionary = {
    [key in DeliveryType]: {
        text: string;
        icon: JSX.Element | null;
    };
};

/**
 * Components
 */

interface MarketFilterScrollableProperties {
    withOutPadding?: boolean;
}

const ExpressSelector: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);

    const { isSelected, setExpress } = useUnit({
        isSelected: $express,
        setExpress: expressChanged,
    });
    const onPress = (): void => {
        if (isSelected) {
            setExpress(false);
        } else {
            setExpress(true);
        }
    };

    return (
        <Button
            color="danger"
            className="w-24 rounded-full"
            size="sm"
            variant={isSelected ? 'solid' : 'bordered'}
            onPress={onPress}
        >
            <FaFireAlt />
            {t(EXPRESS_LABEL_KEY)}
        </Button>
    );
};
const DeliveryTypeSelector: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);

    const { selectedKeys, onSelectKeys } = useUnit({
        selectedKeys: $deliveryType,
        onSelectKeys: deliveryTypeChanged,
    });
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
                    className="rounded-full"
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
};
const WeightSelector: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);

    const [value, setValue] = useState<[number, number]>([0, MAX_WEIGHT_KG]);
    const { selected, weightChanged } = useUnit({
        selected: $weight,
        weightChanged: weightRangeSelected,
    });

    const isSelected =
        !!selected && (selected[0] !== 0 || selected[1] !== MAX_WEIGHT_KG);
    const popoverTitle = t(LABEL_CARGO_WEIGHT_POPOVER_TITLE_KEY);
    const popoverSelectWeight = t(CONTENT_TEXT_SELECT_WEIGHT);
    const popoverWeightRange = t(CONTENT_TEXT_WEIGHT_RANGE);
    const popoverRangeLabel = t(LABEL_CARGO_WEIGHT_POPOVER_RANGE_LABEL_KEY);

    const persistWeightValue = (weight: number): string =>
        t(VALUE_WRAPPER_KEY, {
            value: weight,
        });

    const onSliderChange = (range: number | number[]): void => {
        if (Array.isArray(range)) {
            setValue(() => [range[0], range[1]]);
            weightChanged([range[0], range[1]]);
        }
    };

    return (
        <Popover placement="bottom" offset={20} showArrow>
            <PopoverTrigger>
                <Button
                    className="rounded-full"
                    size="sm"
                    variant={isSelected ? 'solid' : 'bordered'}
                >
                    {isSelected
                        ? `${persistWeightValue(selected[0])} - ${persistWeightValue(selected[1])}`
                        : popoverSelectWeight}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">{popoverTitle}</div>
                    <div className="py-1 text-xs">
                        {popoverSelectWeight} <br />
                        {popoverWeightRange}
                    </div>
                    <div className="min-w-64 text-tiny">
                        <Slider
                            aria-label="weight-slider"
                            step={2}
                            maxValue={MAX_WEIGHT_KG}
                            minValue={0}
                            value={value}
                            onChange={onSliderChange}
                            className="max-w-lg"
                        />
                        <p className="text-small font-medium text-default-500">
                            {popoverRangeLabel}{' '}
                            {Array.isArray(value) &&
                                value
                                    .map((b) => `${persistWeightValue(b)}`)
                                    .join(' – ')}
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

/**
 * @name DeliveriesMarketContent
 * @description widget for display available deliveries
 * @constructor
 */
export const MarketFilterScrollable: FunctionComponent<
    MarketFilterScrollableProperties
> = ({ withOutPadding }) => {
    return (
        <div className="flex gap-4">
            <HorizontalScroll>
                <div
                    className={clsx(
                        'flex flex-nowrap gap-2',
                        withOutPadding && 'px-4',
                    )}
                >
                    <ExpressSelector />
                    <DeliveryTypeSelector />
                    <WeightSelector />
                </div>
            </HorizontalScroll>
        </div>
    );
};
