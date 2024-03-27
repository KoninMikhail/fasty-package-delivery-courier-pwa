import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalProps,
} from '@nextui-org/react';
import { useList, useUnit } from 'effector-react';
import { sharedConfigRoutes } from '@/shared/config';
import { forwardRef, PropsWithChildren, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { translationNS } from '@/widgets/search/searchQueryPopup/config';
import { useNavigate } from 'react-router-dom';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { $query, setQuery } from '@/widgets/search/searchQueryPopup/model/base';
import { modal as modalModel, history as searchHistoryModel } from '../model';

const { RouteName } = sharedConfigRoutes;
const { SEARCH_PAGE } = RouteName;

/**
 * Layout
 */

const Head: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="flex">{children}</div>;
};

/**
 * Components
 */

const DEFAULT_ITEMS_LIMIT = 10;

interface RelatedQueriesProperties {
    limit?: number;
    onPressItem?: () => void;
    onPressDeleteItem?: (query: string) => void;
}

export const RelatedQueries: FunctionComponent<RelatedQueriesProperties> = ({
    limit = DEFAULT_ITEMS_LIMIT,
    onPressItem,
    onPressDeleteItem,
}) => {
    const setQueryValue = useUnit(setQuery);
    const items = useList(
        searchHistoryModel.$$currentUserQueryHistory,
        (item, index) => {
            if (index >= limit) return null;

            const onPressItemElement = (): void => {
                if (onPressItem) {
                    setQueryValue(item.query);
                    onPressItem();
                }
            };

            const onPressDeleteItemButton = (): void => {
                if (onPressDeleteItem) {
                    onPressDeleteItem(item.query);
                }
            };

            return (
                <div
                    className="grid w-full grid-cols-[max-content_auto_max-content] items-center gap-3"
                    onClick={onPressItemElement}
                >
                    <div className="relative">
                        <FaClockRotateLeft className="text-lg opacity-50" />
                    </div>
                    <div className="w-full" style={{ cursor: 'pointer' }}>
                        <div className="flex w-full items-center justify-between">
                            <p className="font-bold">
                                {item.query.toLowerCase()}
                            </p>
                        </div>
                    </div>
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={onPressDeleteItemButton}
                    >
                        <IoClose />
                    </Button>
                </div>
            );
        },
    );
    return <div className="flex flex-col items-center gap-4">{items}</div>;
};

interface SetQueryFieldProperties {
    onPressSearch: () => void;
}

export const SetQueryField = forwardRef<
    HTMLInputElement,
    SetQueryFieldProperties
>(({ onPressSearch }, reference) => {
    const { t } = useTranslation(translationNS);
    const [query, onChangeQuery] = useUnit([$query, setQuery]);

    return (
        <div className="flex flex-grow gap-2">
            <Input
                ref={reference}
                value={query}
                type="search"
                autoFocus
                className="pr-0"
                classNames={{
                    inputWrapper: 'after:hidden border-none pb-0',
                    clearButton: 'text-xl',
                }}
                onValueChange={onChangeQuery}
                variant="underlined"
                labelPlacement="outside"
                fullWidth
            />
            <Button color="primary" onPress={onPressSearch}>
                Поиск
            </Button>
        </div>
    );
});

/**
 * View
 */
interface SearchQueryInputModalProperties
    extends Pick<ModalProps, 'size' | 'placement'> {}

export const SearchQueryInputModal: FunctionComponent<
    SearchQueryInputModalProperties
> = ({ size = 'lg', placement = 'top' }) => {
    const reference = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const query = useUnit($query);

    const [isOpen, onClickClose, onSearchStart] = useUnit([
        modalModel.$isOpened,
        modalModel.clickCloseArrow,
        modalModel.clickSearchButton,
    ]);
    const [addToHistory, removeFromHistory] = useUnit([
        searchHistoryModel.addQueryToHistory,
        searchHistoryModel.removeQueryFromHistory,
    ]);

    const onSearch = (): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();
        addToHistory(query);
        onSearchStart();
        navigate(`${SEARCH_PAGE}?${queryParameters}`);
    };

    const onPressDeleteHistoryItem = (queryName: string): void => {
        removeFromHistory(queryName);
    };

    /* useKeyPress(['Enter'], () => onPressSearch()); */

    return (
        <Modal
            size={size}
            placement={placement}
            isOpen={isOpen}
            hideCloseButton
            onClose={onClickClose}
            classNames={{
                backdrop:
                    'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 p-2">
                            <Head>
                                <SetQueryField
                                    ref={reference}
                                    onPressSearch={onSearch}
                                />
                            </Head>
                        </ModalHeader>
                        <ModalBody>
                            <RelatedQueries
                                onPressItem={onSearch}
                                onPressDeleteItem={onPressDeleteHistoryItem}
                            />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
