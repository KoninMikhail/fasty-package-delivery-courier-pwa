import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import type { PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { $searchQuery } from '@/pages/search/searchPage/model';
import { isEmpty } from '@/shared/lib/helpers';
import { useTranslation } from 'react-i18next';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { setQuery } from '@/widgets/search/searchQueryPopup/model/base';
import { widgetSearchQueryPopupUi } from '@/widgets/search/searchQueryPopup';
import { translationNS } from '../../config';
import { EmptyQuery, SearchResults } from './mobileSearchPageView';

const { SearchQueryInputWithPopover } = widgetSearchQueryPopupUi;

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
    const { t } = useTranslation(translationNS);
    const user = useUnit(sessionModel.$viewerProfileData);

    const onChangeQuery = useUnit(setQuery);

    return (
        <div className="flex h-20 items-center justify-between">
            <div className="flex flex-grow gap-2">
                <SearchQueryInputWithPopover />
            </div>
            <div>
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </div>
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
