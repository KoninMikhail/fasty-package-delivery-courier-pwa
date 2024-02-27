import { useSearchParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import { SearchPageGateway } from '@/pages/search/searchPage/model';
import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Divider, Spacer } from '@nextui-org/react';
import { widgetSearchResultsUi } from '@/widgets/search/searchResults';
import { PropsWithChildren } from 'react';

const { SearchResultsMobile } = widgetSearchResultsUi;

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/**
 * Components
 */
const SearchHeader: FunctionComponent<{
    query?: string;
}> = ({ query }) => {
    return (
        <div>
            <h1 className="text-xl font-light">
                <span className="block font-bold">
                    Резултаты поиска по запросу:
                </span>{' '}
                {query}
            </h1>
        </div>
    );
};
const Header: FunctionComponent = () => {
    return (
        <div className="flex items-center justify-between">Форма поиска</div>
    );
};
/**
 * View
 */
export const MobileSearchPageView: FunctionComponent = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();

    const query = searchParameters.get('q') || '';

    useGate(SearchPageGateway, {
        query,
    });

    return (
        <>
            <Header />
            <Content>
                <SearchHeader query={query} />
                <Spacer y={4} />
                <Divider />
                <Spacer y={4} />
                <SearchResultsMobile />
                <Spacer y={4} />
                <NavbarMobile />
            </Content>
        </>
    );
};
