import { modelView } from 'effector-factorio';
import {
    factory,
    WeightRange,
} from '@/features/delivery/filterDeliveriesByParams/model/model';
import { useUnit } from 'effector-react';
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Slider,
} from '@nextui-org/react';
import { useState } from 'react';
import { sharedConfigLocale } from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { MAX_WEIGHT_KG, translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;

const LABEL_CARGO_WEIGHT_POPOVER_TITLE_KEY = 'label.weight.popoverTitle';
const LABEL_CARGO_WEIGHT_POPOVER_RANGE_LABEL_KEY =
    'label.weight.popoverSelectedRangeLabel';
const VALUE_WRAPPER_KEY = 'value.weight';
const CONTENT_TEXT_SELECT_WEIGHT = 'content.weight.text.selectWeight';
const CONTENT_TEXT_WEIGHT_RANGE = 'content.weight.text.inRange';

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

export const WeightSelector = modelView(factory, () => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);

    const [value, setValue] = useState<WeightRange>([0, MAX_WEIGHT_KG]);
    const [selected, weightChanged] = useUnit([
        model.$weight,
        model.weightChanged,
    ]);

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
                    <div className="text-tiny">
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
});
