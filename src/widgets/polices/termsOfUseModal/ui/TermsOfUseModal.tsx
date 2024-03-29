import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalProps,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import React, { Suspense } from 'react';
import { ErrorPolicyLoad } from './parts/components';
import { MODAL_TITLE, translationNS } from '../config';
import { $isTermsOfUseModalVisible, setHidden } from '../model';

/**
 * @name TermsOfUseModal
 */
export const TermsOfUseModal: FunctionComponent<Pick<ModalProps, 'size'>> = ({
    size,
}) => {
    const [isOpen, onClose] = useUnit([$isTermsOfUseModalVisible, setHidden]);
    const { t, i18n } = useTranslation(translationNS);
    const { language } = i18n;

    const PolicyContent = React.lazy(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        () =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            import(`./parts/data/policy/${language}/Policy.tsx`).catch(() => {
                return {
                    default: ErrorPolicyLoad,
                };
            }),
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t(MODAL_TITLE)}
                </ModalHeader>
                <ModalBody>
                    <Suspense>
                        <PolicyContent />
                    </Suspense>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
