import {
    Button,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalProps,
} from '@nextui-org/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useList, useUnit } from 'effector-react';
import { sharedConfigRoutes } from '@/shared/config';
import {
    forwardRef,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { translationNS } from '@/widgets/search/searchQueryPopup/config';

import { FaArrowLeft, FaClockRotateLeft } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useKeyPress } from '@/shared/lib/browser';
import { useUnmount } from 'usehooks-ts';
import { modal as modalModel, history as searchHistoryModel } from '../model';

const { RouteName } = sharedConfigRoutes;
const { SEARCH_PAGE } = RouteName;

/**
 * Layout
 */

const Head: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="flex items-center">{children}</div>;
};

/**
 * Components
 */

const DEFAULT_ITEMS_LIMIT = 6;

interface RelatedQueriesProperties {
    limit?: number;
    onPressItem?: (query: string) => void;
    onPressDeleteItem?: (query: string) => void;
}

export const RelatedQueries: FunctionComponent<RelatedQueriesProperties> = ({
    limit = DEFAULT_ITEMS_LIMIT,
    onPressItem,
    onPressDeleteItem,
}) => {
    const items = useList(
        searchHistoryModel.$$currentUserQueryHistory,
        (item, index) => {
            if (index >= limit) return null;

            const onPressItemElement = (): void => {
                if (onPressItem) {
                    onPressItem(item.query);
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
    return <div className="flex flex-col items-center gap-2">{items}</div>;
};

interface SetQueryFieldProperties {
    onPressSearch: (query: string) => void;
    onPressClose?: () => void;
}

export const SetQueryField = forwardRef<
    HTMLInputElement,
    SetQueryFieldProperties
>(({ onPressSearch, onPressClose }, reference) => {
    const { t } = useTranslation(translationNS);
    const [value, setValue] = useState<string>();
    const [searchParameters] = useSearchParams();

    const onChangeValue = (query: string): void => {
        setValue(query);
    };

    const onPressSearchButton = (): void => {
        if (value) {
            onPressSearch(value);
        }
    };

    useKeyPress(['Enter'], onPressSearchButton);
    useEffect(() => {
        const query = searchParameters.get('q') || '';
        setValue(query);
    }, [searchParameters]);

    return (
        <div className="flex flex-grow items-center gap-2">
            <Button
                isIconOnly
                className="text-xl"
                variant="flat"
                onPress={onPressClose}
            >
                <FaArrowLeft />
            </Button>
            <Input
                ref={reference}
                type="search"
                autoFocus
                value={value}
                className="pr-0"
                classNames={{
                    inputWrapper: 'after:hidden border-none pb-0',
                    innerWrapper: 'pb-0',
                    clearButton: 'text-xl',
                }}
                onValueChange={onChangeValue}
                labelPlacement="outside"
                fullWidth
            />
            <Button color="primary" onPress={onPressSearchButton}>
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

    const [isOpen, onClickCloseButton, onStartSearchCloseModal] = useUnit([
        modalModel.$isOpened,
        modalModel.clickCloseArrow,
        modalModel.startSearch,
    ]);
    const [addToHistory, removeFromHistory] = useUnit([
        searchHistoryModel.addQueryToHistory,
        searchHistoryModel.removeQueryFromHistory,
    ]);

    const onSearch = (query: string): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();

        if (query) {
            addToHistory(query);
            navigate(`${SEARCH_PAGE}?${queryParameters}`);
            onStartSearchCloseModal();
        } else {
            navigate(`${SEARCH_PAGE}`);
            onStartSearchCloseModal();
        }
    };

    const onPressDeleteHistoryItem = (query: string): void => {
        removeFromHistory(query);
    };

    useUnmount(() => {
        onStartSearchCloseModal();
    });

    return (
        <Modal
            size={size}
            placement={placement}
            isOpen={isOpen}
            hideCloseButton
            onClose={onClickCloseButton}
            classNames={{
                backdrop:
                    'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 p-2 pt-4">
                    <Head>
                        <SetQueryField
                            ref={reference}
                            onPressSearch={onSearch}
                            onPressClose={onClickCloseButton}
                        />
                    </Head>
                </ModalHeader>
                <ModalBody className="!px-2">
                    <Divider />
                    <h2 className="py-2">История запросов</h2>
                    <RelatedQueries
                        onPressItem={onSearch}
                        onPressDeleteItem={onPressDeleteHistoryItem}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
