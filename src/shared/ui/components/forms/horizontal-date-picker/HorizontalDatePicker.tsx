import { useMemo } from 'react';
import { generateDatesInRange } from '@/shared/ui/components/forms/horizontal-date-picker/utils';
import { MonthWrapper } from '@/shared/ui/components/forms/horizontal-date-picker/parts/MonthWrapper';
import { Day } from '@/shared/ui/components/forms/horizontal-date-picker/parts/Day';
import { format, add } from 'date-fns';
import { sharedConfigLocale } from '@/shared/config';
import { DayWrapper } from '@/shared/ui/components/forms/horizontal-date-picker/parts/DayWrapper';
import { translationNS } from './config';
import locale_en from './locale/en.locale.json';
import locale_ru from './locale/ru.locale.json';

const { locale } = sharedConfigLocale;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

interface HorizontalDatePickerProperties {
    startDate?: string;
    endDate?: string;
    selectedDates?: string[];
    onChangeDate: (date: string) => void;
}

export const HorizontalDatePicker: FunctionComponent<
    HorizontalDatePickerProperties
> = ({
    startDate = format(new Date(), 'dd-MM-yyyy'),
    endDate = format(add(new Date(), { days: 90 }), 'dd-MM-yyyy'),
    selectedDates,
    onChangeDate,
}) => {
    const generateDates = useMemo(
        () => generateDatesInRange(startDate, endDate),
        [startDate, endDate],
    );

    const onPressDateHandle = (date: string): void => {
        if (onChangeDate) {
            onChangeDate(date);
        }
    };

    return (
        <div className="flex flex-nowrap">
            {generateDates.map((date) => {
                const days = date.days.map((day) => {
                    const dateSting = format(day.date, 'dd-MM-yyyy');
                    const isSelected = selectedDates?.includes(dateSting);

                    /**
                     * Period
                     */
                    const startPeriod = selectedDates?.[0];
                    const endPeriod = selectedDates?.[1];
                    return (
                        <DayWrapper>
                            <Day
                                key={dateSting}
                                isSelected={isSelected}
                                date={day.date}
                                onClick={onPressDateHandle}
                            />
                        </DayWrapper>
                    );
                });
                return (
                    <MonthWrapper month={date.month} key={date.month}>
                        {days}
                    </MonthWrapper>
                );
            })}
        </div>
    );
};
