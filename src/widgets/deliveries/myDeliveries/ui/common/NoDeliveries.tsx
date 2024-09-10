import { useTranslation } from 'react-i18next';
import { Spacer } from '@nextui-org/react';
import { BsBoxSeam } from 'react-icons/bs';
import { DATA_EMPTY_TEXT_KEY, translationNS } from '../../config';

interface NoDeliveriesProperties {
    iconSize?: 'sm' | 'md' | 'lg';
    bordered?: boolean;
    classNames?: {
        container?: string;
    };
}

export const NoDeliveries: FunctionComponent<NoDeliveriesProperties> = ({
    bordered,
    iconSize,
    classNames,
}) => {
    const { t } = useTranslation(translationNS);

    const iconClass =
        {
            sm: 'text-3xl',
            md: 'text-6xl',
            lg: 'text-9xl',
        }[iconSize ?? 'md'] ?? 'text-6xl';
    const containerClass = classNames?.container ?? 'block';
    const borderClass = bordered
        ? 'border-2 border-dashed border-content3'
        : '';

    return (
        <div className={containerClass}>
            <div
                className={`flex h-44 w-full flex-col items-center justify-center rounded-xl ${borderClass} p-4 text-center`}
            >
                <BsBoxSeam className={`${iconClass} text-content3`} />
                <Spacer y={3} />
                <div>
                    <span className="text-center text-lg text-content3">
                        {t(DATA_EMPTY_TEXT_KEY)}
                    </span>
                </div>
            </div>
        </div>
    );
};
