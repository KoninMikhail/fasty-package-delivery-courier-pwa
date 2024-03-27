import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Input, Skeleton, Spacer } from '@nextui-org/react';

import React, {
    PropsWithChildren,
    ReactElement,
    Suspense,
    useRef,
} from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { DeliverySearchResultCard } from '@/entities/delivery/ui/DeliverySearchResultCard/DeliverySearchResultCard';
import { RiWifiOffLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md';
import { Delivery } from '@/shared/api';
import { PageState, SearchPageState } from '@/pages/search/searchPage/types';

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
    query: string;
    isDisabled?: boolean;
    onPressInput: () => void;
}> = ({ query, onPressInput, isDisabled }) => {
    const inputReference = useRef<HTMLInputElement>(null);
    const isQueryEmpty = query === '';

    const onClickInput = (): void => {
        inputReference?.current?.blur();
        onPressInput();
    };

    return (
        <div className="flex items-center justify-between p-4">
            <Input
                ref={inputReference}
                value={query}
                variant="bordered"
                color="primary"
                type="text"
                size="lg"
                startContent={<IoSearchSharp className="text-xl" />}
                endContent={!isQueryEmpty && <IoMdClose className="text-xl" />}
                fullWidth
                onClick={onClickInput}
                isDisabled={isDisabled}
            />
        </div>
    );
};

const Offline: FunctionComponent = () => {
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
            <p>Не задан поисковый запрос</p>
        </div>
    );
};

const NotFound: FunctionComponent = () => {
    return (
        <div className="mx-auto flex h-[60vh] w-3/4 flex-col items-center justify-center gap-4 text-center text-content3">
            <MdOutlineSentimentDissatisfied className="text-6xl" />
            <p>Извините, ничего не найдено</p>
        </div>
    );
};

/**
 * View
 */
export const MobileSearchPageView: FunctionComponent<{
    online: boolean;
    query: string;
    pageState: SearchPageState;
    results: Delivery[];
    onPressInput: () => void;
}> = ({ query, pageState, results, onPressInput, online }) => {
    if (!online) {
        return (
            <>
                <Header query={query} onPressInput={onPressInput} isDisabled />
                <Content>
                    <Spacer y={2} />
                    <Offline />
                    <Spacer y={4} />
                    <NavbarMobile />
                </Content>
            </>
        );
    }

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
                return results.map((result) => (
                    <DeliverySearchResultCard
                        key={result.id}
                        delivery={result}
                        query={query}
                    />
                ));
            }
        }
    };

    return (
        <>
            <Header query={query} onPressInput={onPressInput} />
            <Content>
                <Spacer y={2} />
                <div className="flex flex-col gap-4">{renderState()}</div>
                <Spacer y={4} />
                <NavbarMobile />
            </Content>
            <Suspense>
                <SearchPopup />
            </Suspense>
        </>
    );
};
