import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { useUnit } from 'effector-react';
import { useIsMounted } from 'usehooks-ts';
import { $isSessionAuthorized } from '../model/sessionModel';

const { RouteName } = sharedConfigRoutes;
const { AUTH_PAGE } = RouteName;

const DEFAULT_AWAIT_SESSION_TIMEOUT = 300;

interface IAuthorizedProperties extends PropsWithChildren {
    awaitSessionTimeout?: number;
    fallback?: Nullable<ReactNode>;
}

/**
 * @name Authorized
 * @description Component for checking user authorization
 * @constructor
 */
export const Authorized: FunctionComponent<IAuthorizedProperties> = ({
    children,
}) => {
    const isMounted = useIsMounted();
    const isAuthorized = useUnit($isSessionAuthorized);

    if (!isAuthorized && isMounted()) {
        return <Navigate to={AUTH_PAGE} />;
    }

    return children;
};
