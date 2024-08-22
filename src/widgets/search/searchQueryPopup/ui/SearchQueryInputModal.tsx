import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader as NextUiModalHeader,
    ModalProps,
} from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { PropsWithChildren } from 'react';

import { FaArrowLeft } from 'react-icons/fa6';
import { useKeyPress } from '@/shared/lib/browser';
import { useUnmount } from 'usehooks-ts';
import {
    searchCloseArrowClicked,
    searchPopupCloseClicked,
} from '@/widgets/search/searchQueryPopup/model/model';
import { $isPopupOpened } from '@/widgets/search/searchQueryPopup/model/stores';
import {
    SetQueryField,
    PerformSearchButton,
    RelatedQueries,
} from './common/components';

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

const CloseButton: FunctionComponent = () => {
    const { onClickCloseButton } = useUnit({
        onClickCloseButton: searchCloseArrowClicked,
    });

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

/**
 * View
 */
interface SearchQueryInputModalProperties
    extends Pick<ModalProps, 'size' | 'placement' | 'backdrop'> {}

export const SearchQueryInputModal: FunctionComponent<
    SearchQueryInputModalProperties
> = ({ size = 'lg', placement = 'top', backdrop = 'opaque' }) => {
    const { isOpen, onClose } = useUnit({
        isOpen: $isPopupOpened,
        onClose: searchPopupCloseClicked,
    });

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
            backdrop={backdrop}
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
