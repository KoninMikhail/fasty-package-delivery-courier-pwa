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
import { $isCookiePolicyModalVisible, setHidden } from '../model';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { enCookiePolicy, ruCookiePolicy } = sharedAssetsDocs;
const { getContentForLocale } = sharedLibHelpers;
const { Markdown } = sharedUiComponents;

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name CookiePolicyModal
 */
export const CookiePolicyModal: FunctionComponent<Pick<ModalProps, 'size'>> = ({
    size,
}) => {
    const [isOpen, onClose] = useUnit([$isCookiePolicyModalVisible, setHidden]);

    const { t, i18n } = useTranslation(translationNS);

    const content = getContentForLocale(i18n.language, {
        en: enCookiePolicy,
        ru: ruCookiePolicy,
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
