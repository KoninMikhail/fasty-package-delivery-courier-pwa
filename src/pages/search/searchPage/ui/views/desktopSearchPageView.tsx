import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import React, { PropsWithChildren, Suspense, useRef } from 'react';
import { useUnit } from 'effector-react';
import { sharedLibTypeGuards } from '@/shared/lib';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { SearchQueryInputModal } from '@/widgets/search/searchQueryPopup/ui';
import { Input } from '@nextui-org/react';
import { IoSearchSharp } from 'react-icons/io5';
import {SearchDeliveriesByQueryResults} from "@/widgets/deliveries/searchDeliveries/ui/SearchDeliveriesByQueryResults";
import {widgetSearchDeliveriesModel} from "@/widgets/deliveries/searchDeliveries";

const { isEmpty } = sharedLibTypeGuards;


const { Navbar } = widgetNavbarDesktopUi;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto w-[1400px] gap-8 pr-6">{children}</div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative overflow-hidden">{children}</main>
);

const Toolbar: FunctionComponent = () => {
    const reference = useRef<HTMLInputElement>(null);
    const { query, onClickInput } = useUnit({
        onClickInput: widgetSearchQueryPopupModel.searchTriggerClicked,
        query: widgetSearchDeliveriesModel.$currentQuery,
    });

    const onClickSearchInput = (): void => {
        reference?.current?.blur();
        onClickInput();
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
    return (
        <Root>
            <Navbar />
            <Toolbar />
            <MainContainer>
               <SearchDeliveriesByQueryResults fullWidth/>
            </MainContainer>
        </Root>
    );
};
