import { Link, useParams } from 'react-router-dom';
import { sessionUi } from '@/entities/session';
import { NavbarMobile } from '@/widgets/layout/navbar-mobile/ui/ui';
import { useDocumentTitle } from '@/shared/lib';
import type { PropsWithChildren } from 'react';
import { mapUi } from '@/entities/map';

const { Authorized } = sessionUi;
const { SingleLocationMap } = mapUi;

const PAGE_HEADING = 'Детали доставки';

const Header: FunctionComponent = ({ header }: { header: string }) => (
    <div className="w-full rounded-b-3xl bg-black p-6">
        <h1>{header}</h1>
    </div>
);

const Hero: FunctionComponent<PropsWithChildren> = () => (
    <div className="h-[300px] w-full rounded-t-3xl bg-gray-500">Map</div>
);

const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="-mt-4 h-[500px] w-full rounded-t-3xl bg-gray-200 p-4">
        {children}
    </div>
);

export const DeliveryDetailsPage: FunctionComponent = () => {
    const { deliveryId } = useParams();

    useDocumentTitle(`#${deliveryId} | Служба доставки`);

    return (
        <Authorized>
            <Header
                header={`${PAGE_HEADING} #${deliveryId} | Служба доставки`}
            />
            <Link to="/">GotoHome</Link>
            <Hero>
                <SingleLocationMap />
            </Hero>
            <Content>sds</Content>
            <div className="fixed bottom-0 left-0 right-0 z-30 w-full rounded-t-3xl bg-white shadow-2xl ring-default">
                <NavbarMobile />
            </div>
        </Authorized>
    );
};
