import type { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Button, Divider, Spacer } from '@nextui-org/react';
import { widgetSelectAvatarUi } from '@/widgets/viewer/select-avatar';
import { widgetPersonalInfoUi } from '@/widgets/viewer/personal-info';
import { useTranslation } from 'react-i18next';
import {
    CHANGE_PASSWORD_DESCRIPTION,
    CHANGE_PASSWORD_LABEL,
    PAGE_HEADING,
    translationNS,
} from '@/pages/viewer/profileEditPage/config';
import { widgetSelectPasswordUi } from '@/widgets/viewer/select-password';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { sharedConfigRoutes } from '@/shared/config';

const {
    RouteName: { DELIVERIES },
} = sharedConfigRoutes;
const { NavbarMobile } = widgetNavbarMobileUi;
const { SelectAvatarRow } = widgetSelectAvatarUi;
const { PersonalInfo } = widgetPersonalInfoUi;
const { SelectPassword } = widgetSelectPasswordUi;

/**
 * ===================
 * Layout
 * ===================
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-4 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/**
 * ===================
 * Components
 * ===================
 */
const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();
    const onPress = (): void => navigate(-1);

    return (
        <Button
            href={DELIVERIES}
            variant="ghost"
            onPress={onPress}
            className="flex items-center gap-1 text-xl"
            isIconOnly
        >
            <IoMdClose />
        </Button>
    );
};

const Header: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <header className="flex w-full items-center px-4 pt-4">
            <h1 className="flex-grow truncate text-xl font-bold">
                {t(PAGE_HEADING)}
            </h1>
            <div className="flex-shrink">
                <BackButton />
            </div>
        </header>
    );
};

const PasswordTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <h2 className="text-xl font-bold">{t(CHANGE_PASSWORD_LABEL)}</h2>
            <Spacer y={2} />
            <p className="text-sm">{t(CHANGE_PASSWORD_DESCRIPTION)}</p>
            <Spacer y={4} />
            <div className="flex flex-col gap-4">
                <SelectPassword />
            </div>
        </div>
    );
};

/**
 * @name MobileProfileEditPageView
 * @description Page for deliveries exchange
 * @constructor
 */
export const MobileProfileEditPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={4} className="px-4" />
            <Divider />
            <Spacer y={8} />
            <Content>
                <SelectAvatarRow />
                <Spacer y={8} />
                <PersonalInfo />
                <Spacer y={8} />
                <PasswordTool />
                <Spacer y={24} />
            </Content>
            <NavbarMobile />
        </>
    );
};
