import {
    HorizontalScroll,
    HorizontalSliderWithControls,
} from '@/shared/ui/layouts';
import { useState } from 'react';
import { HorizontalDatePicker } from '@/shared/ui/components';
import { DatePeriod } from '@/shared/ui/components/forms/horizontal-date-picker/types';
import { useUnit } from 'effector-react';
import { deliveriesDatesRangeChanged } from '../model';

interface MarketDateSelectorProperties {
    typePicker: 'scroll' | 'slider';
}

/**
 * @name MarketDateSelector
 * @description filter for widget with display available deliveries
 * @constructor
 */
export const MarketDateSelector: FunctionComponent<
    MarketDateSelectorProperties
> = ({ typePicker }) => {
    const [selectedDates, setSelectedDates] =
        useState<Nullable<DatePeriod>>(null);

    const setDatesRange = useUnit(deliveriesDatesRangeChanged);

    const onChangeDate = (work: DatePeriod): void => {
        if (
            selectedDates?.dateStart === work.dateStart &&
            selectedDates?.dateEnd === work.dateEnd
        ) {
            setSelectedDates(() => null);
            setDatesRange(null);
        }

        if (
            selectedDates?.dateStart !== work.dateStart ||
            selectedDates?.dateEnd !== work.dateEnd ||
            !selectedDates
        ) {
            setDatesRange(work);
            setSelectedDates(() => work);
        }
    };

    if (typePicker === 'scroll') {
        return (
            <HorizontalScroll>
                <HorizontalDatePicker
                    selectedDates={selectedDates}
                    onChangeDate={onChangeDate}
                    offsetY="3"
                />
            </HorizontalScroll>
        );
    }
    return (
        <HorizontalSliderWithControls>
            <HorizontalDatePicker
                selectedDates={selectedDates}
                onChangeDate={onChangeDate}
                offsetY="3"
            />
        </HorizontalSliderWithControls>
    );
};
