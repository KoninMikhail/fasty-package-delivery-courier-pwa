import {
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
} from '@nextui-org/react';
import { sharedConfigLocale } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { AuthByEmail } from '@/features/auth/ByEmail';
import { PropsWithChildren } from 'react';
import { $isSignInModalVisible, authByEmailModel, setHidden } from '../model';

import { translationNS } from '../config';
import locale_ru from '../locales/ru.locale.json';
import locale_en from '../locales/en.locale.json';

const { locale } = sharedConfigLocale;

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Layout
 */
const PolicesLinks: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="text-center text-sm">
        <span>{children}</span>
    </div>
);

/**
 * View
 */
interface IAuthUserByEmailModalProperties {
    onClickPrivacyPolicyLink?: () => void;
    onClickTermsOfUseLink?: () => void;
    onClickCookiesPolicyLink?: () => void;
}

export const SignInModal: FunctionComponent<
    IAuthUserByEmailModalProperties
> = ({
    onClickPrivacyPolicyLink,
    onClickCookiesPolicyLink,
    onClickTermsOfUseLink,
}) => {
    const [isOpened, setClosed] = useUnit([$isSignInModalVisible, setHidden]);

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
                    <AuthByEmail.Form model={authByEmailModel} />
                </ModalBody>
                <ModalFooter>
                    <PolicesLinks>
                        {t('modal.acceptance')}
                        {' : '}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            size="sm"
                            href="#"
                            onPress={onClickPrivacyPolicyLink}
                        >
                            {t('modal.acceptance.privacy')}
                        </Link>
                        {', '}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            size="sm"
                            href="#"
                            onPress={onClickTermsOfUseLink}
                        >
                            {t('modal.acceptance.terms')}
                        </Link>
                        {', '}

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            size="sm"
                            href="#"
                            onPress={onClickCookiesPolicyLink}
                        >
                            {t('modal.acceptance.cookies')}
                        </Link>
                    </PolicesLinks>
                    <Spacer y={2} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
