import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Input, Spacer } from '@nextui-org/react';

import React, { PropsWithChildren, Suspense, useRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useUnit } from 'effector-react';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { SearchResultsList } from '@/widgets/search/searchResults/ui';

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
    const inputReference = useRef<HTMLInputElement>(null);

    const { query, triggerOpenSearchPopup } = useUnit({
        query: widgetSearchResultsModel.$searchQuery,
        triggerOpenSearchPopup:
            widgetSearchQueryPopupModel.searchTriggerClicked,
    });

    const onClickInput = (): void => {
        inputReference?.current?.blur();
        triggerOpenSearchPopup();
    };

    return (
        <div className="flex w-full items-center justify-between bg-background p-4">
            <Input
                ref={inputReference}
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
                onClick={onClickInput}
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
    return (
        <>
            <Header />
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
