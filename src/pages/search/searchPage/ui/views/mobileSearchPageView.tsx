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
import { Delivery } from '@/shared/api';
import { PageState, SearchPageState } from '@/pages/search/searchPage/types';

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
    onPressClear?: () => void;
}> = ({ query, pageState, results, onPressInput, online, onPressClear }) => {
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
                return (
                    <>
                        <div className="font-medium">Найденные результаты</div>
                        {results.map((result) => (
                            <DeliverySearchResultCard
                                key={result.id}
                                delivery={result}
                                query={query}
                            />
                        ))}
                    </>
                );
            }
        }
    };

    return (
        <>
            <Header query={query} onPressInput={onPressInput} />
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
        </>
    );
};
