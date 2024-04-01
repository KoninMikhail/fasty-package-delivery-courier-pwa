import {
    Button,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader as NextUiModalHeader,
    ModalProps,
} from '@nextui-org/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useList, useUnit } from 'effector-react';
import { sharedConfigRoutes } from '@/shared/config';
import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FaArrowLeft, FaClockRotateLeft } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useKeyPress } from '@/shared/lib/browser';
import { useUnmount } from 'usehooks-ts';
import { ACTION_SEARCH, RELATED_QUERIES, translationNS } from '../config';
import {
    modal as modalModel,
    history as searchHistoryModel,
    base as baseModel,
} from '../model';

const { RouteName } = sharedConfigRoutes;
const { SEARCH_PAGE } = RouteName;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const ModalHeader: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <NextUiModalHeader
            className={
                'pt-4" grid grid-cols-[max-content_auto_max-content] gap-2 p-2'
            }
        >
            {children}
        </NextUiModalHeader>
    );
};

/**
 * Components
 */

const DEFAULT_ITEMS_LIMIT = 6;

export const RelatedQueries: FunctionComponent<{
    limit?: number;
}> = ({ limit = DEFAULT_ITEMS_LIMIT }) => {
    const { t } = useTranslation(translationNS);
    const navigate = useNavigate();
    const addToHistory = useUnit(searchHistoryModel.addQueryToHistory);
    const onStartSearchCloseModal = useUnit(modalModel.startSearch);

    const onDeleteRelatedQuery = useUnit(
        searchHistoryModel.removeQueryFromHistory,
    );

    const onPressRelatedQuery = (query: string): void => {
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
    const items = useList(
        searchHistoryModel.$$currentUserQueryHistory,
        (item, index) => {
            if (index >= limit) return null;

            const onPressItemElement = (): void => {
                onPressRelatedQuery(item.query);
            };

            const onPressDeleteItemButton = (): void => {
                if (onDeleteRelatedQuery) {
                    onDeleteRelatedQuery(item.query);
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
    return (
        <>
            <h2 className="py-2">{t(RELATED_QUERIES)}</h2>
            <div className="flex flex-col items-center gap-2">{items}</div>
        </>
    );
};

const CloseButton: FunctionComponent = () => {
    const onClickCloseButton = useUnit(modalModel.clickCloseArrow);

    useKeyPress(['Escape'], onClickCloseButton);

    return (
        <Button
            isIconOnly
            className="text-xl"
            variant="flat"
            onPress={onClickCloseButton}
        >
            <FaArrowLeft />
        </Button>
    );
};
const PerformSearchButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const navigate = useNavigate();
    const [query] = useUnit([baseModel.$query]);
    const addToHistory = useUnit(searchHistoryModel.addQueryToHistory);
    const onStartSearchCloseModal = useUnit(modalModel.startSearch);

    const onPressSearchButton = (): void => {
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

    useKeyPress(['Enter'], onPressSearchButton);

    return (
        <Button color="primary" onPress={onPressSearchButton}>
            {t(ACTION_SEARCH)}
        </Button>
    );
};

export const SetQueryField: FunctionComponent = () => {
    const [value, onChangeQuery] = useUnit([
        baseModel.$query,
        baseModel.setQuery,
    ]);
    const [searchParameters] = useSearchParams();

    useEffect(() => {
        const urlQuery = searchParameters.get('q') || '';
        onChangeQuery(urlQuery);
    }, [onChangeQuery, searchParameters]);

    return (
        <Input
            type="search"
            autoFocus
            value={value}
            className="pr-0"
            classNames={{
                inputWrapper: 'after:hidden border-none pb-0',
                innerWrapper: 'pb-0',
                clearButton: 'text-xl',
            }}
            onValueChange={onChangeQuery}
            labelPlacement="outside"
            fullWidth
        />
    );
};

/**
 * View
 */
interface SearchQueryInputModalProperties
    extends Pick<ModalProps, 'size' | 'placement'> {}

export const SearchQueryInputModal: FunctionComponent<
    SearchQueryInputModalProperties
> = ({ size = 'lg', placement = 'top' }) => {
    const [isOpen, onClose] = useUnit([
        modalModel.$isOpened,
        modalModel.closePopup,
    ]);

    useUnmount(() => {
        onClose();
    });

    return (
        <Modal
            size={size}
            placement={placement}
            isOpen={isOpen}
            hideCloseButton
            onClose={onClose}
            classNames={{
                backdrop:
                    'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
            }}
        >
            <ModalContent>
                <ModalHeader>
                    <CloseButton />
                    <SetQueryField />
                    <PerformSearchButton />
                </ModalHeader>
                <ModalBody className="!px-2">
                    <Divider />
                    <RelatedQueries />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
