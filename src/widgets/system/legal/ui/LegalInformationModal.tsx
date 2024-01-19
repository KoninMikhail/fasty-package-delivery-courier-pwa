import { useTranslation } from 'react-i18next';
import {
    Button,
    ButtonProps,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { sharedConfigLocale } from '@/shared/config';
import { sharedUiComponents } from '@/shared/ui';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

import { translationNS } from '../config';
import { getContentForLocale } from '../lib';

import enTermsOfUse from '../assets/en.terms.md?raw';
import ruTermsOfUse from '../assets/ru.terms.md?raw';

const { locale } = sharedConfigLocale;
const { Markdown } = sharedUiComponents;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Component
 */
const CloseButton: FunctionComponent<Pick<ButtonProps, 'onPress'>> = ({
    onPress,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <Button fullWidth onPress={onPress}>
            {t('legal.ui.closeButton')}
        </Button>
    );
};

/**
 * @name LegalInformationModal
 * @constructor
 */
export const LegalInformationModal: FunctionComponent = () => {
    const { t, i18n } = useTranslation(translationNS);
    const { isOpen, onOpenChange } = useDisclosure();

    const content = getContentForLocale(i18n.language, {
        en: enTermsOfUse,
        ru: ruTermsOfUse,
    }) as unknown as string;

    return (
        <>
            <Button onPress={onOpenChange}>
                {t('legal.ui.triggerButton')}
            </Button>
            <Modal
                isOpen={isOpen}
                placement="bottom-center"
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {t('legal.title')}
                            </ModalHeader>
                            <ModalBody className="max-h-3/5">
                                {content ? (
                                    <Markdown content={content} />
                                ) : null}
                            </ModalBody>
                            <ModalFooter>
                                <CloseButton onPress={onClose} />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
