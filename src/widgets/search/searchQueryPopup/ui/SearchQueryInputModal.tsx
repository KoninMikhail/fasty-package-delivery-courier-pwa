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
import { MdArrowBack } from 'react-icons/md';
import { useList, useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes, sharedConfigLocale } from '@/shared/config';
import { sharedLibBrowser } from '@/shared/lib';
import { forwardRef, PropsWithChildren, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Store } from 'effector';
import { AnimatePresence, motion } from 'framer-motion';
import {
    $historyRequestsStore,
    $isOpened,
    $searchQuery,
    changeSearchQuery,
    clickCloseArrow,
    clickDeleteRecentRequest,
    clickSearchButton,
} from '../model';
import { HistoryItem } from './common';

import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { useKeyPress } = sharedLibBrowser;
const { RouteName } = sharedConfigRoutes;
const { SEARCH_PAGE } = RouteName;

/**
 * Constants
 */

const SEARCH_BUTTON_TEXT = 'action.search';
const RECENT_QUERIES_TEXT = 'queries.recents';

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Layout
 */

const Head: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="flex">{children}</div>;
};

/**
 * Components
 */

interface SearchFieldProperties {
    query: string;
    onChangeValue: (value: string) => void;
    onPressSearch: () => void;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProperties>(
    ({ query, onChangeValue, onPressSearch }, reference) => {
        const { t } = useTranslation(translationNS);
        const buttonVisible = query.length > 0;
        return (
            <div className="flex flex-grow gap-2">
                <Input
                    ref={reference}
                    autoFocus
                    value={query}
                    variant="flat"
                    onValueChange={onChangeValue}
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
                                    <Button
                                        color="secondary"
                                        onPress={onPressSearch}
                                    >
                                        {t(SEARCH_BUTTON_TEXT)}
                                    </Button>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    }
                    fullWidth
                />
            </div>
        );
    },
);

const CloseButton: FunctionComponent<{ onClose: () => void }> = ({
    onClose,
}) => {
    return (
        <Button variant="light" onPress={onClose} isIconOnly>
            <MdArrowBack className="text-xl" />
        </Button>
    );
};

const RelatedQueries: FunctionComponent<{
    items: Store<string[]>;
    onPressHistoryItem: (value: string) => void;
    onClickDeleteHistoryItem: (value: string) => void;
}> = ({ items, onPressHistoryItem, onClickDeleteHistoryItem }) => {
    const { t } = useTranslation(translationNS);
    const historyItems = useList(items, (item) => {
        return (
            <HistoryItem
                query={item}
                onPressItem={(value) => onPressHistoryItem(value)}
                onPressDelete={(value) => onClickDeleteHistoryItem(value)}
            />
        );
    });
    return (
        <>
            <span className="py-2 text-sm font-bold">
                {t(RECENT_QUERIES_TEXT)}
            </span>
            {historyItems}
        </>
    );
};

/**
 * View
 */
interface SearchQueryInputModalProperties
    extends Pick<ModalProps, 'size' | 'placement'> {}

export const SearchQueryInputModal: FunctionComponent<
    SearchQueryInputModalProperties
> = ({ size = 'full', placement = 'auto' }) => {
    const navigate = useNavigate();
    const reference = useRef<HTMLInputElement>(null);
    const [
        isOpen,
        onClickClose,
        onPressSearchButton,
        onClickDeleteHistoryItem,
    ] = useUnit([
        $isOpened,
        clickCloseArrow,
        clickSearchButton,
        clickDeleteRecentRequest,
    ]);
    const searchesStore = $historyRequestsStore;

    /**
     * Query input
     */
    const [query, setQuery] = useUnit([$searchQuery, changeSearchQuery]);

    const onChangeValue = (value: string): void => {
        setQuery(value);
    };
    const onPressSearch = (): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();

        reference.current?.blur();
        onPressSearchButton();
        navigate(`${SEARCH_PAGE}?${queryParameters}`);
    };

    const onPressHistoryItem = (value: string): void => {
        const queryParameters = new URLSearchParams({
            q: value,
        }).toString();

        onPressSearchButton();
        navigate(`${SEARCH_PAGE}?${queryParameters}`);
    };

    /**
     * Keyboard shortcuts
     */

    useKeyPress(['Enter'], onPressSearch);

    return (
        <Modal
            size={size}
            placement={placement}
            isOpen={isOpen}
            hideCloseButton
            onClose={onClickClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 px-2">
                            <Head>
                                <CloseButton onClose={onClose} />
                                <SearchField
                                    query={query}
                                    onChangeValue={onChangeValue}
                                    onPressSearch={onPressSearch}
                                    ref={reference}
                                />
                            </Head>
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="px-4">
                            <RelatedQueries
                                items={searchesStore}
                                onPressHistoryItem={onPressHistoryItem}
                                onClickDeleteHistoryItem={
                                    onClickDeleteHistoryItem
                                }
                            />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
