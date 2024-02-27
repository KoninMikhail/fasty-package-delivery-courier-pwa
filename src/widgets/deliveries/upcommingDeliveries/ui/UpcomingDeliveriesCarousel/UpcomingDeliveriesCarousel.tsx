import { DeliveryShortInfoCard } from '@/entities/delivery/ui';

export const UpcomingDeliveriesCarousel: FunctionComponent = () => {
    return (
        <div className="flex gap-4">
            <div className="block min-w-fit">
                <DeliveryShortInfoCard />
            </div>
            <div className="block min-w-fit">
                <DeliveryShortInfoCard />
            </div>
            <div className="block min-w-fit">
                <DeliveryShortInfoCard />
            </div>
            <div className="block min-w-fit">
                <DeliveryShortInfoCard />
            </div>
            <div className="block min-w-fit">
                <DeliveryShortInfoCard />
            </div>
            <div className="block min-w-fit">
                <DeliveryShortInfoCard />
            </div>
        </div>
    );
};
