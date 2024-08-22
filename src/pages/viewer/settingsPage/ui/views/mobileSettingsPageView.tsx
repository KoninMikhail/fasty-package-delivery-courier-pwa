import { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedConfigConstants } from '@/shared/config';
import { Button, Chip, Divider, Link, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { ChangeColorModeSwitchButton } from '@/features/viewer/changeColorMode';
import { Button, ChangeLanguage } from '@/features/viewer/changeLanguage';
import {
    MdOutlineMarkunreadMailbox,
    MdOutlinePhoneEnabled,
} from 'react-icons/md';
import { CompanyLogoIcon } from '@/shared/ui/icons/CompanyLogoIcon';
import { widgetCookiePolicyModalUi } from '@/widgets/polices/cookiePolicyModal';
import { widgetPrivacyPolicyModalUi } from '@/widgets/polices/privacyPolicyModal';
import { widgetTermsOfUseModalUi } from '@/widgets/polices/termsOfUseModal';
import { useUnit } from 'effector-react';
import { SetHomeUpcomingCount } from '@/features/viewer/setHomeUpcommingCount';
import { sharedLibApp, sharedLibHelpers } from '@/shared/lib';

import { BackButton } from '../common/BackButton';

import {
    pressOpenCookiePolicyLink,
    pressOpenPrivacyPolicyLink,
    pressOpenTermsOfUseLink,
} from '../../model';
import {
    NOTIFICATION_CONTENT,
    PAGE_HEADING,
    SECTION_HELP_SUPPORT_CALL_BUTTON,
    SECTION_HELP_SUPPORT_EMAIL_BUTTON,
    SECTION_HELP_SUPPORT_TITLE,
    SECTION_LEGAL_COOKIE_POLICY,
    SECTION_LEGAL_PRIVACY_POLICY,
    SECTION_LEGAL_TERMS_OF_USE,
    SECTION_LEGAL_TITLE,
    translationNS,
} from '../../config';

const { AppVersion } = sharedLibApp;
const { removeNonNumericChars } = sharedLibHelpers;
const { TermsOfUseModal } = widgetTermsOfUseModalUi;
const { CookiePolicyModal } = widgetCookiePolicyModalUi;
const { PrivacyPolicyModal } = widgetPrivacyPolicyModalUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { APP_NAME, APP_DESCRIPTION, APP_SUPPORT_EMAIL, APP_SUPPORT_PHONE } =
    sharedConfigConstants;
/*
 * Layout
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 pb-20 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <section className="grid gap-4 p-2">{children}</section>
);

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

const ContactLinks: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const phoneLink = `tel:+${removeNonNumericChars(APP_SUPPORT_PHONE)}`;
    const emailLink = `mailto:${APP_SUPPORT_EMAIL}`;
    return (
        <div className="flex w-full gap-4 pb-2">
            <Button
                href={phoneLink}
                color="primary"
                as={Link}
                variant="flat"
                fullWidth
                isExternal
                showAnchorIcon
                anchorIcon={<MdOutlinePhoneEnabled />}
            >
                {t(SECTION_HELP_SUPPORT_CALL_BUTTON)}
            </Button>
            <Button
                href={emailLink}
                color="primary"
                as={Link}
                variant="flat"
                fullWidth
                anchorIcon={<MdOutlineMarkunreadMailbox />}
                showAnchorIcon
                isExternal
            >
                {t(SECTION_HELP_SUPPORT_EMAIL_BUTTON)}
            </Button>
        </div>
    );
};

const PolicesLinks: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const onPressCookiePolicy = useUnit(pressOpenCookiePolicyLink);
    const onPressPrivacyPolicy = useUnit(pressOpenPrivacyPolicyLink);
    const onPressTermsOfUse = useUnit(pressOpenTermsOfUseLink);
    return (
        <>
            <Button onPress={onPressTermsOfUse} variant="bordered">
                {t(SECTION_LEGAL_TERMS_OF_USE)}
            </Button>
            <Button onPress={onPressPrivacyPolicy} variant="bordered">
                {t(SECTION_LEGAL_PRIVACY_POLICY)}
            </Button>
            <Button onPress={onPressCookiePolicy} variant="bordered">
                {t(SECTION_LEGAL_COOKIE_POLICY)}
            </Button>
        </>
    );
};

/**
 * @name MobileSettingsPageView
 * @constructor
 */
export const MobileSettingsPageView: FunctionComponent = () => {
    const { t, i18n } = useTranslation(translationNS);

    /**
     * Translation
     */
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    return (
        <>
            <Header />
            <MainContainer>
                <div className="flex w-full flex-col justify-center gap-1 py-4">
                    <div className="flex w-full justify-center">
                        <CompanyLogoIcon className="py-4 text-9xl" />
                    </div>
                    <Spacer />
                    <div className="flex w-full items-center justify-center gap-1 text-center text-lg">
                        <span className=" font-bold">{APP_NAME}</span>
                        <Chip size="sm">
                            <AppVersion />
                        </Chip>
                    </div>
                    <div className="w-full text-center text-xs">
                        {APP_DESCRIPTION[currentLanguage]}
                    </div>
                </div>
                <Spacer />
                <Divider />
                <Spacer />
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">{t('language.title')}</div>
                        <div>
                            <ChangeLanguage.Button />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">{t('theme.title')}</div>
                        <div>
                            <ChangeColorModeSwitchButton />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">
                            {t('setting.upcoming.items.count')}
                        </div>
                        <div>
                            <SetHomeUpcomingCount.Dropdown />
                        </div>
                    </div>
                </Section>
                <Spacer />
                <Section>
                    <p className="text-xs text-danger-400">
                        {t(NOTIFICATION_CONTENT)}
                    </p>
                </Section>
                <Spacer />
                <Divider />
                <Spacer y={2} />
                <Section>
                    <div className="w-full font-bold">
                        {t(SECTION_HELP_SUPPORT_TITLE)}
                    </div>
                    <ContactLinks />
                </Section>
                <Section>
                    <div className="flex flex-col gap-2">
                        <div className="mb-2 w-full font-bold">
                            {t(SECTION_LEGAL_TITLE)}
                        </div>
                        <PolicesLinks />
                    </div>
                </Section>
            </MainContainer>
            <NavbarMobile />
            <CookiePolicyModal size="5xl" />
            <PrivacyPolicyModal size="5xl" />
            <TermsOfUseModal size="5xl" />
        </>
    );
};
