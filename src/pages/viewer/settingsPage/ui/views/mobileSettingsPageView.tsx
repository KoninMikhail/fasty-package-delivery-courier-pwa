import { PropsWithChildren, useState } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiLayouts } from '@/shared/ui';
import { sharedConfigConstants } from '@/shared/config';
import { Button, Chip, Divider, Input, Link, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { ChangeColorModeSwitchButton } from '@/features/viewer/changeColorMode';
import { ChangeLanguageButton } from '@/features/viewer/changeLanguage';
import { resetDeliveryById } from '@/entities/delivery/model/effects/resetDeliveryById';
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
import {
    pressOpenCookiePolicyLink,
    pressOpenPrivacyPolicyLink,
    pressOpenTermsOfUseLink,
} from '../../model';
import { translationNS } from '../../config';

const { TermsOfUseModal } = widgetTermsOfUseModalUi;
const { CookiePolicyModal } = widgetCookiePolicyModalUi;
const { PrivacyPolicyModal } = widgetPrivacyPolicyModalUi;
const { Section } = sharedUiLayouts;
const { NavbarMobile } = widgetNavbarMobileUi;
const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;
/*
 * Layout
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 pb-20 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

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
            <MainContainer>
                <div className="flex w-full flex-col justify-center gap-1 py-4">
                    <div className="flex w-full justify-center">
                        <CompanyLogoIcon className="py-4 text-9xl" />
                    </div>
                    <Spacer />
                    <div className="flex w-full items-center justify-center gap-1 text-center text-lg">
                        <span className=" font-bold">{APP_NAME}</span>
                        <Chip size="sm">0.0.0</Chip>
                    </div>
                    <div className="w-full text-center text-xs">
                        {APP_DESCRIPTION[currentLanguage]}
                    </div>
                </div>
                <Spacer />
                <Divider />
                <Spacer />
                <Section>
                    <div className="w-full font-bold">Настройки</div>
                </Section>
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
                        Внимание! Все настройки сохраняются локально на вашем
                        устройстве. При очистке cookies настройки будут
                        сброшены. Также при смене устройства потребуется
                        повторить настройки.
                    </p>
                </Section>
                <Spacer />
                <Divider />
                <Spacer y={1} />
                <Section>
                    <div className="w-full font-bold">
                        Контактная информация
                    </div>
                    <div className="flex w-full gap-4 pb-2">
                        <Button
                            color="primary"
                            as={Link}
                            variant="flat"
                            fullWidth
                            showAnchorIcon
                            anchorIcon={<MdOutlinePhoneEnabled />}
                        >
                            Позвонить
                        </Button>
                        <Button
                            color="primary"
                            as={Link}
                            variant="flat"
                            fullWidth
                            anchorIcon={<MdOutlineMarkunreadMailbox />}
                            showAnchorIcon
                        >
                            Эл. почта
                        </Button>
                    </div>
                </Section>
                <Spacer />
                <Divider />
                <Spacer y={4} />
                <div className="flex flex-col gap-4">
                    <div className="mb-2 w-full font-bold">
                        Правовая информация
                    </div>
                    <Button onPress={onPressTermsOfUse}>
                        Условия использования
                    </Button>
                    <Button onPress={onPressPrivacyPolicy}>
                        Политика конфеденциальности
                    </Button>
                    <Button onPress={onPressCookiePolicy}>
                        Политика Cookie
                    </Button>
                </div>
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
