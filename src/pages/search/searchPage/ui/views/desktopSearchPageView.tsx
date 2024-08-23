import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { PropsWithChildren, useRef } from 'react';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { SearchQueryInputModal } from '@/widgets/search/searchQueryPopup/ui';
import { Input } from '@nextui-org/react';
import { IoSearchSharp } from 'react-icons/io5';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { SearchResultsList } from '@/widgets/search/searchResults/ui';

const { Navbar } = widgetNavbarDesktopUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8 pr-6">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative overflow-hidden">{children}</main>
);

const Toolbar: FunctionComponent = () => {
    const reference = useRef<HTMLInputElement>(null);
    const { openSearchModal, user, query } = useUnit({
        query: widgetSearchResultsModel.$searchQuery,
        openSearchModal: widgetSearchQueryPopupModel.searchTriggerClicked,
        user: sessionModel.$viewerProfileData,
    });

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
                        className="w-2/3"
                        type="search"
                        onClick={onClickSearchInput}
                        startContent={<IoSearchSharp className="text-xl" />}
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
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar />
                <SearchResultsList fullWidth />
            </MainContainer>
        </Layout>
    );
};
