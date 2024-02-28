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
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

interface HorizontalDatePickerProperties {
    startDate?: string;
    periodDays?: number;
    selectedDates?: DatePeriod;
    onChangeDate: (date: DatePeriod) => void;
}

export const HorizontalDatePicker: FunctionComponent<
    HorizontalDatePickerProperties
> = ({
    startDate = format(new Date(), 'dd-MM-yyyy'),
    periodDays = 90,
    selectedDates,
    onChangeDate,
}) => {
    const [startPeriodState, setStartPeriodState] =
        useState<Nullable<string>>(null);
    const [endPeriodState, setEndPeriodState] =
        useState<Nullable<string>>(null);

    const startDateParsed = startDate;
    const periodDaysParsed = format(
        add(new Date(), { days: periodDays }),
        'dd-MM-yyyy',
    );

    const generateDatesRange = useMemo(
        () => generateDatesInRange(startDateParsed, periodDaysParsed),
        [startDateParsed, periodDaysParsed],
    );

    const generateSelectedPeriod = useMemo(
        () =>
            selectedDates?.dateStart && selectedDates?.dateEnd
                ? generateDatesArray(selectedDates)
                : [],
        [selectedDates],
    );

    const onPressDateHandle = (date: string): void => {
        if (!startPeriodState) {
            setStartPeriodState(date);
            onChangeDate({
                dateStart: date,
                dateEnd: date,
            });
        }
        if (!endPeriodState && startPeriodState) {
            setEndPeriodState(date);
            onChangeDate({
                dateStart: startPeriodState,
                dateEnd: date,
            });
        }
        if (startPeriodState && endPeriodState) {
            setStartPeriodState(date);
            setEndPeriodState(null);
            onChangeDate({
                dateStart: date,
                dateEnd: date,
            });
        }
    };

    return (
        <div className="flex flex-nowrap">
            {generateDatesRange?.map((date) => {
                const days = date.days.map((day) => {
                    const dateSting = format(day.date, 'dd-MM-yyyy');
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
                    <MonthWrapper month={date.month} key={date.month}>
                        {days}
                    </MonthWrapper>
                );
            })}
        </div>
    );
};
