import { entityDeliveryUi } from '@/entities/delivery';

const { DeliveryCardRowShort } = entityDeliveryUi;

export const InProgressDeliveriesList: FunctionComponent = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
        </div>
    );
};
