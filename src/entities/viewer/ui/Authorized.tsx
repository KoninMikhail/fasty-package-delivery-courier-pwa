import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { useUnit } from 'effector-react';
import { Spinner } from '@nextui-org/react';
import { $isAuthorized } from '../model/session';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

interface IAuthorizedProperties extends PropsWithChildren {
    awaitSessionTimeout?: number;
}

/**
 * @name Authorized
 * @description Component for checking user authorization
 * @constructor
 */
export const Authorized: FunctionComponent<IAuthorizedProperties> = ({
    children,
}) => {
    const isSessionReady = useUnit($initSessionComplete);
    const isAuthorized = useUnit($isAuthorized);

    if (!isSessionReady) {
        return (
            <div className="flex h-dvh w-full flex-col items-center justify-center bg-background">
                <Spinner />
            </div>
        );
    }

    if (!isAuthorized) {
        return <Navigate to={AUTH_PAGE} />;
    }

    return children;
};
