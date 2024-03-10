import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { translationNS } from '../config';

interface MonthWrapperProperties extends PropsWithChildren {
    month: string;
    offsetStart?: TailwindSize;
    offsetEnd?: TailwindSize;
}

export const MonthWrapper: FunctionComponent<MonthWrapperProperties> = ({
    children,
    month,
    offsetEnd,
    offsetStart,
}) => {
    const { t } = useTranslation(translationNS);
    const monthLabel = t(`month.${month.toLowerCase()}.full`);
    return (
        <div className="relative">
            <span className="sticky left-0 px-4 text-xs uppercase text-content4">
                {monthLabel}
            </span>
            <div
                className={clsx(
                    'flex flex-nowrap',
                    offsetStart && `pl-${offsetStart}`,
                    offsetEnd && `pr-${offsetEnd}`,
                )}
            >
                {children}
            </div>
        </div>
    );
};
