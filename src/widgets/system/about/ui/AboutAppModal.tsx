import {
    Button,
    ButtonProps,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { sharedUiComponents } from '@/shared/ui';
import { sharedConfigLocale } from '@/shared/config';
import { translationNS } from '../config';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { Text } = sharedUiComponents;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Components
 */
const CloseButton: FunctionComponent<ButtonProps> = (properties) => {
    const { t } = useTranslation(translationNS);
    return (
        <Button fullWidth {...properties}>
            {t('about.ui.closeButton')}
        </Button>
    );
};

/**
 * @name AboutAppModal
 */
export const AboutAppModal: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const { isOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpenChange}>
                {t('about.ui.triggerButton')}
            </Button>
            <Modal
                isOpen={isOpen}
                placement="bottom-center"
                onOpenChange={onOpenChange}
                hideCloseButton
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex w-full flex-col items-center gap-4 pt-8">
                                    <Image
                                        width={180}
                                        src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                        alt="NextUI Album Cover"
                                        classNames="m-5 mx-auto"
                                    />
                                    <div>
                                        <Text>{`${t('about.version')}:`}</Text>
                                        <Text className="text-center">
                                            {import.meta.env.PACKAGE_VERSION}
                                        </Text>
                                    </div>
                                    <div>
                                        <Text className="text-center">
                                            С другой стороны новая модель
                                            организационной деятельности
                                            представляет собой интересный
                                            эксперимент.
                                        </Text>
                                    </div>
                                </div>
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
