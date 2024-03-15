import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { format, isWeekend } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { translationNS } from '../config';

export interface DayInfo {
    date: Date;
    isSelected?: boolean;
    onClick?: (date: string) => void;
}

export const Day: FunctionComponent<DayInfo> = ({
    isSelected,
    onClick,
    date,
}) => {
    const { t } = useTranslation(translationNS);

    const formattedDate = format(date, 'dd-MM-yyyy');
    const dayOfWeek = format(date, 'EEEE', { locale: enUS });
    const weekLabel = t(`week.${dayOfWeek.toLowerCase()}.short`);

    const onClickHandle = (): void => {
        if (onClick) {
            onClick(formattedDate);
        }
    };

    const componentStyles = clsx('p-2 h-16 text-center', {
        'rounded-2xl bg-content3 h-full': isSelected,
    });

    const weekDayLabelStyles = clsx(
        'text-xs font-light uppercase',
        isWeekend(date) && 'text-red-600',
    );

    return (
        <button
            type="button"
            className={componentStyles}
            onClick={onClickHandle}
        >
            <div className="min-w-6 font-bold">{date.getDate()}</div>
            <div className={weekDayLabelStyles}>{weekLabel}</div>
        </button>
    );
};
