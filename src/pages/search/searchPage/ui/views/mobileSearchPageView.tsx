import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { Input, Spacer } from '@nextui-org/react';
import { widgetSearchResultsUi } from '@/widgets/search/searchResults';
import { widgetSearchQueryPopupUi } from '@/widgets/search/searchQueryPopup';
import { PropsWithChildren, useRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { searchInputPressed } from '@/pages/search/searchPage/model';
import { useUnit } from 'effector-react';

const { SearchResultsMobile } = widgetSearchResultsUi;
const { SearchQueryInputModal } = widgetSearchQueryPopupUi;

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
    onPressInput: () => void;
}> = ({ query, onPressInput }) => {
    const inputReference = useRef<HTMLInputElement>(null);
    const isQueryEmpty = query === '';

    const onClickInput = (): void => {
        inputReference?.current?.blur();
        onPressInput();
    };

    return (
        <div className="flex items-center justify-between p-4">
            <Input
                ref={inputReference}
                value={query}
                variant="bordered"
                color="primary"
                type="text"
                size="lg"
                startContent={<IoSearchSharp className="text-xl" />}
                endContent={!isQueryEmpty && <IoMdClose className="text-xl" />}
                fullWidth
                onClick={onClickInput}
            />
        </div>
    );
};
/**
 * View
 */
export const MobileSearchPageView: FunctionComponent<{
    query: string;
}> = ({ query }) => {
    const inputPressed = useUnit(searchInputPressed);

    const onPressInput = (): void => {
        inputPressed();
    };

    return (
        <>
            <Header query={query} onPressInput={onPressInput} />
            <Content>
                <Spacer y={2} />
                <SearchResultsMobile />
                <Spacer y={4} />
                <NavbarMobile />
            </Content>
            <SearchQueryInputModal />
        </>
    );
};
