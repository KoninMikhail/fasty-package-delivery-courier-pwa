import {
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
} from '@nextui-org/react';
import { AuthByEmail } from '@/features/auth/authByEmail';
import { sharedConfigRoutes, sharedConfigLocale } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import {
    $isAuthUserModalOpened,
    authUserByEmailModel,
    setModalClosed,
} from '../model';

import { translationNS } from '../config';
import locale_ru from '../locales/ru.locale.json';
import locale_en from '../locales/en.locale.json';

const { RouteName } = sharedConfigRoutes;
const { PRIVACY_POLICY_PAGE, TERMS_OF_SERVICE_PAGE, COOKIES_POLICY_PAGE } =
    RouteName;

const { locale } = sharedConfigLocale;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 *
 * @param isOpen
 * @param onOpenChange
 * @constructor
 */
export const AuthUserByEmailModal: FunctionComponent = () => {
    const [isOpened, setClosed] = useUnit([
        $isAuthUserModalOpened,
        setModalClosed,
    ]);

    const { t } = useTranslation(translationNS);

    const onCloseHandler = (): void => {
        setClosed();
    };

    return (
        <Modal isOpen={isOpened} onClose={onCloseHandler} placement="auto">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t('modal.title')}
                </ModalHeader>
                <ModalBody>
                    <AuthByEmail.Form model={authUserByEmailModel} />
                </ModalBody>
                <ModalFooter>
                    <div className="text-center text-sm">
                        <span>
                            {t('modal.acceptance')}
                            {' : '}
                            <Link
                                size="sm"
                                isExternal
                                href={PRIVACY_POLICY_PAGE}
                            >
                                {t('modal.acceptance.privacy')}
                            </Link>
                            {', '}
                            <Link
                                size="sm"
                                isExternal
                                href={TERMS_OF_SERVICE_PAGE}
                            >
                                {t('modal.acceptance.terms')}
                            </Link>
                            {', '}

                            <Link
                                size="sm"
                                isExternal
                                href={COOKIES_POLICY_PAGE}
                            >
                                {t('modal.acceptance.cookies')}
                            </Link>
                        </span>
                        <Spacer y={2} />
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
