import { useSearchParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import { SearchPageGateway } from '@/pages/search/searchPage/model';
import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Button, Divider, Input, Spacer } from '@nextui-org/react';
import { widgetSearchResultsUi } from '@/widgets/search/searchResults';
import { PropsWithChildren, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
    const [query, setQuery] = useSearchParams();
    const [value, setValue] = useState<string>('');

    const buttonVisible = value && value.length > 0;

    return (
        <div className="flex items-center justify-between">
            <Input
                value={value}
                variant="flat"
                placeholder={query}
                onValueChange={(v) => setValue(v)}
                labelPlacement="outside"
                endContent={
                    <AnimatePresence>
                        {buttonVisible ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                exit={{ opacity: 0 }}
                            >
                                <Button color="secondary">поиск</Button>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                }
                fullWidth
            />
        </div>
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
