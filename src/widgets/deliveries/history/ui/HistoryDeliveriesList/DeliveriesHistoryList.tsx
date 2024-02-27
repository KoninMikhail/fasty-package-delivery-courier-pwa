import { PropsWithChildren, useEffect } from 'react';
import { getDeliveriesHistoryFx } from '@/widgets/deliveries/history/model';
import { Chip, Divider } from '@nextui-org/react';
import { DeliveryCountdownCard } from '@/entities/delivery/ui';

const Separator: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="grid grid-cols-[auto_max-content_auto] items-center gap-2">
            <Divider />
            <Chip variant="light" className="text-md font-bold">
                {children}
            </Chip>
            <Divider />
        </div>
    );
};

export const DeliveriesHistoryList: FunctionComponent = () => {
    useEffect(() => {
        void getDeliveriesHistoryFx();
    }, []);

    return (
        <div className="grid w-full gap-4">
            <Separator>24.11.1955</Separator>
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <Separator>24.11.1955</Separator>
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <Separator>24.11.1955</Separator>
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <Separator>24.11.1955</Separator>
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <Separator>24.11.1955</Separator>
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <Separator>24.11.1955</Separator>
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <Separator>24.11.1955</Separator>
        </div>
    );
};
