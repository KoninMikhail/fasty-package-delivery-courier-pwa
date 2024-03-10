import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalProps,
} from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';
import { useUnit } from 'effector-react';
import { sharedConfigRoutes, sharedConfigLocale } from '@/shared/config';
import { sharedLibBrowser } from '@/shared/lib';
import { PropsWithChildren, useRef } from 'react';
import { RelatedQueries, searchHistoryModel } from '@/entities/search';
import { sessionModel } from '@/entities/viewer';
import { SetQueryField } from '@/entities/search/ui/SetQueryField';
import { translationNS } from '../config';
import { $isOpened, clickCloseArrow, clickSearchButton } from '../model';

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

const CloseButton: FunctionComponent<{ onClose: () => void }> = ({
    onClose,
}) => {
    return (
        <Button variant="light" onPress={onClose} isIconOnly>
            <MdArrowBack className="text-xl" />
        </Button>
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
    const reference = useRef<HTMLInputElement>(null);
    const [isOpen, onClickClose, onPressSearchButton] = useUnit([
        $isOpened,
        clickCloseArrow,
        clickSearchButton,
    ]);

    /**
     * Query input
     */
    const user = useUnit(sessionModel.$sessionStore);
    const queryHistory = useUnit(searchHistoryModel.$queryHistory);

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
                        <ModalHeader className="flex flex-col gap-1 p-2">
                            <Head>
                                <CloseButton onClose={onClose} />
                                <SetQueryField
                                    ref={reference}
                                    onPressSearchButton={onPressSearchButton}
                                    path={SEARCH_PAGE}
                                />
                            </Head>
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="px-4">
                            <RelatedQueries
                                queries={queryHistory}
                                path={SEARCH_PAGE}
                                user={user}
                            />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
