import { Delivery } from '@/shared/api';
import { Button, Chip } from '@nextui-org/react';

interface DeliveryHistoryCardProperties {
    delivery: Delivery;
}

export const DeliveryHistoryCard: FunctionComponent<
    DeliveryHistoryCardProperties
> = ({ delivery }) => {
    const { id, states } = delivery;

    const state =
        states === 'done'
            ? `done`
            : states === 'canceled'
              ? `canceled`
              : `default`;
    const stateBadge = {
        done: (
            <Chip color="success" variant="dot" size="sm">
                Завершено
            </Chip>
        ),
        canceled: (
            <Chip color="danger" variant="dot" size="sm">
                Отменено
            </Chip>
        ),
        default: <Chip color="warning">неизвестно</Chip>,
    }[state];

    return (
        <div className="min-w-0 flex-1 py-0">
            <div className="text-md text-gray-500">
                <div className="flex">
                    <a
                        href="#"
                        className="mr-2 flex-grow font-medium text-gray-900"
                    >
                        {`# ${id}`}
                    </a>
                    {stateBadge}
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
