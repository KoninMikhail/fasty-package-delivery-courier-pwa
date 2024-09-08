import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { PropsWithChildren, useRef } from 'react';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { SearchQueryInputModal } from '@/widgets/search/searchQueryPopup/ui';
import { Input, Spacer } from '@nextui-org/react';
import { IoSearchSharp } from 'react-icons/io5';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { SearchResultsList } from '@/widgets/search/searchResults/ui';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';

// eslint-disable jsx-a11y/no-static-element-interactions

const { Navbar } = widgetNavbarDesktopUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-4 overflow-hidden">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative overflow-y-auto px-3 pt-16">{children}</main>
);

const Toolbar: FunctionComponent<{
    isDisabledSearch?: boolean;
}> = ({ isDisabledSearch }) => {
    const reference = useRef<HTMLInputElement>(null);

    const { openSearchModal, user, query } = useUnit({
        query: widgetSearchResultsModel.$searchQuery,
        openSearchModal: widgetSearchQueryPopupModel.searchTriggerClicked,
        user: sessionModel.$viewerProfileData,
    });

    const onClickSearchInput = (): void => {
        if (isDisabledSearch) return;
        openSearchModal();
    };
    return (
        <>
            <div className="absolute left-80 right-0 top-0 z-50 -ml-5 flex h-20 items-center justify-between bg-gradient-to-b from-background from-65% to-transparent pl-5 pr-12">
                <div className=" relative flex flex-grow cursor-pointer gap-2">
                    <div
                        className="absolute inset-0 z-50 w-full"
                        onClick={onClickSearchInput}
                    />
                    <Input
                        ref={reference}
                        size="lg"
                        value={query}
                        className="w-2/3"
                        type="search"
                        startContent={<IoSearchSharp className="text-xl" />}
                        isDisabled={isDisabledSearch}
                    />
                </div>
                <div>
                    <UserCardRow user={user} avatarPosition="right" />
                </div>
            </div>
            <SearchQueryInputModal backdrop="blur" size="2xl" />
        </>
    );
};

export const DesktopSearchPageView: FunctionComponent = () => {
    const isOnline = useUnit(DetectNetworkConnectionState.model.$$isOnline);
    return (
        <Layout>
            <Navbar />
            <Toolbar isDisabledSearch={!isOnline} />
            <MainContainer>
                <Spacer y={4} />
                <SearchResultsList fullWidth />
            </MainContainer>
        </Layout>
    );
};
