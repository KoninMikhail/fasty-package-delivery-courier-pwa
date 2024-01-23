import { DeliveryCardRowShort } from '@/entities/delivery/ui';

export const InProgressDeliveriesSlider: FunctionComponent = () => {
    const items = [1, 2, 3, 4, 5, 6];
    return (
        <div className="flex flex-nowrap justify-start gap-4 py-2">
            {items.map((item) => (
                <div className="block w-72" key={item}>
                    <DeliveryCardRowShort />
                </div>
            ))}
        </div>
    );
};
