import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import React, { PropsWithChildren, Suspense, useRef } from 'react';
import { useList, useUnit } from 'effector-react';
import { $searchQuery, $searchResults } from '@/pages/search/searchPage/model';
import { sharedLibTypeGuards } from '@/shared/lib';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { SearchQueryInputModal } from '@/widgets/search/searchQueryPopup/ui';
import { Input, Spacer, Spinner } from '@nextui-org/react';
import { IoSearchSharp } from 'react-icons/io5';
import { SearchResultsText } from '@/pages/search/searchPage/ui/common/locale/SearchResultsText';
import { EmptyQuery } from './mobileSearchPageView';

const { isEmpty } = sharedLibTypeGuards;
const DeliverySearchResultCardWide = React.lazy(() =>
    import('@/entities/delivery').then((module) => ({
        default: module.DeliverySearchResultCardWide,
    })),
);

const { Navbar } = widgetNavbarDesktopUi;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto w-[1400px] gap-8 pr-6">{children}</div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative overflow-hidden">{children}</main>
);

const SearchResults: FunctionComponent = () => {
    const query = useUnit($searchQuery);
    const results = useList($searchResults, (result) => (
        <DeliverySearchResultCardWide
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
};

const Toolbar: FunctionComponent = () => {
    const reference = useRef<HTMLInputElement>(null);
    const [openSearchModal, query] = useUnit([
        widgetSearchQueryPopupModel.modal.clickTriggerElement,
        widgetSearchQueryPopupModel.base.$query,
    ]);

    const onClickSearchInput = (): void => {
        reference?.current?.blur();
        openSearchModal();
    };
    return (
        <>
            <div className="flex h-20 items-center justify-between">
                <div className="flex flex-grow gap-2">
                    <Input
                        ref={reference}
                        size="lg"
                        value={query}
                        className="w-full p-8"
                        type="search"
                        onClick={onClickSearchInput}
                        startContent={<IoSearchSharp className="text-xl" />}
                    />
                </div>
            </div>
            <SearchQueryInputModal backdrop="blur" size="2xl" />
        </>
    );
};

export const DesktopSearchPageView: FunctionComponent = () => {
    const query = useUnit($searchQuery);

    if (isEmpty(query)) {
        return (
            <Root>
                <Navbar />
                <MainContainer>
                    <Toolbar onSelectTab={() => {}} />
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <EmptyQuery />
                    </div>
                </MainContainer>
            </Root>
        );
    }

    return (
        <Root>
            <Navbar />
            <MainContainer>
                <Suspense fallback={<Spinner />}>
                    <SearchResults />
                </Suspense>
            </MainContainer>
        </Root>
    );
};
