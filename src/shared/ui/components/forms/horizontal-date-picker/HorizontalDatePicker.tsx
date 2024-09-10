import { useMemo, useState } from 'react';
import { format, add } from 'date-fns';
import { sharedConfigLocale } from '@/shared/config';
import {
    generateDatesArray,
    generateDatesInRange,
    isLastDayOfSpecificMonth,
} from './utils';
import { MonthWrapper } from './parts/MonthWrapper';
import { Day } from './parts/Day';
import { DayWrapper } from './parts/DayWrapper';
import { DatePeriod } from './types';
import { translationNS } from './config';
import locale_en from './locale/en.locale.json';
import locale_ru from './locale/ru.locale.json';

const { locale } = sharedConfigLocale;

/**
 * locales
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

interface HorizontalDatePickerProperties {
    startDate?: string;
    periodDays?: number;
    selectedDates: Optional<DatePeriod>;
    onChangeDate: (date: DatePeriod) => void;
    offsetY?: TailwindSize;
}

export const HorizontalDatePicker: FunctionComponent<
    HorizontalDatePickerProperties
> = ({
    startDate = format(new Date(), 'yyyy-MM-dd'),
    periodDays = 90,
    selectedDates,
    onChangeDate,
    offsetY,
}) => {
    const [startPeriodState, setStartPeriodState] =
        useState<Optional<string>>(null);
    const [endPeriodState, setEndPeriodState] =
        useState<Optional<string>>(null);

    const startDateParsed = startDate;
    const periodDaysParsed = format(
        add(new Date(), { days: periodDays }),
        'yyyy-MM-dd',
    );

    const generateDatesRange = useMemo(
        () => generateDatesInRange(startDateParsed, periodDaysParsed),
        [startDateParsed, periodDaysParsed],
    );

    const generateSelectedPeriod = useMemo(
        () =>
            selectedDates?.dateFrom && selectedDates?.toDate
                ? generateDatesArray(selectedDates)
                : [],
        [selectedDates],
    );

    const onPressDateHandle = (date: string): void => {
        if (!startPeriodState) {
            setStartPeriodState(date);
            onChangeDate({
                dateFrom: date,
                toDate: date,
            });
        }
        if (!endPeriodState && startPeriodState) {
            setEndPeriodState(date);
            onChangeDate({
                dateFrom: startPeriodState,
                toDate: date,
            });
        }
        if (startPeriodState && endPeriodState) {
            setStartPeriodState(date);
            setEndPeriodState(null);
            onChangeDate({
                dateFrom: date,
                toDate: date,
            });
        }
    };

    return (
        <div className="flex flex-nowrap">
            {generateDatesRange?.map((date, index) => {
                const days = date.days.map((day) => {
                    const dateSting = format(day.date, 'yyyy-MM-dd');
                    const isLastDayOfMonth = isLastDayOfSpecificMonth(day.date);

                    const isSelectDay =
                        (generateSelectedPeriod.length > 0 &&
                            generateSelectedPeriod.at(-1) === dateSting) ||
                        (generateSelectedPeriod.length > 0 &&
                            generateSelectedPeriod[0] === dateSting);

                    const isSelectWrapper =
                        generateSelectedPeriod.includes(dateSting);
                    const isFirstDayOfSelectWrapper =
                        generateSelectedPeriod.length > 1 &&
                        generateSelectedPeriod[0] === dateSting;
                    const isLastDayOfSelectWrapper =
                        generateSelectedPeriod.length > 1 &&
                        generateSelectedPeriod.at(-1) === dateSting;

                    if (generateSelectedPeriod.length === 1) {
                        return (
                            <DayWrapper key={dateSting} singleDay>
                                <Day
                                    isSelected={isSelectDay}
                                    date={day.date}
                                    onClick={onPressDateHandle}
                                />
                            </DayWrapper>
                        );
                    }

                    return (
                        <DayWrapper
                            key={dateSting}
                            isSelectedDay={isSelectWrapper}
                            firstDayOfSelect={isFirstDayOfSelectWrapper}
                            lastDayOfSelect={isLastDayOfSelectWrapper}
                            isLastMonthDay={isLastDayOfMonth}
                            singleDay={generateSelectedPeriod.length === 1}
                        >
                            <Day
                                isSelected={isSelectDay}
                                date={day.date}
                                onClick={onPressDateHandle}
                            />
                        </DayWrapper>
                    );
                });
                return (
                    <MonthWrapper
                        month={date.month}
                        key={date.month}
                        offsetStart={index === 0 ? offsetY : undefined}
                        offsetEnd={
                            index === generateDatesRange.length - 1
                                ? offsetY
                                : undefined
                        }
                    >
                        {days}
                    </MonthWrapper>
                );
            })}
        </div>
    );
};
