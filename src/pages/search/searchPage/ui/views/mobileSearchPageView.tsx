import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Input, Skeleton, Spacer } from '@nextui-org/react';

import React, { PropsWithChildren, Suspense, useRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md';
import { useUnit } from 'effector-react';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { SearchNotFoundText } from '@/pages/search/searchPage/ui/common/locale/SearchNotFoundText';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { SearchResultsList } from '@/widgets/search/searchResults/ui';
import { SearchEmptyQueryText } from '../common/locale/SearchEmptyQueryText';

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

const LoadingMessage: FunctionComponent = () => {
    return (
        <div className="flex w-full flex-col gap-4">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl" />
        </div>
    );
};

export const EmptyQuery: FunctionComponent = () => {
    return (
        <div className="mx-auto flex h-[60vh] w-3/4 flex-col items-center justify-center gap-4 text-center text-content3">
            <FiSearch className="text-6xl" />
            <SearchEmptyQueryText />
        </div>
    );
};

const NotFound: FunctionComponent = () => {
    return (
        <div className="mx-auto flex h-[60vh] w-3/4 flex-col items-center justify-center gap-4 text-center text-content3">
            <MdOutlineSentimentDissatisfied className="text-6xl" />
            <SearchNotFoundText />
        </div>
    );
};

/* const SearchResults: FunctionComponent = () => {
    const query = useUnit($searchQuery);
    const results = useList($searchResults, (result) => (
        <DeliverySearchResultCard
            key={result.id}
            delivery={result}
            query={query}
        />
    ));
    return (
        <>
            <div className="font-medium">
                <SearchResultsText />
            </div>
            <Spacer y={4} />
            <div className="flex flex-col gap-4">{results}</div>
        </>
    );
}; */

/**
 * View
 */
export const MobileSearchPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Content>
                <Spacer y={2} />
                <SearchResultsList />
                <Spacer y={4} />
                <NavbarMobile />
            </Content>
            <Suspense>
                <SearchPopup size="full" placement="auto" />
            </Suspense>
        </>
    );
};
