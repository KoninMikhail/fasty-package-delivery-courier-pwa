import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Input, Skeleton, Spacer } from '@nextui-org/react';

import React, {
    PropsWithChildren,
    ReactElement,
    Suspense,
    useRef,
} from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { RiWifiOffLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md';
import { PageState } from '@/pages/search/searchPage/types';
import { useList, useUnit } from 'effector-react';
import { Offline, Online } from '@/entities/viewer';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { SearchResultsText } from '@/pages/search/searchPage/ui/common/locale/SearchResultsText';
import {
    $finalSearchState,
    $searchQuery,
    $searchResults,
} from '@/pages/search/searchPage/model';
import { SearchNotFoundText } from '@/pages/search/searchPage/ui/common/locale/SearchNotFoundText';
import { SearchEmptyQueryText } from '../common/locale/SearchEmptyQueryText';

const SearchPopup = React.lazy(() =>
    import('@/widgets/search/searchQueryPopup').then((module) => ({
        default: module.widgetSearchQueryPopupUi.SearchQueryInputModal,
    })),
);

const DeliverySearchResultCard = React.lazy(() =>
    import('@/entities/delivery').then((module) => ({
        default: module.DeliverySearchResultCard,
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
    const query = useUnit($searchQuery);
    const makeSearchPopupOpened = useUnit(
        widgetSearchQueryPopupModel.modal.clickTriggerElement,
    );

    const onClickInput = (): void => {
        inputReference?.current?.blur();
        makeSearchPopupOpened();
    };

    return (
        <div className="flex w-full items-center justify-between bg-background p-4">
            <Input
                ref={inputReference}
                value={query}
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

const OfflineMessage: FunctionComponent = () => {
    return (
        <div className="block p-4 py-16">
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 pb-24">
                <RiWifiOffLine className="text-8xl text-content3" />
                <div className="text-content3">No internet connection</div>
            </div>
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

const EmptyQuery: FunctionComponent = () => {
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

const SearchResults: FunctionComponent = () => {
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
            {results}
        </>
    );
};

/**
 * View
 */
export const MobileSearchPageView: FunctionComponent = () => {
    const pageState = useUnit($finalSearchState);

    const renderState = (): ReactElement | ReactElement[] => {
        switch (pageState) {
            case PageState.EmptyQuery: {
                return <EmptyQuery />;
            }
            case PageState.NotFound: {
                return <NotFound />;
            }
            case PageState.Loading: {
                return <LoadingMessage />;
            }
            default: {
                return <SearchResults />;
            }
        }
    };

    return (
        <>
            <Offline>
                <Header isDisabled />
                <Content>
                    <Spacer y={2} />
                    <OfflineMessage />
                    <Spacer y={4} />
                    <NavbarMobile />
                </Content>
            </Offline>
            <Online>
                <Header />
                <Content>
                    <Spacer y={2} />
                    <div className="flex h-full flex-col gap-4">
                        {renderState()}
                        <Spacer y={16} />
                    </div>
                    <Spacer y={4} />
                    <NavbarMobile />
                </Content>
                <Suspense>
                    <SearchPopup size="full" placement="auto" />
                </Suspense>
            </Online>
        </>
    );
};
