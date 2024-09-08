import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Input, Spacer } from '@nextui-org/react';

import React, { PropsWithChildren, Suspense } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useUnit } from 'effector-react';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { SearchResultsList } from '@/widgets/search/searchResults/ui';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';

const SearchPopup = React.lazy(() =>
    import('@/widgets/search/searchQueryPopup').then((module) => ({
        default: module.widgetSearchQueryPopupUi.SearchQueryInputModal,
    })),
);

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-4 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/**
 * Components
 */
const Header: FunctionComponent<{
    isDisabled?: boolean;
}> = ({ isDisabled }) => {
    const { query, triggerOpenSearchPopup } = useUnit({
        query: widgetSearchResultsModel.$searchQuery,
        triggerOpenSearchPopup:
            widgetSearchQueryPopupModel.searchTriggerClicked,
    });

    const onClickInput = (): void => {
        if (isDisabled) return;
        triggerOpenSearchPopup();
    };

    return (
        <div
            className="relative flex w-full cursor-pointer items-center justify-between bg-background p-4"
            onClick={onClickInput}
        >
            <div className="absolute inset-0 z-50 w-full" />
            <Input
                value={query}
                className="mx-auto max-w-3xl"
                variant="bordered"
                color="primary"
                type="text"
                size="lg"
                classNames={{
                    inputWrapper:
                        'border-primary data-[hover=true]:border-primary',
                }}
                startContent={
                    <IoSearchSharp className="text-xl" onClick={onClickInput} />
                }
                fullWidth
                isDisabled={isDisabled}
                isReadOnly
            />
        </div>
    );
};

/**
 * View
 */
export const MobileSearchPageView: FunctionComponent = () => {
    const isOnline = useUnit(DetectNetworkConnectionState.model.$$isOnline);
    return (
        <>
            <Header isDisabled={!isOnline} />
            <Content>
                <Spacer y={4} />
                <SearchResultsList />
                <Spacer y={4} />
                <NavbarMobile />
                <Spacer y={20} />
            </Content>
            <Suspense>
                <SearchPopup size="full" placement="auto" />
            </Suspense>
        </>
    );
};
