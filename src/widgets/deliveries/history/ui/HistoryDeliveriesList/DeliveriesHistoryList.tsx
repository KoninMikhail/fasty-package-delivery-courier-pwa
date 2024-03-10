import { Accordion, AccordionItem } from '@nextui-org/react';
import { LuPackage } from 'react-icons/lu';
import { PropsWithChildren, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { enUS } from 'date-fns/locale';
import { timeLocales } from '@/widgets/deliveries/history/init';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { DeliveryHistoryCard } from '@/entities/delivery';
import { getNumberPluralForm } from '@/widgets/deliveries/history/lib';
import { $sortedDeliveriesHistory, getDeliveriesHistoryFx } from '../../model';
import { translationNS } from '../../config';

const HistoryItemLayout: FunctionComponent<PropsWithChildren> = ({
    children,
}) => (
    <li>
        <div className="relative pb-8">
            <span
                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
            />
            <div className="relative flex items-start space-x-3">
                <div>
                    <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white">
                            <LuPackage className="h-5 w-5 text-white" />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    </li>
);

/**
 * View
 */
export const DeliveriesHistoryList: FunctionComponent = () => {
    const history = useUnit($sortedDeliveriesHistory);
    const { i18n, t } = useTranslation(translationNS);
    useEffect(() => {
        void getDeliveriesHistoryFx();
    }, []);

    const motionVariants = {
        enter: {
            y: 0,
            opacity: 1,
            height: 'auto',
            transition: {
                height: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                },
                opacity: {
                    easings: 'ease',
                    duration: 1,
                },
            },
        },
        exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    easings: 'ease',
                    duration: 0.25,
                },
                opacity: {
                    easings: 'ease',
                    duration: 0.3,
                },
            },
        },
    };

    return (
        <div className="w-full px-2">
            <Accordion
                motionProps={{
                    variants: {
                        ...motionVariants,
                    },
                }}
            >
                {history.map((item) => {
                    const currentLocale = timeLocales[i18n.language] || enUS;
                    const title = format(item.date, 'PPP', {
                        locale: currentLocale,
                    });
                    const i18nConfig = {
                        context: getNumberPluralForm(item.count),
                        count: item.count,
                    };

                    const deliveredCount = t(
                        'history.accordion.item.label.count.success',
                        i18nConfig,
                    );
                    const canceledCount = t(
                        'history.accordion.item.label.count.cancel',
                        i18nConfig,
                    );
                    const subtitle = item.canceled
                        ? `${deliveredCount}, ${canceledCount}`
                        : deliveredCount;

                    const items = item.items.map((delivery) => {
                        return (
                            <HistoryItemLayout key={delivery.id}>
                                <DeliveryHistoryCard delivery={delivery} />
                            </HistoryItemLayout>
                        );
                    });
                    return (
                        <AccordionItem
                            key={item.date}
                            aria-label="History item"
                            subtitle={subtitle}
                            title={title}
                        >
                            <div className="flow-root">
                                <ul className="-mb-8">{items}</ul>
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
};
