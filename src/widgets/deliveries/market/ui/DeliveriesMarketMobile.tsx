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
    <div className="flex flex-col gap-6">{children}</div>
);

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
            <div>
                <HorizontalScroll>
                    <div className="flex flex-nowrap gap-2">
                        <ChipCheckBox
                            size={FILTER_CHECKBOXES_SIZE}
                            value="buenos-aires"
                        >
                            Buenos Aires
                        </ChipCheckBox>
                        <ChipCheckBox
                            size={FILTER_CHECKBOXES_SIZE}
                            value="sydney"
                        >
                            Sydney
                        </ChipCheckBox>
                        <ChipCheckBox
                            size={FILTER_CHECKBOXES_SIZE}
                            value="san-francisco"
                        >
                            San Francisco
                        </ChipCheckBox>
                        <ChipCheckBox
                            size={FILTER_CHECKBOXES_SIZE}
                            value="london"
                        >
                            London
                        </ChipCheckBox>
                        <ChipCheckBox
                            size={FILTER_CHECKBOXES_SIZE}
                            value="tokyo"
                        >
                            Tokyo
                        </ChipCheckBox>
                    </div>
                </HorizontalScroll>
            </div>
            <div className="flex flex-col gap-4">{content}</div>
        </Root>
    );
};
