import { Accordion, AccordionItem, Button, Chip } from '@nextui-org/react';
import { LuPackage } from 'react-icons/lu';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { enUS } from 'date-fns/locale';
import { timeLocales } from '@/widgets/deliveries/history/init';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { $sortedDeliveriesHistory, getDeliveriesHistoryFx } from '../../model';

/**
 * Components
 */
const Item: FunctionComponent = () => {
    return (
        <div className="min-w-0 flex-1 py-0">
            <div className="text-md text-gray-500">
                <div className="flex">
                    <a
                        href="#"
                        className="mr-2 flex-grow font-medium text-gray-900"
                    >
                        17th of September 2021
                    </a>
                    <Chip color="success" variant="dot" size="sm">
                        Завершено
                    </Chip>
                </div>
                <span className="whitespace-nowrap text-sm">
                    You have 3 deliveries
                </span>
            </div>
            <div className="mt-2 text-gray-700">
                <p>
                    - Added a user profile page for personalized settings.
                    <br />
                    - Implemented a dark mode for improved user experience at
                    night.
                    <br />- Introduced real-time notifications for instant
                    updates.
                </p>
                <Button fullWidth variant="bordered">
                    Посмотреть
                </Button>
            </div>
        </div>
    );
};

/**
 * View
 */
export const DeliveriesHistoryList: FunctionComponent = () => {
    const history = useUnit($sortedDeliveriesHistory);
    const { i18n } = useTranslation();
    useEffect(() => {
        void getDeliveriesHistoryFx();
    }, []);

    return (
        <div className="w-full px-2">
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
                    },
                }}
            >
                {history.map((item) => {
                    const currentLocale = timeLocales[i18n.language] || enUS;
                    const title = format(item.date, 'PPP', {
                        locale: currentLocale,
                    });

                    const subtitle = item.canceled
                        ? `You have ${item.count} deliveries, ${item.canceled} uncompleted`
                        : `You have ${item.count} deliveries`;
                    const items = item.items.map((delivery) => {
                        return (
                            <li key={delivery.id}>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
                        );
                    });
                    return (
                        <AccordionItem
                            aria-label="Accordion 1"
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
            {/* <Accordion
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
                    },
                }}
            >
                <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    subtitle="You have 5 deliveries"
                    title="17 сентября"
                >
                    <div className="flow-root">
                        <ul className="-mb-8">
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                                    <svg
                                                        className="h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <Item />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </AccordionItem>
                <AccordionItem
                    key="2"
                    title="18 сентября"
                    aria-label="Accordion 2"
                    subtitle="You have 3 deliveries"
                >
                    <div className="flow-root">
                        <ul className="-mb-8">
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                                    <svg
                                                        className="h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <Item />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </AccordionItem>
                <AccordionItem
                    key="3"
                    aria-label="Accordion 3"
                    subtitle="You have 3 deliveries, 2 uncompleted"
                    title="19 сентября"
                >
                    <div className="flow-root">
                        <ul className="-mb-8">
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                        <Item />
                                    </div>
                                </div>
                            </li>
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
                                                    <svg
                                                        className="h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <Item />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </AccordionItem>
            </Accordion> */}
        </div>
    );
};
