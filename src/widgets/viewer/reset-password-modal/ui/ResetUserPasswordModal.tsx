import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
} from '@nextui-org/react';
import { ResetByEmail } from '@/features/reset/ByEmail';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { PropsWithChildren } from 'react';
import { $isResetUserModalVisible, resetUserModel, setHidden } from '../model';

import { translationNS } from '../config';

/**
 * Layouts
 */
const Message: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <p className="border-l-large border-primary-300 pl-3 text-sm">{children}</p>
);

/**
 * ResetPasswordModal
 * @constructor
 */
export const ResetPasswordModal: FunctionComponent = () => {
    const [isOpen, onClose] = useUnit([$isResetUserModalVisible, setHidden]);
    const { t } = useTranslation(translationNS);

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="auto">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t('widget.title')}
                </ModalHeader>
                <ModalBody>
                    <Message>{t('widget.message')}</Message>
                    <Spacer y={1} />
                    <ResetByEmail.Form model={resetUserModel} />
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};
