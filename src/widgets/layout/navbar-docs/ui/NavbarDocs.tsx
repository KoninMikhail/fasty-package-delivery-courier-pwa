import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { SwitchLanguage } from '@/features/system/switchAppLanguage/ui';
import { TbArrowBackUp } from 'react-icons/tb';
import { sharedConfigRoutes } from '@/shared/config';
import { CompanyLogoIcon } from '@/shared/ui/icons/CompanyLogoIcon';

const { RouteName } = sharedConfigRoutes;

const {
    AUTH_PAGE,
    PRIVACY_POLICY_PAGE,
    TERMS_OF_SERVICE_PAGE,
    COOKIES_POLICY_PAGE,
} = RouteName;

const Logo: FunctionComponent<{
    headline: string;
    description: string;
}> = ({ headline, description }) => {
    return (
        <div className="flex place-content-start items-center gap-2">
            <div>
                <CompanyLogoIcon className="text-5xl" width="0.7em" />
            </div>
            <div>
                <div className="font-bold drop-shadow-xl">{headline}</div>
                <div className="text-xs">{description}</div>
            </div>
        </div>
    );
};
export const NavbarDocumentation: FunctionComponent = () => {
    return (
        <Navbar maxWidth="xl" height="100px">
            <NavbarBrand>
                <Logo headline="fasty" description="sdfdf" />
            </NavbarBrand>
            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                <NavbarItem isActive>
                    <Link
                        as={ReactRouterLink}
                        to={PRIVACY_POLICY_PAGE}
                        aria-current="page"
                    >
                        Privacy Policy
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        as={ReactRouterLink}
                        color="foreground"
                        to={TERMS_OF_SERVICE_PAGE}
                    >
                        Terms of Service
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        as={ReactRouterLink}
                        color="foreground"
                        to={COOKIES_POLICY_PAGE}
                    >
                        Cookies Policy
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <SwitchLanguage />
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Button
                        as={ReactRouterLink}
                        to={AUTH_PAGE}
                        radius="full"
                        color="warning"
                    >
                        <TbArrowBackUp />
                        Back to Sign In
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
