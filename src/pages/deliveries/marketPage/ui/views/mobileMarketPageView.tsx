import { memo, PropsWithChildren, useRef } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetMarketUi } from '@/widgets/deliveries/market';
import { sharedConfigRoutes } from '@/shared/config';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Spacer,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import {
    widgetSearchQueryPopupUi,
    widgetSearchQueryPopupModel,
} from '@/widgets/search/searchQueryPopup';
import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import { useNavigate } from 'react-router-dom';
import { getUserName, UserAvatar } from '@/entities/user';
import { Logout } from '@/features/auth/logout';
import {
    UPCOMING_DELIVERIES_LABEL,
    translationNS,
    GOTO_MY_DELIVERIES_LINK_LABEL,
    MARKET_LABEL,
    SEARCH_PLACEHOLDER,
    HELLO_TEXT,
    HELLO_TEXT_WITHOUT_NAME,
    LOGOUT_TEXT,
    PROFILE_TEXT,
    SETTINGS_TEXT,
    SIGN_IN_AS,
    WISH_TEXT,
} from '../../config';

const { RouteName } = sharedConfigRoutes;
const { MarketContent, MarketFilterScrollable, MarketDateSelector } =
    widgetMarketUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { SearchQueryInputModal } = widgetSearchQueryPopupUi;
const { MyDeliveriesRow } = widgetMyDeliveriesUi;

const { DELIVERIES, PROFILE_EDIT_PAGE, SETTINGS_PAGE } = RouteName;

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

const Heading: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <h2 className="text-xl font-bold">{children}</h2>
);

const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <section className="w-full">{children}</section>
);

const SectionHead: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mb-2 flex items-start justify-between px-4">{children}</div>
);
const SectionBody: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="px-4">{children}</div>
);

/**
 * Components
 */
const Greetings: FunctionComponent = memo(() => {
    const { t } = useTranslation(translationNS);
    const profile = useUnit(sessionModel.$viewerProfileData);
    const name = getUserName(profile);
    const helloText = name
        ? t(HELLO_TEXT, { name })
        : t(HELLO_TEXT_WITHOUT_NAME);
    const wishText = t(WISH_TEXT);

    return (
        <div>
            <div>
                <span className="font-bold">{helloText}</span>
            </div>
            <div>
                <span className="font-bold">{wishText}</span>
            </div>
        </div>
    );
});

const UserTool: FunctionComponent = () => {
    const logout = useUnit(Logout.model.logout);
    const navigate = useNavigate();
    const profile = useUnit(sessionModel.$viewerProfileData);
    const { t } = useTranslation(translationNS);

    const profileEmail = profile?.email;

    const onPressProfile = (): void => navigate(PROFILE_EDIT_PAGE);
    const onPressSettings = (): void => navigate(SETTINGS_PAGE);
    const onPressLogout = (): void => logout();

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <UserAvatar user={profile} isBordered />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profileInfo" className="h-14 gap-2">
                    <p className="font-semibold">{t(SIGN_IN_AS)}</p>
                    <p className="font-semibold">{profileEmail}</p>
                </DropdownItem>
                <DropdownItem key="profileEdit" onPress={onPressProfile}>
                    {t(PROFILE_TEXT)}
                </DropdownItem>
                <DropdownItem key="appSettings" onPress={onPressSettings}>
                    {t(SETTINGS_TEXT)}
                </DropdownItem>
                <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={onPressLogout}
                >
                    {t(LOGOUT_TEXT)}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

const Header: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const reference = useRef<HTMLInputElement>(null);
    const { openSearchModal } = useUnit({
        openSearchModal: widgetSearchQueryPopupModel.searchTriggerClicked,
    });

    const onClickSearchInput = (): void => {
        openSearchModal();
        reference?.current?.blur();
    };

    return (
        <header className="w-full rounded-b-3xl bg-black p-6 dark:bg-content1">
            <div className="w-full">
                <div className="mx-auto grid w-full grid-cols-[auto_max-content] items-center gap-2 text-white lg:w-[750px]">
                    <Greetings />
                    <UserTool />
                </div>
            </div>
            <Spacer y={4} />
            <Input
                ref={reference}
                autoFocus={false}
                placeholder={t(SEARCH_PLACEHOLDER)}
                labelPlacement="outside"
                className="mx-auto lg:w-[750px]"
                onClick={onClickSearchInput}
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">#</span>
                    </div>
                }
            />
        </header>
    );
};

const UpcomingDeliveriesSection: FunctionComponent<PropsWithChildren> = memo(
    ({ children }) => {
        const navigate = useNavigate();
        const { t } = useTranslation(translationNS);

        const onPressAllDeliveries = (): void => {
            navigate(DELIVERIES);
        };

        return (
            <Section>
                <SectionHead>
                    <Heading>{t(UPCOMING_DELIVERIES_LABEL)}</Heading>
                    <Button
                        size="sm"
                        radius="full"
                        onPress={onPressAllDeliveries}
                    >
                        {t(GOTO_MY_DELIVERIES_LINK_LABEL)}
                    </Button>
                </SectionHead>
                {children}
            </Section>
        );
    },
);

const MarketDeliveriesSection: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <Section>
            <SectionHead>
                <Heading>{t(MARKET_LABEL)}</Heading>
            </SectionHead>
            <Spacer y={2} />
            <MarketDateSelector typePicker="scroll" />
            <Spacer y={2} />
            <MarketFilterScrollable withOutPadding />
            <Spacer y={6} />
            <SectionBody>
                <MarketContent />
            </SectionBody>
        </Section>
    );
};

/**
 * @name MobileMarketPageView
 * @description Page for deliveries exchange
 * @constructor
 */
export const MobileMarketPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={6} />
            <Content>
                <UpcomingDeliveriesSection>
                    <MyDeliveriesRow />
                </UpcomingDeliveriesSection>
                <Spacer y={4} />
                <MarketDeliveriesSection />
            </Content>

            <NavbarMobile />
            <SearchQueryInputModal size="full" />
        </>
    );
};
