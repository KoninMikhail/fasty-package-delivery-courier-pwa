import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalProps,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { sharedUiComponents } from '@/shared/ui';
import { sharedConfigLocale } from '@/shared/config';
import { useUnit } from 'effector-react';
import { sharedLibHelpers } from '@/shared/lib';
import { sharedAssetsDocs } from '@/shared/assets';
import { translationNS } from '../config';
import { $isPrivacyPolicyModalVisible, setHidden } from '../model';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { ruPrivacyPolicy, enPrivacyPolicy } = sharedAssetsDocs;
const { getContentForLocale } = sharedLibHelpers;
const { Markdown } = sharedUiComponents;

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name PrivacyPolicyModal
 */
export const PrivacyPolicyModal: FunctionComponent<
    Pick<ModalProps, 'size'>
> = ({ size }) => {
    const [isOpen, onClose] = useUnit([
        $isPrivacyPolicyModalVisible,
        setHidden,
    ]);

    const { t, i18n } = useTranslation(translationNS);

    const content = getContentForLocale(i18n.language, {
        en: enPrivacyPolicy,
        ru: ruPrivacyPolicy,
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t('modal.title')}
                </ModalHeader>
                <ModalBody>
                    {content ? <Markdown content={content} /> : null}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
