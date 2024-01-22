import { DeliveryCardRowShort } from '@/entities/delivery/ui';

export const InProgressDeliveriesSlider: FunctionComponent = () => {
    return (
        <div className="mr-2 flex gap-4 py-2">
            <div className="block min-w-fit">
                <DeliveryCardRowShort />
            </div>
            <div className="block min-w-fit">
                <DeliveryCardRowShort />
            </div>
            <div className="block min-w-fit">
                <DeliveryCardRowShort />
            </div>
            <div className="block min-w-fit">
                <DeliveryCardRowShort />
            </div>
            <div className="block min-w-fit">
                <DeliveryCardRowShort />
            </div>
            <div className="block min-w-fit">
                <DeliveryCardRowShort />
            </div>
        </div>
    );
};
