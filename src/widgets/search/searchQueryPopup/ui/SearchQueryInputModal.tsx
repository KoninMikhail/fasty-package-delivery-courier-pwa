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
import { sharedConfigRoutes } from '@/shared/config';
import { PropsWithChildren, useRef } from 'react';
import { RelatedQueries, searchHistoryModel } from '@/entities/search';
import { sessionModel } from '@/entities/viewer';
import { SetQueryField } from '@/entities/search/ui/SetQueryField';
import { $isOpened, clickCloseArrow, clickSearchButton } from '../model';

const { RouteName } = sharedConfigRoutes;
const { SEARCH_PAGE } = RouteName;

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
