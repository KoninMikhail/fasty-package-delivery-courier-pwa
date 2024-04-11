import {
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { AuthByEmail } from '@/features/auth/ByEmail';
import { PropsWithChildren } from 'react';
import {
    $isSignInModalVisible,
    authByEmailModel,
    pressedOpenCookiePolicyLink,
    pressedOpenPrivacyPolicyLink,
    pressedOpenTermsOfUseLink,
    setHidden,
} from '../model';

import {
    MODAL_ACCEPTANCE,
    MODAL_COOKIES_POLICY,
    MODAL_PRIVACY_POLICY,
    MODAL_TERMS_OF_USE,
    MODAL_TITLE,
    translationNS,
} from '../config';

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

export const SignInModal: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);

    const [isOpened, setClosed] = useUnit([$isSignInModalVisible, setHidden]);

    const [
        onClickPrivacyPolicyLink,
        onClickTermsOfUseLink,
        onClickCookiesPolicyLink,
    ] = useUnit([
        pressedOpenPrivacyPolicyLink,
        pressedOpenTermsOfUseLink,
        pressedOpenCookiePolicyLink,
    ]);

    const onCloseHandler = (): void => {
        setClosed();
    };

    return (
        <Modal isOpen={isOpened} onClose={onCloseHandler} placement="auto">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t(MODAL_TITLE)}
                </ModalHeader>
                <ModalBody>
                    <AuthByEmail.Form model={authByEmailModel} />
                </ModalBody>
                <ModalFooter>
                    <PolicesLinks>
                        {t(MODAL_ACCEPTANCE)}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            size="sm"
                            href="#"
                            onPress={onClickPrivacyPolicyLink}
                        >
                            {t(MODAL_PRIVACY_POLICY)}
                        </Link>
                        {', '}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            size="sm"
                            href="#"
                            onPress={onClickTermsOfUseLink}
                        >
                            {t(MODAL_TERMS_OF_USE)}
                        </Link>
                        {', '}

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            size="sm"
                            href="#"
                            onPress={onClickCookiesPolicyLink}
                        >
                            {t(MODAL_COOKIES_POLICY)}
                        </Link>
                    </PolicesLinks>
                    <Spacer y={2} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
