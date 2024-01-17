import { DeliveryCardRowShort } from '@/entities/delivery/ui';

export const InProgressDeliveriesSlider: FunctionComponent = () => {
    return (
        <div className="flex gap-4">
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
