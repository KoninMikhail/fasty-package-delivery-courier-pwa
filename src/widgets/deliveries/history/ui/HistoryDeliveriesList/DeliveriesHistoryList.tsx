import { FunctionComponent, PropsWithChildren } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { LuPackage } from 'react-icons/lu';
import { useUnit } from 'effector-react';
import { DeliveryHistoryCard } from '@/entities/delivery';
import { InfiniteScroll } from '@/features/page/infinite-scroll';
import {
    getCanceledDeliveriesCountText,
    getLocaledDate,
    getSuccessDeliveriesCountText,
} from '../../lib';
import { $sortedDeliveriesHistory, InfiniteScrollModel } from '../../model';

/**
 * Layout component for displaying a single history item.
 */
const HistoryItemLayout: FunctionComponent<PropsWithChildren> = ({
    children,
}) => (
    <li>
        <div className="relative pb-12">
            <span
                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-content1"
                aria-hidden="true"
            />
            <div className="relative flex items-start space-x-3">
                <div className="relative px-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <LuPackage className="h-5 w-5 text-white" />
                    </div>
                </div>
                {children}
            </div>
        </div>
    </li>
);

/**
 * Component for displaying a list of deliveries history with accordion and infinite scrolling.
 */
export const DeliveriesHistoryList: FunctionComponent = () => {
    const history = useUnit($sortedDeliveriesHistory);

    const renderHistoryItems = history.map(
        ({ count, canceled, date, items }) => {
            const title = getLocaledDate(date);
            const deliveredCountText = getSuccessDeliveriesCountText(count);
            const canceledCountText = getCanceledDeliveriesCountText(canceled);
            const subtitle =
                canceled > 0
                    ? `${deliveredCountText}, ${canceledCountText}`
                    : deliveredCountText;

            return (
                <AccordionItem
                    key={date}
                    aria-label="History item"
                    subtitle={subtitle}
                    title={title}
                >
                    <div className="flow-root">
                        <ul className="-mb-8">
                            {items.map((delivery) => (
                                <HistoryItemLayout key={delivery.id}>
                                    <DeliveryHistoryCard delivery={delivery} />
                                </HistoryItemLayout>
                            ))}
                        </ul>
                    </div>
                </AccordionItem>
            );
        },
    );

    return (
        <div className="w-full px-2">
            <InfiniteScroll.Wrapper model={InfiniteScrollModel}>
                <Accordion
                    motionProps={{
                        variants: {
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
                                    opacity: { easings: 'ease', duration: 1 },
                                },
                            },
                            exit: {
                                y: -10,
                                opacity: 0,
                                height: 0,
                                transition: {
                                    height: { easings: 'ease', duration: 0.25 },
                                    opacity: { easings: 'ease', duration: 0.3 },
                                },
                            },
                        },
                    }}
                >
                    {renderHistoryItems}
                </Accordion>
            </InfiniteScroll.Wrapper>
        </div>
    );
};
