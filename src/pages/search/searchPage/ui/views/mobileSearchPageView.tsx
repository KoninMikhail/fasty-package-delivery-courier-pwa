import { useSearchParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import { SearchPageGateway } from '@/pages/search/searchPage/model';
import { sharedUiComponents } from '@/shared/ui';
import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Button, Input } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

const { IdentifierField } = sharedUiComponents;

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/**
 * Components
 */
const SearchResults: FunctionComponent = () => {
    return (
        <div className="flex gap-2">
            <Input />
            <IdentifierField
                autoFocus
                variant="flat"
                placeholder="0"
                labelPlacement="outside"
                padLength={8}
            />
            <Button color="secondary">Найти</Button>
        </div>
    );
};

export const MobileSearchPageView: FunctionComponent = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();

    useGate(SearchPageGateway, {
        query: searchParameters.get('q'),
    });

    return (
        <Content>
            <IdentifierField
                value={searchParameters.get('q')}
                onValueChange={(v) => console.log(v)}
            />
            <Button>addRequest</Button>
            <SearchResults />
            <div>{searchParameters.get('q')}</div>
            <NavbarMobile />
        </Content>
    );
};
