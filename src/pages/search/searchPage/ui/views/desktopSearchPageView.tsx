import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { PropsWithChildren, useRef } from 'react';
import { useUnit } from 'effector-react';
import { $searchQuery } from '@/pages/search/searchPage/model';
import { isEmpty } from '@/shared/lib/helpers';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { SearchQueryInputModal } from '@/widgets/search/searchQueryPopup/ui';
import { Input } from '@nextui-org/react';
import { IoSearchSharp } from 'react-icons/io5';
import { EmptyQuery, SearchResults } from './mobileSearchPageView';

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
    const user = useUnit(sessionModel.$viewerProfileData);
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
    const query = useUnit($searchQuery);

    if (isEmpty(query)) {
        return (
            <Layout>
                <Navbar />
                <MainContainer>
                    <Toolbar onSelectTab={() => {}} />
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <EmptyQuery />
                    </div>
                </MainContainer>
            </Layout>
        );
    }

    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar onSelectTab={() => {}} />
                <SearchResults />
            </MainContainer>
        </Layout>
    );
};
