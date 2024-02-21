import { DeliveryCountdownCard } from '@/entities/delivery/ui';
import { useList } from 'effector-react';
import { $searchResults } from '@/widgets/search/searchResults/model/model';
import { useNetworkInfo } from '@/shared/config/network';
import { CheckboxGroup, Spacer } from '@nextui-org/react';
import { ChipCheckBox } from '@/shared/ui/components';
import { HorizontalScroll } from '@/shared/ui/layouts';

const OfflineMessage = () => {
    return (
        <div>
            <h1>Offline</h1>
        </div>
    );
};

const LoadingMessage = () => {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};

export const SearchResultsMobile: FunctionComponent = () => {
    const {} = useNetworkInfo();
    const searchResults = useList($searchResults, (item) => {
        return <DeliveryCountdownCard />;
    });

    return (
        <div>
            <HorizontalScroll>
                <CheckboxGroup
                    className="flex-nowrap justify-start"
                    orientation="horizontal"
                    color="secondary"
                    defaultValue={['buenos-aires', 'san-francisco']}
                >
                    <ChipCheckBox value="buenos-aires">
                        Buenos Aires
                    </ChipCheckBox>
                    <ChipCheckBox value="sydney">Sydney</ChipCheckBox>
                    <ChipCheckBox value="san-francisco">
                        San Francisco
                    </ChipCheckBox>
                    <ChipCheckBox value="london">London</ChipCheckBox>
                    <ChipCheckBox value="tokyo">Tokyo</ChipCheckBox>
                </CheckboxGroup>
            </HorizontalScroll>

            <Spacer y={4} />
            <div className="flex flex-col gap-4">{searchResults}</div>
        </div>
    );
};
