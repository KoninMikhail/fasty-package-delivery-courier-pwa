import { PropsWithChildren } from 'react';
import { HorizontalScroll } from '@/shared/ui/layouts';
import { Chip } from '@nextui-org/react';
import { sharedUiComponents } from '@/shared/ui';

const { HorizontalDatePicker } = sharedUiComponents;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative grid grid-cols-1 gap-2">{children}</div>
);

/**
 * @name MarketDeliveriesFilter
 * @constructor
 */
export const MarketDeliveriesFilter: FunctionComponent = () => {
    const onChangeDate = (): void => {
        alert('work');
    };

    return (
        <Root>
            <HorizontalScroll>
                <HorizontalDatePicker />
            </HorizontalScroll>
            <HorizontalScroll>
                <div className="flex gap-2 px-4">
                    <Chip color="default" size="lg">
                        Default
                    </Chip>
                    <Chip color="primary" size="lg">
                        Primary
                    </Chip>
                    <Chip color="secondary" size="lg">
                        Secondary
                    </Chip>
                    <Chip color="success" size="lg">
                        Success
                    </Chip>
                    <Chip color="warning" size="lg">
                        Warning
                    </Chip>
                    <Chip color="danger" size="lg">
                        Danger
                    </Chip>
                </div>
            </HorizontalScroll>
        </Root>
    );
};
