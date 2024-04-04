import { PropsWithChildren, useState } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiLayouts } from '@/shared/ui';
import { sharedConfigConstants } from '@/shared/config';
import { Button, Chip, Divider, Input, Link, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { ChangeColorModeSwitchButton } from '@/features/viewer/changeColorMode';
import { ChangeLanguageButton } from '@/features/viewer/changeLanguage';
import { resetDeliveryById } from '@/entities/delivery/effects/resetDeliveryById';
import {
    MdOutlineMarkunreadMailbox,
    MdOutlinePhoneEnabled,
} from 'react-icons/md';
import { CompanyLogoIcon } from '@/shared/ui/icons/CompanyLogoIcon';
import { widgetCookiePolicyModalUi } from '@/widgets/polices/cookiePolicyModal';
import { widgetPrivacyPolicyModalUi } from '@/widgets/polices/privacyPolicyModal';
import { widgetTermsOfUseModalUi } from '@/widgets/polices/termsOfUseModal';
import { useUnit } from 'effector-react';
import { UpcomingItemsCountDropdown } from '@/features/viewer/setHomeUpcommingCount';
import { sharedLibApp, sharedLibHelpers } from '@/shared/lib';
import {
    SettingsNotice,
    BackButton,
    PageTitle,
    SectionHelpSupportTitle,
    SectionLegalTitle,
    CallButtonText,
    EmailButtonText,
    TermsOfUseButtonText,
    PrivacyPolicyButtonText,
    CookiesPolicyButtonText,
} from '../common';

import {
    pressOpenCookiePolicyLink,
    pressOpenPrivacyPolicyLink,
    pressOpenTermsOfUseLink,
} from '../../model';
import { translationNS } from '../../config';

const { AppVersion } = sharedLibApp;
const { removeNonNumericChars } = sharedLibHelpers;
const { TermsOfUseModal } = widgetTermsOfUseModalUi;
const { CookiePolicyModal } = widgetCookiePolicyModalUi;
const { PrivacyPolicyModal } = widgetPrivacyPolicyModalUi;
const { Section } = sharedUiLayouts;
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

const Header: FunctionComponent = () => (
    <header className="flex w-full items-center px-4 pt-4">
        <h1 className="flex-grow truncate text-xl font-bold">
            <PageTitle />
        </h1>
        <div className="flex-shrink">
            <BackButton />
        </div>
    </header>
);

const ContactLinks: FunctionComponent = () => {
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
                <CallButtonText />
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
                <EmailButtonText />
            </Button>
        </div>
    );
};

const PolicesLinks: FunctionComponent<{
    onPressCookiePolicy: () => void;
    onPressPrivacyPolicy: () => void;
    onPressTermsOfUse: () => void;
}> = ({ onPressCookiePolicy, onPressPrivacyPolicy, onPressTermsOfUse }) => {
    return (
        <>
            <Button onPress={onPressTermsOfUse} variant="bordered">
                <TermsOfUseButtonText />
            </Button>
            <Button onPress={onPressPrivacyPolicy} variant="bordered">
                <PrivacyPolicyButtonText />
            </Button>
            <Button onPress={onPressCookiePolicy} variant="bordered">
                <CookiesPolicyButtonText />
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
    const [id, setId] = useState<string>('0');

    /**
     * Translation
     */
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    const onResetPress = () => {
        if (id !== '0') {
            void resetDeliveryById(id);
            setId('0');
        }
    };

    const onPressCookiePolicy = useUnit(pressOpenCookiePolicyLink);
    const onPressPrivacyPolicy = useUnit(pressOpenPrivacyPolicyLink);
    const onPressTermsOfUse = useUnit(pressOpenTermsOfUseLink);

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
                            <ChangeLanguageButton />
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
                            <UpcomingItemsCountDropdown />
                        </div>
                    </div>
                </Section>
                <Spacer />
                <Section>
                    <p className="text-xs text-danger-400">
                        <SettingsNotice />
                    </p>
                </Section>
                <Spacer />
                <Divider />
                <Spacer y={2} />
                <Section>
                    <div className="w-full font-bold">
                        <SectionHelpSupportTitle />
                    </div>
                    <ContactLinks />
                </Section>
                <Section>
                    <div className="flex flex-col gap-2">
                        <div className="mb-2 w-full font-bold">
                            <SectionLegalTitle />
                        </div>
                        <PolicesLinks
                            onPressCookiePolicy={onPressCookiePolicy}
                            onPressPrivacyPolicy={onPressPrivacyPolicy}
                            onPressTermsOfUse={onPressTermsOfUse}
                        />
                    </div>
                </Section>

                <div className="px-2 py-4">Обнуление доставки</div>
                <div className="flex gap-2 px-2">
                    <Input
                        type="text"
                        value={id}
                        onValueChange={(value) => setId(value)}
                        variant="bordered"
                        className="max-w-xs"
                    />
                    <Button onPress={onResetPress}>Сбросить</Button>
                </div>
            </MainContainer>
            <NavbarMobile />
            <CookiePolicyModal size="5xl" />
            <PrivacyPolicyModal size="5xl" />
            <TermsOfUseModal size="5xl" />
        </>
    );
};
