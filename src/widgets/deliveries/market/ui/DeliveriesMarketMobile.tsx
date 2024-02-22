import type { PropsWithChildren } from 'react';
import { deliveryUi } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { sharedConfigRoutes } from '@/shared/config';
import { Offline } from '@/entities/viewer/ui';
import { useNetworkInfo } from '@/shared/config/network';
import { ChipCheckBox } from '@/shared/ui/components';
import { HorizontalScroll } from '@/shared/ui/layouts';
import { CheckboxProps } from '@nextui-org/react';
import { $avaliableDeliveries, $isDeliveriesLoading } from '../model';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const { DeliveryShortInfoCard } = deliveryUi;

/* eslint-disable unicorn/consistent-function-scoping */

/**
 * Constants
 */

const FILTER_CHECKBOXES_SIZE: CheckboxProps['size'] = 'lg';

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex w-full flex-col gap-6">{children}</div>
);

/**
 * Components
 */
const Filter: FunctionComponent = () => {
    const filters = {
        buenosAires: () => console.log('buenos-aires'),
        sydney: () => console.log('sydney'),
        sanFrancisco: () => console.log('san-francisco'),
        london: () => console.log('london'),
        tokyo: () => console.log('tokyo'),
    };

    return (
        <HorizontalScroll>
            <div className="flex flex-nowrap gap-2">
                {Object.keys(filters).map((filter) => (
                    <ChipCheckBox
                        size={FILTER_CHECKBOXES_SIZE}
                        value={filter}
                        key={filter}
                        onChange={filters[filter]}
                    >
                        {filter}
                    </ChipCheckBox>
                ))}
            </div>
        </HorizontalScroll>
    );
};

/**
 * @name DeliveriesMarketMobile
 * @description widget for display available deliveries
 * @constructor
 */
export const DeliveriesMarketMobile: FunctionComponent = () => {
    const { online, effectiveType } = useNetworkInfo();
    const isPending = useUnit($isDeliveriesLoading);
    const content = useList($avaliableDeliveries, (delivery) => {
        return <DeliveryShortInfoCard delivery={delivery} />;
    });

    if (isPending) {
        return <Offline>you are offline</Offline>;
    }

    return (
        <Root>
            <Filter />
            <div className="grid grid-cols-2 gap-4">{content}</div>
        </Root>
    );
};
