import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { translationNS } from '../config';

interface MonthWrapperProperties extends PropsWithChildren {
    month: string;
}

export const MonthWrapper: FunctionComponent<MonthWrapperProperties> = ({
    children,
    month,
}) => {
    const { t } = useTranslation(translationNS);
    const monthLabel = t(`month.${month.toLowerCase()}.full`);
    return (
        <div className="relative">
            <span className="sticky left-0 pl-4 text-xs uppercase text-content4">
                {monthLabel}
            </span>
            <div className="flex flex-nowrap">{children}</div>
        </div>
    );
};
