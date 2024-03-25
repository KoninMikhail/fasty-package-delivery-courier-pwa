import { useSearchParams } from 'react-router-dom';
import { useGate, useUnit } from 'effector-react';
import {
    SearchPageGateway,
    setQueryEvent,
} from '@/pages/search/searchPage/model';
import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Button, Divider, Input, Spacer } from '@nextui-org/react';
import { widgetSearchResultsUi } from '@/widgets/search/searchResults';
import { PropsWithChildren, useEffect, useState } from 'react';
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

const SearchField: FunctionComponent = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    const [value, setValue] = useState<string>('');

    const buttonVisible = value && value.length > 0;

    const query = searchParameters.get('q') || '';

    useEffect(() => {
        setSearchParameters({ q: value });
    }, [value]);

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
 * Components
 */
const Header: FunctionComponent = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    const [value, setValue] = useState<string>('');
    const setQuery = useUnit(setQueryEvent);
    const query = searchParameters.get('q') || '';

    const onSearch = () => {
        setSearchParameters({ q: value });
        setQuery({ query: value });
    };

    return (
        <div className="flex items-center justify-between p-2">
            <Input
                value={value}
                variant="flat"
                type="search"
                placeholder={query}
                onValueChange={(v) => setValue(v)}
                labelPlacement="outside"
                classNames={{
                    inputWrapper: 'w-full h-12 pr-1',
                }}
                endContent={
                    <Button
                        color="secondary"
                        className="ml-2"
                        onPress={onSearch}
                    >
                        поиск
                    </Button>
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
                <Spacer y={2} />
                <Divider />
                <Spacer y={2} />
                <SearchResultsMobile />
                <Spacer y={4} />
                <NavbarMobile />
            </Content>
        </>
    );
};
